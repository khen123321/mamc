import type { HospitalFloor } from "@/types/hospital";

export const hospitalFloors: HospitalFloor[] = [
  { floorId: "FLOOR-G", name: "Ground Floor", level: 1, locations: [
    { locationId: "LOC-ENT", name: "Main Entrance", floorId: "FLOOR-G", type: "entrance", x: 42, y: 82, width: 18, height: 10, description: "Primary patient entrance and drop-off point." },
    { locationId: "LOC-INFO", name: "Information Desk", floorId: "FLOOR-G", type: "desk", x: 38, y: 65, width: 24, height: 10, description: "Concierge and wayfinding assistance." },
    { locationId: "LOC-REG", name: "Registration", floorId: "FLOOR-G", type: "service", x: 8, y: 48, width: 22, height: 18, description: "Patient registration and account validation." },
    { locationId: "LOC-HMO", name: "HMO", floorId: "FLOOR-G", type: "service", x: 8, y: 24, width: 22, height: 18, description: "Insurance and HMO approval processing." },
    { locationId: "LOC-CASH", name: "Cashier", floorId: "FLOOR-G", type: "service", x: 38, y: 24, width: 22, height: 18, description: "Payments and official receipts." },
    { locationId: "LOC-LAB", name: "Laboratory", floorId: "FLOOR-G", type: "service", x: 70, y: 24, width: 22, height: 18, description: "Diagnostic laboratory and specimen collection." },
    { locationId: "LOC-PHARM", name: "Pharmacy", floorId: "FLOOR-G", type: "service", x: 70, y: 48, width: 22, height: 18, description: "Prescription pickup and medication counseling." },
    { locationId: "LOC-ER", name: "Emergency Department", floorId: "FLOOR-G", type: "emergency", x: 8, y: 6, width: 38, height: 12, description: "24/7 emergency intake." },
    { locationId: "LOC-ELEV", name: "Elevators", floorId: "FLOOR-G", type: "amenity", x: 48, y: 48, width: 12, height: 12, description: "Elevators to clinics and administration." },
    { locationId: "LOC-REST", name: "Restrooms", floorId: "FLOOR-G", type: "amenity", x: 72, y: 72, width: 16, height: 10, description: "Public restrooms." },
  ] },
  { floorId: "FLOOR-2", name: "Second Floor", level: 2, locations: [
    { locationId: "LOC-CARD", name: "Cardiology", floorId: "FLOOR-2", type: "clinic", x: 8, y: 12, width: 24, height: 20, description: "Cardiology clinics and diagnostics." },
    { locationId: "LOC-IM", name: "Internal Medicine", floorId: "FLOOR-2", type: "clinic", x: 38, y: 12, width: 24, height: 20, description: "Adult internal medicine clinics." },
    { locationId: "LOC-PEDS", name: "Pediatrics", floorId: "FLOOR-2", type: "clinic", x: 68, y: 12, width: 24, height: 20, description: "Pediatric care area." },
    { locationId: "LOC-RAD", name: "Radiology", floorId: "FLOOR-2", type: "service", x: 8, y: 52, width: 30, height: 20, description: "Imaging suite and radiology reception." },
    { locationId: "LOC-CLINICS", name: "Doctor Clinics", floorId: "FLOOR-2", type: "clinic", x: 48, y: 52, width: 42, height: 20, description: "General outpatient clinic rooms." },
  ] },
  { floorId: "FLOOR-3", name: "Third Floor", level: 3, locations: [
    { locationId: "LOC-ADMIN", name: "Administration", floorId: "FLOOR-3", type: "admin", x: 8, y: 14, width: 30, height: 22, description: "Hospital administration offices." },
    { locationId: "LOC-CONF", name: "Conference Rooms", floorId: "FLOOR-3", type: "amenity", x: 48, y: 14, width: 38, height: 22, description: "Training and conference rooms." },
    { locationId: "LOC-SPEC", name: "Specialty Clinics", floorId: "FLOOR-3", type: "clinic", x: 16, y: 54, width: 68, height: 22, description: "Orthopedics, dermatology, and specialty consults." },
  ] },
];
