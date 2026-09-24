import type { QueueType } from "@/enums/operations";

export type QueueStatus = "waiting" | "serving" | "completed" | "skipped" | "transferred";

export interface QueueService {
  serviceId: string;
  name: string;
  prefix: string;
  queueType: QueueType;
  floor: string;
  description: string;
  counterLabel: string;
  averageMinutesPerPatient: number;
}

export interface QueueCounter {
  counterId: string;
  serviceId: string;
  label: string;
  currentTicketNumber: string;
  staffName: string;
}

export interface QueueTicket {
  queueId: string;
  serviceId: string;
  ticketNumber: string;
  status: QueueStatus;
  counter: string;
  issuedAt: string;
  calledAt?: string;
  completedAt?: string;
  peopleAhead: number;
  estimatedWaitMinutes: number;
  journey: { ticketNumber: string; serviceName: string; status: QueueStatus; time: string }[];
}

export interface QueueTransfer {
  transferId: string;
  fromTicketId: string;
  toTicketId: string;
  fromServiceId: string;
  toServiceId: string;
  transferredAt: string;
}
