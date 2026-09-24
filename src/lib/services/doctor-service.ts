import { doctors } from "@/lib/mock/doctors";

export const doctorService = {
  getDoctors: () => doctors,
  getFeaturedDoctors: () => doctors.slice(0, 4),
  getDoctorById: (doctorId: string) => doctors.find((doctor) => doctor.doctorId === doctorId),
  getSpecialties: () => Array.from(new Set(doctors.map((doctor) => doctor.specialty))).sort(),
  getDoctorsByDepartment: (departmentId: string) => doctors.filter((doctor) => doctor.departmentId === departmentId),
};
