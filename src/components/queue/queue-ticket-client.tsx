"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { queueService } from "@/lib/services/queue-service";
import { QueueTicketCard } from "@/components/queue/queue-ticket-card";
import type { QueueTicket } from "@/types/queue";

const fallback = queueService.generateTicket("QS-ADM");

function subscribeStorage(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function readTicket() {
  const stored = window.localStorage.getItem("sr-queue-ticket");
  return stored ? stored : JSON.stringify(fallback);
}

export function QueueTicketClient() {
  const stored = useSyncExternalStore(subscribeStorage, readTicket, () => JSON.stringify(fallback));
  const baseTicket = JSON.parse(stored) as QueueTicket;
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setTick((current) => current + 1), 6000);
    return () => window.clearInterval(timer);
  }, []);
  const ticket = { ...baseTicket, peopleAhead: Math.max(0, baseTicket.peopleAhead - tick), estimatedWaitMinutes: Math.max(2, baseTicket.estimatedWaitMinutes - tick * 3) };
  const service = queueService.getServiceById(ticket.serviceId) ?? queueService.getServices()[0];
  return <QueueTicketCard ticket={ticket} service={service} />;
}
