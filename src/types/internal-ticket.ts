import type { InternalTicketStatus, TicketPriority } from "@/enums/operations";

export interface InternalTicket {
  id: string;
  ticketNumber: string;
  title: string;
  description: string;
  departmentId: string;
  departmentName: string;
  createdByUserId: string;
  createdByName: string;
  assignedUserId?: string;
  assignedUserName?: string;
  assignedDoctorId?: string;
  assignedDoctorName?: string;
  priority: TicketPriority;
  status: InternalTicketStatus;
  createdAt: string;
  updatedAt: string;
}

export interface InternalTicketUpdate {
  ticketId: string;
  status?: InternalTicketStatus;
  assignedUserId?: string;
  assignedUserName?: string;
  assignedDoctorId?: string;
  assignedDoctorName?: string;
}
