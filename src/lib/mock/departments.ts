import type { Department } from "@/types/hospital";
import { presentationImages } from "@/constants/presentation-images";

const serviceImages = presentationImages.services;

export const departments: Department[] = [
  { departmentId: "DEPT-CARD", name: "Cardiology", floor: "Second Floor", description: "Heart diagnostics, consults, and preventive cardiac care.", icon: "heart-pulse" },
  { departmentId: "DEPT-IM", name: "Internal Medicine", floor: "Second Floor", description: "Adult primary care and complex medical management.", icon: "stethoscope", image: serviceImages.outpatientCare },
  { departmentId: "DEPT-PEDS", name: "Pediatrics", floor: "Second Floor", description: "Child wellness, vaccination, and pediatric consultations.", icon: "baby", image: serviceImages.pediatrics },
  { departmentId: "DEPT-ORTHO", name: "Orthopedics", floor: "Third Floor", description: "Bone, joint, spine, and sports injury care.", icon: "bone" },
  { departmentId: "DEPT-DERM", name: "Dermatology", floor: "Third Floor", description: "Skin, hair, nail, and aesthetic dermatology services.", icon: "sparkles" },
  { departmentId: "DEPT-RAD", name: "Radiology", floor: "Second Floor", description: "X-ray, ultrasound, CT, and imaging coordination.", icon: "scan-line", image: serviceImages.radiology },
  { departmentId: "DEPT-LAB", name: "Laboratory", floor: "Ground Floor", description: "Blood work, diagnostics, and specimen collection.", icon: "test-tube", image: serviceImages.laboratory },
  { departmentId: "DEPT-PHARM", name: "Pharmacy", floor: "Ground Floor", description: "Prescription pickup and medication counseling.", icon: "pill" },
  { departmentId: "DEPT-ER", name: "Emergency Department", floor: "Ground Floor", description: "24/7 urgent and emergency medical response.", icon: "siren", image: serviceImages.emergency },
  { departmentId: "DEPT-ENT", name: "ENT", floor: "Third Floor", description: "Ear, nose, throat, hearing, and sinus care.", icon: "ear" },
];
