import { demoStorageKeys } from "@/constants/storage-keys";
import { AuditAction, AuditModule, InternalTicketStatus } from "@/enums/operations";
import { internalTickets } from "@/lib/mock/internal-tickets";
import { auditService } from "@/lib/services/audit-service";
import { getStoredValue, setStoredValue } from "@/lib/services/demo-store";
import type { InternalTicket, InternalTicketUpdate } from "@/types/internal-ticket";

export interface InternalTicketStats {
  open: number;
  assigned: number;
  inProgress: number;
  pending: number;
  resolved: number;
  closed: number;
}

function getTickets(): InternalTicket[] {
  return getStoredValue<InternalTicket[]>(demoStorageKeys.internalTickets, internalTickets);
}

function saveTickets(tickets: InternalTicket[]): InternalTicket[] {
  return setStoredValue<InternalTicket[]>(demoStorageKeys.internalTickets, tickets);
}

export const internalTicketService = {
  getTickets,
  getTicketById: (ticketId: string): InternalTicket | undefined =>
    getTickets().find((ticket) => ticket.id === ticketId || ticket.ticketNumber === ticketId),
  getMyTickets: (assigneeName: string): InternalTicket[] =>
    getTickets().filter((ticket) => ticket.assignedUserName === assigneeName || ticket.assignedDoctorName === assigneeName),
  updateTicket: (update: InternalTicketUpdate): InternalTicket | undefined => {
    const tickets = getTickets();
    const currentTicket = tickets.find((ticket) => ticket.id === update.ticketId || ticket.ticketNumber === update.ticketId);

    if (!currentTicket) {
      return undefined;
    }

    const updatedTicket: InternalTicket = {
      ...currentTicket,
      ...update,
      id: currentTicket.id,
      ticketNumber: currentTicket.ticketNumber,
      updatedAt: new Date().toISOString(),
    };

    saveTickets(tickets.map((ticket) => (ticket.id === currentTicket.id ? updatedTicket : ticket)));

    auditService.log({
      module: AuditModule.InternalTicketing,
      action: update.assignedUserId || update.assignedDoctorId ? AuditAction.ASSIGN_TICKET : AuditAction.UPDATE_STATUS,
      recordId: updatedTicket.ticketNumber,
      description: `Updated internal workflow ticket ${updatedTicket.ticketNumber}.`,
      metadata: {
        status: updatedTicket.status,
        assignedTo: updatedTicket.assignedUserName ?? updatedTicket.assignedDoctorName ?? "Unassigned",
      },
    });

    return updatedTicket;
  },
  getStats: (): InternalTicketStats => {
    const tickets = getTickets();
    return {
      open: tickets.filter((ticket) => ticket.status === InternalTicketStatus.OPEN).length,
      assigned: tickets.filter((ticket) => ticket.status === InternalTicketStatus.ASSIGNED).length,
      inProgress: tickets.filter((ticket) => ticket.status === InternalTicketStatus.IN_PROGRESS).length,
      pending: tickets.filter((ticket) => ticket.status === InternalTicketStatus.PENDING).length,
      resolved: tickets.filter((ticket) => ticket.status === InternalTicketStatus.RESOLVED).length,
      closed: tickets.filter((ticket) => ticket.status === InternalTicketStatus.CLOSED).length,
    };
  },
};
