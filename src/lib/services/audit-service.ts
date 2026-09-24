import { demoStorageKeys } from "@/constants/storage-keys";
import type { AuditAction, AuditModule } from "@/enums/operations";
import { auditLogs } from "@/lib/mock/audit-logs";
import { authService } from "@/lib/services/auth-service";
import { getStoredValue, setStoredValue } from "@/lib/services/demo-store";
import type { AuditLog } from "@/types/operations";

export interface AuditLogInput {
  module: AuditModule;
  action: AuditAction;
  recordId: string;
  description: string;
  metadata?: Record<string, string>;
}

export const auditService = {
  getLogs: (): AuditLog[] => getStoredValue<AuditLog[]>(demoStorageKeys.auditLogs, auditLogs),
  log: (input: AuditLogInput): AuditLog => {
    const actor = authService.getCurrentUser();
    const event: AuditLog = {
      auditId: `AUD-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: actor.name,
      actorId: actor.userId,
      role: actor.role,
      module: input.module,
      action: input.action,
      recordId: input.recordId,
      description: input.description,
      metadata: input.metadata,
    };
    setStoredValue<AuditLog[]>(demoStorageKeys.auditLogs, [event, ...auditService.getLogs()]);
    return event;
  },
};

