import { queueServices } from "@/lib/mock/queue";
import type { QueueConfiguration } from "@/types/operations";

export const queueConfigurations: QueueConfiguration[] = queueServices.map((service, index) => ({
  id: `QCFG-${String(index + 1).padStart(3, "0")}`,
  serviceId: service.serviceId,
  serviceName: service.name,
  prefix: service.prefix.replace("-", ""),
  startingNumber: 1,
  counterCount: service.serviceId === "QS-CASH" ? 4 : service.serviceId === "QS-HMO" ? 3 : service.serviceId === "QS-ADM" ? 3 : 2,
  priorityEnabled: ["QS-ADM", "QS-HMO", "QS-REG", "QS-LAB"].includes(service.serviceId),
  transferEnabled: !["QS-MR"].includes(service.serviceId),
  isActive: true,
}));
