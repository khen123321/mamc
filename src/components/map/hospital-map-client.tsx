"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import {
  Clock,
  Footprints,
  Map as MapIcon,
  MapPin,
  Navigation,
  Route,
  X,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SearchInput } from "@/components/ui/search-input";
import { Button } from "@/components/ui/button";
import { mapService } from "@/lib/services/map-service";
import type {
  HospitalFloor,
  HospitalLocation,
  HospitalRouteSegment,
  MapPoint,
  WayfindingNode,
} from "@/types/hospital";

const locationTypeStyles: Record<HospitalLocation["type"], string> = {
  admin: "#eef6f1",
  amenity: "#edf8fb",
  clinic: "#eef6f1",
  desk: "#fff9eb",
  emergency: "#fff1ed",
  entrance: "#f8fafc",
  service: "#f1f7f4",
  stairs: "#f3f4f6",
};

function getCenterPoint(location: HospitalLocation): MapPoint {
  return {
    x: location.x + location.width / 2,
    y: location.y + location.height / 2,
  };
}

function getFloorName(floors: HospitalFloor[], floorId: string) {
  return floors.find((floor) => floor.floorId === floorId)?.name ?? floorId;
}

function getLocationLabelLines(name: string) {
  const words = name.split(" ");

  if (words.length === 1) {
    return [name];
  }

  if (words.length === 2 && name.length <= 13) {
    return [name];
  }

  const midpoint = Math.ceil(words.length / 2);
  return [words.slice(0, midpoint).join(" "), words.slice(midpoint).join(" ")];
}

function buildPolyline(points: MapPoint[]) {
  return points.map((point) => `${point.x},${point.y}`).join(" ");
}

function getRoomLabelFontSize(line: string, location: HospitalLocation) {
  const usableWidth = Math.max(location.width - 4, 8);
  const widthLimitedSize = (usableWidth / Math.max(line.length, 1)) * 1.65;
  const heightLimitedSize = location.height <= 8 ? 2.35 : 2.95;

  return Math.min(2.95, heightLimitedSize, Math.max(2.15, widthLimitedSize));
}

