import { QueueType } from "@/enums/operations";
import type { QueueCounter, QueueService, QueueTicket } from "@/types/queue";

export const queueServices: QueueService[] = [
  { serviceId: "QS-ADM", name: "Admission", prefix: "ADM-", queueType: QueueType.SERVICE, floor: "First Floor", description: "Admission inquiries, room coordination, and intake processing.", counterLabel: "Counter 1", averageMinutesPerPatient: 5 },
  { serviceId: "QS-CASH", name: "Cashier", prefix: "CASH-", queueType: QueueType.SERVICE, floor: "First Floor", description: "Payments, deposits, and official receipts.", counterLabel: "Counter 3", averageMinutesPerPatient: 4 },
  { serviceId: "QS-HMO", name: "HMO / Insurance", prefix: "HMO-", queueType: QueueType.SERVICE, floor: "First Floor", description: "Eligibility verification and guarantee letters.", counterLabel: "Counter 2", averageMinutesPerPatient: 3 },
  { serviceId: "QS-REG", name: "Registration", prefix: "REG-", queueType: QueueType.SERVICE, floor: "First Floor", description: "Patient registration and record validation.", counterLabel: "Counter 1", averageMinutesPerPatient: 3 },
  { serviceId: "QS-LAB", name: "Laboratory", prefix: "LAB-", queueType: QueueType.SERVICE, floor: "Ground Floor", description: "Specimen collection and lab order processing.", counterLabel: "Counter 4", averageMinutesPerPatient: 4 },
  { serviceId: "QS-PHARM", name: "Pharmacy", prefix: "PHARM-", queueType: QueueType.SERVICE, floor: "Ground Floor", description: "Prescription validation and pickup.", counterLabel: "Counter 4", averageMinutesPerPatient: 3 },
  { serviceId: "QS-RAD", name: "Radiology", prefix: "RAD-", queueType: QueueType.SERVICE, floor: "Second Floor", description: "Imaging registration and procedure queue.", counterLabel: "Counter 1", averageMinutesPerPatient: 6 },
  { serviceId: "QS-MR", name: "Medical Records", prefix: "MR-", queueType: QueueType.SERVICE, floor: "First Floor", description: "Record requests, certificates, and release forms.", counterLabel: "Counter 5", averageMinutesPerPatient: 5 },
];

export const queueCounters: QueueCounter[] = [
  { counterId: "CTR-001", serviceId: "QS-ADM", label: "Counter 1", currentTicketNumber: "ADM-018", staffName: "Carla Gomez" },
  { counterId: "CTR-002", serviceId: "QS-CASH", label: "Counter 3", currentTicketNumber: "CASH-041", staffName: "Mark Lim" },
  { counterId: "CTR-003", serviceId: "QS-HMO", label: "Counter 2", currentTicketNumber: "HMO-023", staffName: "Nurse Camille" },
  { counterId: "CTR-004", serviceId: "QS-LAB", label: "Counter 4", currentTicketNumber: "LAB-018", staffName: "Ana Reyes" },
];

const serviceCycle = queueServices.map((service) => service.serviceId);

export const queueTickets: QueueTicket[] = Array.from({ length: 30 }, (_, index) => {
  const serviceId = serviceCycle[index % serviceCycle.length];
  const service = queueServices.find((item) => item.serviceId === serviceId)!;
  const number = 18 + index;
  const ticketNumber = `${service.prefix}${String(number).padStart(3, "0")}`;
  const status = index % 7 === 0 ? "serving" : index % 5 === 0 ? "completed" : "waiting";
  return {
    queueId: `QUEUE-${String(index + 1).padStart(3, "0")}`,
    serviceId,
    ticketNumber,
    status,
    counter: service.counterLabel,
    issuedAt: `2026-10-05T${String(8 + (index % 8)).padStart(2, "0")}:15:00`,
    peopleAhead: Math.max(0, 8 - (index % 8)),
    estimatedWaitMinutes: Math.max(2, 8 - (index % 8)) * service.averageMinutesPerPatient,
    journey: [{ ticketNumber, serviceName: service.name, status, time: "10:12 AM" }],
  };
});
