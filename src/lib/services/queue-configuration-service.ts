import { demoStorageKeys } from "@/constants/storage-keys";
import { AuditAction, AuditModule } from "@/enums/operations";
import { queueConfigurations } from "@/lib/mock/queue-config";
import { auditService } from "@/lib/services/audit-service";
import { getStoredValue, setStoredValue } from "@/lib/services/demo-store";
import type { QueueConfiguration } from "@/types/operations";

export const queueConfigurationService = {
  getConfigurations: (): QueueConfiguration[] => getStoredValue<QueueConfiguration[]>(demoStorageKeys.queueConfigurations, queueConfigurations),
  saveConfiguration: (configuration: QueueConfiguration): QueueConfiguration[] => {
    const normalized: QueueConfiguration = { ...configuration, prefix: configuration.prefix.trim().toUpperCase() };
    const next = queueConfigurationService.getConfigurations().map((item) => (item.id === configuration.id ? normalized : item));
    setStoredValue<QueueConfiguration[]>(demoStorageKeys.queueConfigurations, next);
    auditService.log({ module: AuditModule.QueueConfiguration, action: AuditAction.UPDATE_QUEUE_CONFIG, recordId: configuration.id, description: `Updated queue configuration for ${configuration.serviceName}.` });
    return next;
  },
  validate: (configuration: QueueConfiguration): string | null => {
    if (!configuration.prefix.trim()) {
      return "Prefix is required.";
    }
    if (!/^[A-Z0-9]{2,8}$/.test(configuration.prefix.trim().toUpperCase())) {
      return "Prefix must be 2-8 uppercase letters or numbers.";
    }
    if (configuration.startingNumber < 1) {
      return "Starting number must be at least 1.";
    }
    if (configuration.counterCount < 1) {
      return "At least one counter is required.";
    }
    return null;
  },
};

