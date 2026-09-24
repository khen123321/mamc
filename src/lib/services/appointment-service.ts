import { appointments } from "@/lib/mock/appointments";
import { departments } from "@/lib/mock/departments";
import { doctors } from "@/lib/mock/doctors";
import { formatDate } from "@/lib/utils";
import type { AppointmentRequest } from "@/types/appointment";

export const appointmentService = {
  getAppointments: () => appointments,
  getPatientAppointments: (patientId: string) => appointments.filter((appointment) => appointment.patientId === patientId),
  getAvailableSlots: (doctorId: string, date?: string) => {
    const doctor = doctors.find((item) => item.doctorId === doctorId);
    const dates = doctor?.schedule.availableDates ?? [];
    return date ? dates.find((item) => item.date === date)?.slots ?? [] : dates.flatMap((item) => item.slots);
  },
  createAppointment: (request: AppointmentRequest) => {
    const doctor = doctors.find((item) => item.doctorId === request.doctorId);
    const department = departments.find((item) => item.departmentId === request.departmentId);
    return {
      appointmentId: "APT-1051",
      reference: "APT-2026-1051",
      visitReference: "MCMC-A7K9P2",
      doctorName: doctor?.name ?? "Selected Doctor",
      departmentName: department?.name ?? "Selected Department",
      date: formatDate(request.date),
      time: request.time,
      clinic: `${department?.name ?? "Clinic"} Clinic - ${doctor?.clinicRoom ?? "Room 204"}`,
      patientName: `${request.firstName} ${request.lastName}`,
    };
  },
};