function CorridorNetwork({
  nodes,
  edges,
}: {
  nodes: WayfindingNode[];
  edges: { from: string; to: string }[];
}) {
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));

  return (
    <>
      {edges.map((edge) => {
        const from = nodeMap.get(edge.from);
        const to = nodeMap.get(edge.to);

        if (!from || !to) {
          return null;
        }

        return (
          <line
            key={`${edge.from}-${edge.to}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="#e5f1eb"
            strokeLinecap="round"
            strokeWidth="6.5"
          />
        );
      })}
      {nodes
        .filter((node) => node.type === "junction")
        .map((node) => (
          <circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r="1.2"
            fill="#d7e9df"
            opacity="0.55"
          />
        ))}
    </>
  );
}

function RouteLine({ segment }: { segment?: HospitalRouteSegment }) {
  if (!segment || segment.points.length < 2) {
    return null;
  }

  return (
    <>
      <polyline
        points={buildPolyline(segment.points)}
        fill="none"
        stroke="#ffffff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="7.5"
      />
      <polyline
        points={buildPolyline(segment.points)}
        fill="none"
        stroke="var(--brand-secondary)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4.2"
      />
    </>
  );
}

function MapMarker({
  label,
  location,
  mapHeight,
  mapWidth,
  point,
  tone,
}: {
  label?: string;
  location: HospitalLocation;
  mapHeight: number;
  mapWidth: number;
  point: MapPoint;
  tone: "current" | "destination";
}) {
  const color = tone === "current" ? "#0f766e" : "var(--brand-primary)";
  const dot = {
    x: point.x,
    y: point.y,
  };
  const labelWidth = tone === "current" ? 27 : 26;
  const hasRoomForCurrentLabelOnLeft =
    tone === "current" && location.x > labelWidth + 8;
  const labelX = hasRoomForCurrentLabelOnLeft
    ? location.x - labelWidth - 5
    : tone === "current"
      ? Math.min(Math.max(location.x, 4), mapWidth - labelWidth - 4)
      : Math.min(
          Math.max(dot.x - labelWidth / 2, 4),
          mapWidth - labelWidth - 4,
        );
  const labelY = hasRoomForCurrentLabelOnLeft
    ? Math.min(Math.max(dot.y - 4, 8), mapHeight - 12)
    : tone === "current"
      ? Math.max(location.y - 8.5, 6)
      : Math.max(dot.y - 9, 6);
  const textX = labelX + 1.8;
  const textY = labelY + 4.35;

  return (
    <g>
      <circle
        cx={dot.x}
        cy={dot.y}
        r="3.1"
        fill="#ffffff"
        stroke={color}
        strokeWidth="1.7"
      />
      <circle cx={dot.x} cy={dot.y} r="1.25" fill={color} />
      {tone === "current" && label ? (
        <>
          <rect
            x={labelX}
            y={labelY}
            width={labelWidth}
            height="8"
            rx="2.2"
            fill="#ffffff"
            stroke="#d7e6de"
          />
          <text
            x={textX}
            y={textY}
            fontSize="3.05"
            fontWeight="700"
            fill={color}
          >
            {label}
          </text>
        </>
      ) : null}
    </g>
  );
}

function LegendItem({
  color,
  label,
  dashed,
}: {
  color: string;
  label: string;
  dashed?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 text-xs text-slate-600">
      <span
        className="h-2.5 w-5 rounded-full"
        style={{
          background: dashed
            ? `repeating-linear-gradient(90deg, ${color} 0 5px, transparent 5px 8px)`
            : color,
          border: dashed ? `1px solid ${color}` : undefined,
        }}
      />
      {label}
    </div>
  );
}

function DoorAnchors({
  nodes,
  activeNodeIds,
}: {
  nodes: WayfindingNode[];
  activeNodeIds: string[];
}) {
  return (
    <>
      {nodes
        .filter((node) =>
          ["door", "entrance", "elevator", "stairs"].includes(node.type),
        )
        .map((node) => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r={activeNodeIds.includes(node.id) ? "1.65" : "0.95"}
              fill={
                activeNodeIds.includes(node.id)
                  ? "var(--brand-secondary)"
                  : "#ffffff"
              }
              opacity={activeNodeIds.includes(node.id) ? "1" : "0.72"}
              stroke={node.type === "elevator" ? "#0f766e" : "#9bb8aa"}
              strokeWidth={activeNodeIds.includes(node.id) ? "0.9" : "0.65"}
            />
          </g>
        ))}
    </>
  );
}

function MapCanvas({
  activeFloor,
  activeGraph,
  activeNodeIds,
  activeSegment,
  currentDoorNode,
  currentLocation,
  destinationDoorNode,
  mapMinWidth,
  onChooseDestination,
  onLocationKeyDown,
  selectedDestination,
}: {
  activeFloor: HospitalFloor;
  activeGraph?: ReturnType<typeof mapService.getWayfindingGraph>;
  activeNodeIds: string[];
  activeSegment?: HospitalRouteSegment;
  currentDoorNode?: WayfindingNode;
  currentLocation: HospitalLocation;
  destinationDoorNode?: WayfindingNode;
  mapMinWidth?: string;
  onChooseDestination: (location: HospitalLocation) => void;
  onLocationKeyDown: (
    event: KeyboardEvent<SVGGElement>,
    location: HospitalLocation,
  ) => void;
  selectedDestination: HospitalLocation;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const activeFloorWidth = activeFloor.width ?? 120;
  const activeFloorHeight = activeFloor.height ?? 120;
  const activePoints = activeSegment?.points;
  const routeFocusKey = activeSegment?.nodeIds.join("-") ?? "";

  useEffect(() => {
    const scroller = scrollerRef.current;
    const points = activePoints;

    if (!scroller || !points?.length) {
      return;
    }

    const centerX =
      points.reduce((total, point) => total + point.x, 0) / points.length;
    const scrollRatio = Math.min(Math.max(centerX / activeFloorWidth, 0), 1);
    const nextLeft =
      (scroller.scrollWidth - scroller.clientWidth) * scrollRatio -
      scroller.clientWidth * 0.2;

    scroller.scrollTo({
      left: Math.max(0, nextLeft),
      behavior: "smooth",
    });
  }, [activeFloorWidth, activePoints, routeFocusKey]);

  return (
    <div
      ref={scrollerRef}
      className="h-full w-full min-w-0 overflow-x-auto overflow-y-hidden"
    >
      <svg
        viewBox={`0 0 ${activeFloorWidth} ${activeFloorHeight}`}
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-full"
        width="100%"
        height="100%"
        style={{ minWidth: mapMinWidth }}
        role="img"
        aria-label={`${activeFloor.name} map with highlighted wayfinding route`}
      >
        <rect
          x="3"
          y="4"
          width={activeFloorWidth - 6}
          height={activeFloorHeight - 7}
          rx="3"
          fill="#f8fafc"
          stroke="#dbe7df"
        />
        {activeFloor.mapLabels?.map((label) => (
          <text
            key={`${label.label}-${label.x}-${label.y}`}
            x={label.x}
            y={label.y}
            fill="#7f9b8e"
            fontSize="3"
            fontWeight="650"
            letterSpacing="0.08em"
            opacity="0.78"
            textAnchor="middle"
          >
            {label.label.toUpperCase()}
          </text>
        ))}
        {activeGraph ? (
          <CorridorNetwork
            nodes={activeGraph.nodes}
            edges={activeGraph.edges}
          />
        ) : null}

        <RouteLine segment={activeSegment} />

        {activeFloor.locations.map((location) => {
          const isDestination =
            location.locationId === selectedDestination.locationId;
          const isCurrent = location.locationId === currentLocation.locationId;
          const labelLines = getLocationLabelLines(
            location.shortName ?? location.name,
          );
          const fill = isDestination
            ? "var(--brand-primary)"
            : isCurrent
              ? "#e6f5f1"
              : locationTypeStyles[location.type];
          const stroke = isDestination
            ? "var(--brand-primary-hover)"
            : isCurrent
              ? "#0f766e"
              : "#dbe7df";

          return (
            <g
              key={location.locationId}
              className="cursor-pointer"
              role="button"
              tabIndex={0}
              aria-label={`Set ${location.name} as destination`}
              onClick={() => onChooseDestination(location)}
              onKeyDown={(event) => onLocationKeyDown(event, location)}
            >
              <rect
                x={location.x}
                y={location.y}
                width={location.width}
                height={location.height}
                rx="1.8"
                fill={fill}
                stroke={stroke}
                strokeWidth={isDestination || isCurrent ? "1.15" : "0.65"}
              />
              {labelLines.map((line, index) => (
                <text
                  key={`${location.locationId}-${line}`}
                  x={location.x + location.width / 2}
                  y={
                    location.y +
                    location.height / 2 -
                    (labelLines.length - 1) * 1.85 +
                    index * 4.2 +
                    1.05
                  }
                  fontSize={getRoomLabelFontSize(line, location)}
                  fontWeight={isDestination ? "650" : "550"}
                  fill={isDestination ? "white" : "#18352b"}
                  textAnchor="middle"
                >
                  {line}
                </text>
              ))}
            </g>
          );
        })}

        {activeGraph ? (
          <DoorAnchors
            nodes={activeGraph.nodes}
            activeNodeIds={activeNodeIds}
          />
        ) : null}
        {currentLocation.floorId === activeFloor.floorId && (
          <MapMarker
            label="You are here"
            location={currentLocation}
            mapHeight={activeFloorHeight}
            mapWidth={activeFloorWidth}
            point={currentDoorNode ?? getCenterPoint(currentLocation)}
            tone="current"
          />
        )}
        {selectedDestination.floorId === activeFloor.floorId && (
          <MapMarker
            location={selectedDestination}
            mapHeight={activeFloorHeight}
            mapWidth={activeFloorWidth}
            point={destinationDoorNode ?? getCenterPoint(selectedDestination)}
            tone="destination"
          />
        )}
      </svg>
    </div>
  );
}

export function HospitalMapClient({ floors }: { floors: HospitalFloor[] }) {
  const [visibleFloorId, setVisibleFloorId] = useState(floors[0].floorId);
  const [query, setQuery] = useState("");
  const [isFullMapOpen, setIsFullMapOpen] = useState(false);
  const [currentLocationId, setCurrentLocationId] = useState(
    mapService.defaultCurrentLocationId,
  );
  const [destinationId, setDestinationId] = useState(
    mapService.defaultDestinationId,
  );

  const locations = useMemo(
    () => floors.flatMap((floor) => floor.locations),
    [floors],
  );
  const activeFloor =
    floors.find((floor) => floor.floorId === visibleFloorId) ?? floors[0];
  const activeFloorWidth = activeFloor.width ?? 120;
  const mapMinWidth =
    activeFloorWidth > 140
      ? `${Math.max(920, activeFloorWidth * 4.7)}px`
      : undefined;
  const currentLocation =
    locations.find((location) => location.locationId === currentLocationId) ??
    locations[0];
  const selectedDestination =
    locations.find((location) => location.locationId === destinationId) ??
    locations[1] ??
    locations[0];
  const route = useMemo(
    () => mapService.getWayfindingRoute(currentLocationId, destinationId),
    [currentLocationId, destinationId],
  );
  const activeSegment = route.segments.find(
    (segment) => segment.floorId === activeFloor.floorId,
  );
  const activeGraph = mapService.getWayfindingGraph(activeFloor.floorId);
  const activeNodeIds = activeSegment?.nodeIds ?? [];
  const currentDoorNode = activeGraph?.nodes.find(
    (node) => node.id === currentLocation.doorNodeId,
  );
  const destinationDoorNode = activeGraph?.nodes.find(
    (node) => node.id === selectedDestination.doorNodeId,
  );
  const visibleRouteStepIndex = route.floors.findIndex(
    (floor) => floor.floorId === visibleFloorId,
  );
  const activeRouteStepIndex = Math.max(visibleRouteStepIndex, 0);
  const activeRouteFloor =
    route.floors[activeRouteStepIndex] ?? route.floors[0];
  const searchResults = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const resultLocations = normalizedQuery
      ? locations.filter((location) =>
          `${location.name} ${getFloorName(floors, location.floorId)}`
            .toLowerCase()
            .includes(normalizedQuery),
        )
      : activeFloor.locations;

    return resultLocations.filter(
      (location) => location.locationId !== currentLocationId,
    );
  }, [activeFloor.locations, currentLocationId, floors, locations, query]);

  function chooseDestination(location: HospitalLocation) {
    setDestinationId(location.locationId);
    setVisibleFloorId(location.floorId);
  }

  function handleLocationKeyDown(
    event: KeyboardEvent<SVGGElement>,
    location: HospitalLocation,
  ) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      chooseDestination(location);
    }
  }

  function chooseCurrentLocation(locationId: string) {
    const location = locations.find((item) => item.locationId === locationId);

    if (!location) {
      return;
    }

    setCurrentLocationId(location.locationId);
    setVisibleFloorId(location.floorId);
  }

  function goToRouteStep(stepIndex: number) {
    const nextFloor = route.floors[stepIndex];

    if (nextFloor) {
      setVisibleFloorId(nextFloor.floorId);
    }
  }

  const floorControls = (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
        Floor
      </p>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:grid lg:overflow-visible lg:pb-0">
        {floors.map((floor) => {
          const isRouteFloor = route.floors.some(
            (routeFloor) => routeFloor.floorId === floor.floorId,
          );
          const isActive = visibleFloorId === floor.floorId;

          return (
            <button
              key={floor.floorId}
              type="button"
              aria-pressed={isActive}
              onClick={() => setVisibleFloorId(floor.floorId)}
              className={`min-h-11 min-w-[8rem] rounded-md border px-3 py-2 text-left text-sm font-semibold transition lg:min-w-0 lg:py-3 ${
                isActive
                  ? "border-[var(--brand-primary)] bg-[var(--brand-primary)] text-white"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:border-[var(--brand-secondary)] hover:bg-white"
              }`}
            >
              <span>{floor.name}</span>
              {isRouteFloor && (
                <span
                  className={`ml-2 rounded-full px-2 py-0.5 text-[10px] uppercase ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-[var(--brand-surface-soft)] text-[var(--brand-primary)]"
                  }`}
                >
                  route
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  const routeStepControls = (
    <div className="flex flex-wrap gap-2">
      {route.floors.length > 1 && (
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={activeRouteStepIndex === 0}
          onClick={() => goToRouteStep(activeRouteStepIndex - 1)}
        >
          Previous
        </Button>
      )}
      {route.floors.map((floor, index) => (
        <Button
          key={floor.floorId}
          type="button"
          size="sm"
          variant={visibleFloorId === floor.floorId ? "primary" : "outline"}
          onClick={() => setVisibleFloorId(floor.floorId)}
        >
          {index + 1} of {route.floors.length}
        </Button>
      ))}
      {route.floors.length > 1 && (
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={activeRouteStepIndex >= route.floors.length - 1}
          onClick={() => goToRouteStep(activeRouteStepIndex + 1)}
        >
          Next Floor
        </Button>
      )}
    </div>
  );

  const mapCanvas = (
    <MapCanvas
      activeFloor={activeFloor}
      activeGraph={activeGraph}
      activeNodeIds={activeNodeIds}
      activeSegment={activeSegment}
      currentDoorNode={currentDoorNode}
      currentLocation={currentLocation}
      destinationDoorNode={destinationDoorNode}
      mapMinWidth={mapMinWidth}
      onChooseDestination={chooseDestination}
      onLocationKeyDown={handleLocationKeyDown}
      selectedDestination={selectedDestination}
    />
  );

  const routeStepHeader = (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--brand-primary)]">
        Route Step
      </p>
      <h2 className="mt-1 text-xl font-semibold text-slate-950">
        {visibleRouteStepIndex === -1
          ? `Viewing ${activeFloor.name}`
          : activeRouteFloor
            ? `Step ${activeRouteStepIndex + 1} of ${route.floors.length}: ${activeRouteFloor.name}`
            : `${currentLocation.name} to ${selectedDestination.name}`}
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        {currentLocation.name} to {selectedDestination.name}
      </p>
    </div>
  );

  const routeSummary = (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-lg bg-slate-50 p-4">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
          <MapPin className="h-4 w-4" />
          Current
        </p>
        <p className="mt-2 font-semibold text-slate-950">
          {currentLocation.name}
        </p>
        <p className="text-sm text-slate-500">
          {getFloorName(floors, currentLocation.floorId)}
        </p>
      </div>
      <div className="rounded-lg bg-slate-50 p-4">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
          <Navigation className="h-4 w-4" />
          Destination
        </p>
        <p className="mt-2 font-semibold text-slate-950">
          {selectedDestination.name}
        </p>
        <p className="text-sm text-slate-500">
          {getFloorName(floors, selectedDestination.floorId)}
        </p>
      </div>
      <div className="rounded-lg bg-slate-50 p-4">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
          <Route className="h-4 w-4" />
          Route Type
        </p>
        <p className="mt-2 font-semibold text-slate-950">{route.routeType}</p>
        <p className="text-sm text-slate-500">
          {route.floors.map((floor) => floor.name).join(" to ")}
        </p>
      </div>
      <div className="rounded-lg bg-slate-50 p-4">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
          <Clock className="h-4 w-4" />
          Estimated Walk
        </p>
        <p className="mt-2 font-semibold text-slate-950">
          {route.estimatedWalkMinutes} minutes
        </p>
        <p className="text-sm text-slate-500">~{route.estimatedDistance} m</p>
      </div>
    </div>
  );

  const directionsPanel = (
    <div>
      <p className="flex items-center gap-2 text-sm font-semibold text-slate-950">
        <Footprints className="h-4 w-4 text-[var(--brand-primary)]" />
        Suggested Route
      </p>
      <ol className="mt-3 space-y-3 text-sm leading-6 text-slate-700">
        {route.directions.map((direction, index) => (
          <li key={direction} className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--brand-surface-soft)] text-xs font-semibold text-[var(--brand-primary)]">
              {index + 1}
            </span>
            <span>{direction}</span>
          </li>
        ))}
      </ol>
    </div>
  );

  const legend = (
    <div className="rounded-lg border border-slate-200 p-4">
      <p className="text-sm font-semibold text-slate-950">Legend</p>
      <div className="mt-3 grid gap-2">
        <LegendItem color="#0f766e" label="You are here" />
        <LegendItem color="var(--brand-primary)" label="Destination" />
        <LegendItem color="var(--brand-secondary)" label="Walking route" />
        <LegendItem color="#e2efe8" label="Walkable corridor" />
        <LegendItem color="#ffffff" label="Room entrance" />
      </div>
    </div>
  );

  return (
    <>
      <div className="grid min-w-0 gap-5 lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-6">
        <Card className="min-w-0 w-full">
          <CardContent className="space-y-5 p-4 sm:p-6">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--brand-primary)]">
                Current Location
              </p>
              <select
                aria-label="Current location"
                className="h-11 w-full rounded-md border border-[var(--brand-border)] bg-white px-3 text-sm font-medium text-slate-800"
                value={currentLocationId}
                onChange={(event) => chooseCurrentLocation(event.target.value)}
              >
                {locations.map((location) => (
                  <option key={location.locationId} value={location.locationId}>
                    {location.name} - {getFloorName(floors, location.floorId)}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  Destination
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  {selectedDestination.name} on{" "}
                  {getFloorName(floors, selectedDestination.floorId)}
                </p>
              </div>
              <SearchInput
                aria-label="Search hospital locations"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search location"
              />
              <div className="max-h-72 space-y-2 overflow-auto pr-1 sm:max-h-80">
                {searchResults.map((location) => {
                  const isSelected = location.locationId === destinationId;

                  return (
                    <button
                      key={location.locationId}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => chooseDestination(location)}
                      className={`w-full rounded-md border p-3 text-left text-sm transition ${
                        isSelected
                          ? "border-[var(--brand-primary)] bg-[var(--brand-surface-soft)]"
                          : "border-slate-200 bg-white hover:border-[var(--brand-secondary)] hover:bg-slate-50"
                      }`}
                    >
                      <span className="font-semibold text-slate-900">
                        {location.name}
                      </span>
                      <br />
                      <span className="text-slate-500">
                        {getFloorName(floors, location.floorId)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="hidden lg:block">{floorControls}</div>
          </CardContent>
        </Card>

        <div className="flex min-w-0 flex-col gap-4">
          <div className="order-3 flex flex-col gap-4 rounded-xl border border-[var(--brand-border)] bg-white p-4 shadow-sm lg:order-1 lg:flex-row lg:items-center lg:justify-between">
            {routeStepHeader}
            <div className="space-y-4 lg:space-y-0">
              <div className="lg:hidden">{floorControls}</div>
              {routeStepControls}
            </div>
          </div>

          <div className="order-4 min-h-[320px] w-full min-w-0 rounded-xl border border-slate-200 bg-white p-2 shadow-sm sm:min-h-[380px] lg:order-2 lg:aspect-[16/10] lg:min-h-[560px]">
            {mapCanvas}
          </div>

          <Button
            type="button"
            variant="primary"
            className="order-5 min-h-12 w-full lg:hidden"
            onClick={() => setIsFullMapOpen(true)}
          >
            <MapIcon className="h-4 w-4" />
            View Full Map
          </Button>

          <Card className="order-2 min-w-0 w-full lg:order-3">
            <CardContent className="space-y-5 p-4 sm:p-6">
              {routeSummary}

              <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
                {directionsPanel}
                {legend}
              </div>

              <p className="text-sm leading-6 text-slate-600">
                {selectedDestination.description}
              </p>
              <p className="rounded-lg bg-slate-50 p-3 text-xs leading-5 text-slate-500">
                Prototype floor layout for demonstration. Final routes and
                locations will be configured using the hospital&apos;s approved
                floor plans.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {isFullMapOpen && (
        <div
          className="fixed inset-0 z-[70] flex flex-col bg-white lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Full hospital map"
        >
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 p-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--brand-primary)]">
                Full Map
              </p>
              <p className="text-base font-semibold text-slate-950">
                {activeFloor.name}
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsFullMapOpen(false)}
              aria-label="Close full map"
            >
              <X className="h-4 w-4" />
              Close
            </Button>
          </div>
          <div className="border-b border-slate-200 p-4">
            {floorControls}
            <div className="mt-3">{routeStepControls}</div>
          </div>
          <div className="min-h-0 flex-1 bg-slate-50 p-3">
            <div className="h-full min-h-0 rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
              {mapCanvas}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
