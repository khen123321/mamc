import { floorWayfindingGraphs, hospitalFloors } from "@/lib/mock/map";
import type {
  FloorWayfindingGraph,
  HospitalFloor,
  HospitalLocation,
  HospitalRoute,
  HospitalRouteSegment,
  MapPoint,
  WayfindingEdge,
  WayfindingNode,
} from "@/types/hospital";

const DEFAULT_CURRENT_LOCATION_ID = "LOC-ENT";
const DEFAULT_DESTINATION_ID = "LOC-CASH";
const ELEVATOR_NODE_BY_FLOOR: Record<string, string> = {
  "FLOOR-G": "gf-elevator",
  "FLOOR-2": "2f-elevator",
  "FLOOR-3": "3f-elevator",
};

const getLocations = () => hospitalFloors.flatMap((floor) => floor.locations);

const getLocationById = (locationId: string) =>
  getLocations().find((location) => location.locationId === locationId);

const getFloorById = (floorId: string) =>
  hospitalFloors.find((floor) => floor.floorId === floorId);

const getGraphByFloorId = (floorId: string) =>
  floorWayfindingGraphs.find((graph) => graph.floorId === floorId);

const getFloorName = (floorId: string) =>
  getFloorById(floorId)?.name ?? floorId;

const getNodeById = (nodeId: string) =>
  floorWayfindingGraphs
    .flatMap((graph) => graph.nodes)
    .find((node) => node.id === nodeId);

const getNodeDistance = (from: WayfindingNode, to: WayfindingNode) =>
  Math.round(Math.abs(from.x - to.x) + Math.abs(from.y - to.y));

const getEdgeDistance = (edge: WayfindingEdge) => {
  const from = getNodeById(edge.from);
  const to = getNodeById(edge.to);

  if (!from || !to) {
    return edge.distance ?? 0;
  }

  return edge.distance ?? getNodeDistance(from, to);
};

const buildAdjacency = (graph: FloorWayfindingGraph) => {
  const adjacency = new Map<string, { nodeId: string; distance: number }[]>();

  graph.nodes.forEach((node) => adjacency.set(node.id, []));
  graph.edges.forEach((edge) => {
    const distance = getEdgeDistance(edge);

    adjacency.get(edge.from)?.push({ nodeId: edge.to, distance });
    adjacency.get(edge.to)?.push({ nodeId: edge.from, distance });
  });

  return adjacency;
};

const findShortestPath = (
  graph: FloorWayfindingGraph,
  startNodeId: string,
  endNodeId: string,
) => {
  const adjacency = buildAdjacency(graph);
  const distances = new Map<string, number>();
  const previous = new Map<string, string | undefined>();
  const unvisited = new Set(graph.nodes.map((node) => node.id));

  graph.nodes.forEach((node) => {
    distances.set(
      node.id,
      node.id === startNodeId ? 0 : Number.POSITIVE_INFINITY,
    );
  });

  while (unvisited.size > 0) {
    const currentNodeId = [...unvisited].sort(
      (a, b) => (distances.get(a) ?? 0) - (distances.get(b) ?? 0),
    )[0];

    if (!currentNodeId || currentNodeId === endNodeId) {
      break;
    }

    unvisited.delete(currentNodeId);

    adjacency.get(currentNodeId)?.forEach((neighbor) => {
      if (!unvisited.has(neighbor.nodeId)) {
        return;
      }

      const nextDistance =
        (distances.get(currentNodeId) ?? Number.POSITIVE_INFINITY) +
        neighbor.distance;

      if (
        nextDistance <
        (distances.get(neighbor.nodeId) ?? Number.POSITIVE_INFINITY)
      ) {
        distances.set(neighbor.nodeId, nextDistance);
        previous.set(neighbor.nodeId, currentNodeId);
      }
    });
  }

  const path: string[] = [];
  let cursor: string | undefined = endNodeId;

  while (cursor) {
    path.unshift(cursor);

    if (cursor === startNodeId) {
      break;
    }

    cursor = previous.get(cursor);
  }

  if (path[0] !== startNodeId) {
    return { nodeIds: [startNodeId], distance: 0 };
  }

  return {
    nodeIds: path,
    distance: distances.get(endNodeId) ?? 0,
  };
};

const buildSegment = (
  floorId: string,
  label: string,
  startNodeId: string,
  endNodeId: string,
): HospitalRouteSegment => {
  const graph = getGraphByFloorId(floorId);

  if (!graph) {
    return { floorId, label, nodeIds: [], points: [], distance: 0 };
  }

  const path = findShortestPath(graph, startNodeId, endNodeId);
  const points = path.nodeIds
    .map((nodeId) => getNodeById(nodeId))
    .filter((node): node is WayfindingNode => Boolean(node))
    .map<MapPoint>((node) => ({ x: node.x, y: node.y }));

  return {
    floorId,
    label,
    nodeIds: path.nodeIds,
    points,
    distance: path.distance,
  };
};

