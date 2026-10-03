import type { PresentationImage } from "@/types/content";

export interface Department {
  departmentId: string;
  name: string;
  floor: string;
  description: string;
  icon: string;
  image?: PresentationImage;
}

export interface Patient {
  patientId: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  memberSince: string;
}

export interface HospitalLocation {
  locationId: string;
  name: string;
  shortName?: string;
  floorId: string;
  type:
    | "entrance"
    | "desk"
    | "clinic"
    | "service"
    | "amenity"
    | "emergency"
    | "admin"
    | "stairs";
  x: number;
  y: number;
  width: number;
  height: number;
  doorNodeId: string;
  description: string;
}

export interface HospitalFloor {
  floorId: string;
  name: string;
  level: number;
  width?: number;
  height?: number;
  mapLabels?: HospitalMapLabel[];
  locations: HospitalLocation[];
}

export interface HospitalMapLabel extends MapPoint {
  label: string;
}

export interface MapPoint {
  x: number;
  y: number;
}

export interface HospitalRouteSegment {
  floorId: string;
  label: string;
  points: MapPoint[];
  nodeIds: string[];
  distance: number;
}

export interface HospitalRoute {
  currentLocation: HospitalLocation;
  destination: HospitalLocation;
  routeType: "Same Floor" | "Multi-Floor";
  estimatedDistance: number;
  estimatedWalkMinutes: number;
  floors: HospitalFloor[];
  segments: HospitalRouteSegment[];
  directions: string[];
}

export type WayfindingNodeType =
  "corridor" | "junction" | "door" | "elevator" | "stairs" | "entrance";

export interface WayfindingNode extends MapPoint {
  id: string;
  floorId: string;
  label: string;
  type: WayfindingNodeType;
}

export interface WayfindingEdge {
  from: string;
  to: string;
  distance?: number;
  accessible?: boolean;
}

export interface FloorWayfindingGraph {
  floorId: string;
  nodes: WayfindingNode[];
  edges: WayfindingEdge[];
}

export interface AnalyticsPoint {
  label: string;
  value: number;
  secondary?: number;
}
