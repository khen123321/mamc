import { queueCounters, queueServices, queueTickets } from "@/lib/mock/queue";
import type { QueueTicket } from "@/types/queue";

const nextNumbers: Record<string, number> = {
  "QS-ADM": 18,
  "QS-CASH": 41,
  "QS-HMO": 23,
  "QS-REG": 32,
  "QS-LAB": 18,
  "QS-PHARM": 32,
  "QS-RAD": 14,
  "QS-MR": 9,
};

export const queueService = {
  getServices: () => queueServices,
  getTickets: () => queueTickets,
  getCounters: () => queueCounters,
  getServiceById: (serviceId: string) => queueServices.find((service) => service.serviceId === serviceId),
  getNowServing: () => queueCounters,
  generateTicket: (serviceId: string): QueueTicket => {
    const service = queueServices.find((item) => item.serviceId === serviceId) ?? queueServices[0];
    const number = nextNumbers[service.serviceId] ?? 1;
    const ticketNumber = `${service.prefix}${String(number).padStart(3, "0")}`;
    return {
      queueId: `QUEUE-MOCK-${service.serviceId}`,
      serviceId: service.serviceId,
      ticketNumber,
      status: "waiting",
      counter: service.counterLabel,
      issuedAt: new Date().toISOString(),
      peopleAhead: service.serviceId === "QS-HMO" ? 5 : service.serviceId === "QS-ADM" ? 2 : 4,
      estimatedWaitMinutes: (service.serviceId === "QS-HMO" ? 5 : service.serviceId === "QS-ADM" ? 2 : 4) * service.averageMinutesPerPatient,
      journey: [{ ticketNumber, serviceName: service.name, status: "waiting", time: "10:15 AM" }],
    };
  },
  callNext: (serviceId: string) => queueTickets.find((ticket) => ticket.serviceId === serviceId && ticket.status === "waiting"),
  transferTicket: (ticket: QueueTicket, toServiceId: string): QueueTicket => {
    const next = queueService.generateTicket(toServiceId);
    return {
      ...next,
      journey: [
        ...ticket.journey.map((step) => ({ ...step, status: step.status === "waiting" ? "completed" as const : step.status })),
        { ticketNumber: next.ticketNumber, serviceName: queueService.getServiceById(toServiceId)?.name ?? "Next Service", status: "waiting", time: "10:15 AM" },
      ],
    };
  },
};