const getRouteFloors = (segments: HospitalRouteSegment[]) =>
  [...new Set(segments.map((segment) => segment.floorId))]
    .map((floorId) => getFloorById(floorId))
    .filter((floor): floor is HospitalFloor => Boolean(floor));

const getDisplayNodeLabel = (nodeId: string) => {
  const node = getNodeById(nodeId);
  return node?.label ?? nodeId;
};

const buildRouteDirections = (
  currentLocation: HospitalLocation,
  destination: HospitalLocation,
  segments: HospitalRouteSegment[],
) => {
  const currentFloor = getFloorName(currentLocation.floorId);
  const destinationFloor = getFloorName(destination.floorId);

  if (currentLocation.locationId === destination.locationId) {
    return [`You are already at ${destination.name}.`];
  }

  if (segments.length === 1) {
    const segment = segments[0];
    const landmarks = segment.nodeIds
      .slice(1, -1)
      .map(getDisplayNodeLabel)
      .filter((label, index, labels) => {
        const isDoor = label.toLowerCase().includes("door");

        return !isDoor && labels.indexOf(label) === index;
      });
    const primaryLandmark = landmarks[0] ?? "the corridor";
    const secondaryLandmark = landmarks.find(
      (label) => label !== primaryLandmark,
    );

    const directions = [
      `Start at ${currentLocation.name} on the ${currentFloor}.`,
      `Enter the hallway through ${getDisplayNodeLabel(currentLocation.doorNodeId)}.`,
      `Follow the corridor toward ${primaryLandmark}.`,
    ];

    if (secondaryLandmark) {
      directions.push(`Continue through ${secondaryLandmark}.`);
    }

    directions.push(
      `Arrive at the ${getDisplayNodeLabel(destination.doorNodeId)} for ${destination.name}.`,
    );

    return directions;
  }

  return [
    `Start at ${currentLocation.name} on the ${currentFloor}.`,
    `Follow the corridor to ${getDisplayNodeLabel(ELEVATOR_NODE_BY_FLOOR[currentLocation.floorId])}.`,
    `Take the elevator to the ${destinationFloor}.`,
    `Exit at ${getDisplayNodeLabel(ELEVATOR_NODE_BY_FLOOR[destination.floorId])}.`,
    `Follow the hallway to the ${getDisplayNodeLabel(destination.doorNodeId)} for ${destination.name}.`,
  ];
};

const getWayfindingRoute = (
  currentLocationId = DEFAULT_CURRENT_LOCATION_ID,
  destinationId = DEFAULT_DESTINATION_ID,
): HospitalRoute => {
  const currentLocation =
    getLocationById(currentLocationId) ??
    getLocationById(DEFAULT_CURRENT_LOCATION_ID) ??
    hospitalFloors[0].locations[0];
  const destination =
    getLocationById(destinationId) ??
    getLocationById(DEFAULT_DESTINATION_ID) ??
    hospitalFloors[0].locations[0];
  const routeType: HospitalRoute["routeType"] =
    currentLocation.floorId === destination.floorId
      ? "Same Floor"
      : "Multi-Floor";

  const segments =
    routeType === "Same Floor"
      ? [
          buildSegment(
            currentLocation.floorId,
            `${getFloorName(currentLocation.floorId)} route`,
            currentLocation.doorNodeId,
            destination.doorNodeId,
          ),
        ]
      : [
          buildSegment(
            currentLocation.floorId,
            `${getFloorName(currentLocation.floorId)} to elevators`,
            currentLocation.doorNodeId,
            ELEVATOR_NODE_BY_FLOOR[currentLocation.floorId],
          ),
          buildSegment(
            destination.floorId,
            `${getFloorName(destination.floorId)} to destination`,
            ELEVATOR_NODE_BY_FLOOR[destination.floorId],
            destination.doorNodeId,
          ),
        ];

  const estimatedDistance = segments.reduce(
    (total, segment) => total + segment.distance,
    0,
  );
  const floorTransferMinutes = routeType === "Multi-Floor" ? 2 : 0;

  return {
    currentLocation,
    destination,
    routeType,
    estimatedDistance,
    estimatedWalkMinutes: Math.max(
      1,
      Math.ceil(estimatedDistance / 42) + floorTransferMinutes,
    ),
    floors: getRouteFloors(segments),
    segments,
    directions: buildRouteDirections(currentLocation, destination, segments),
  };
};

export const mapService = {
  defaultCurrentLocationId: DEFAULT_CURRENT_LOCATION_ID,
  defaultDestinationId: DEFAULT_DESTINATION_ID,
  getFloors: () => hospitalFloors,
  getLocations,
  getLocationById,
  getWayfindingRoute,
  getWayfindingGraph: getGraphByFloorId,
};
