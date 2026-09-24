"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { queueConfigurationService } from "@/lib/services/queue-configuration-service";
import { queueConfigurations } from "@/lib/mock/queue-config";
import type { QueueConfiguration } from "@/types/operations";

export function QueueConfigurationClient() {
  const [configurations, setConfigurations] = useState<QueueConfiguration[]>(queueConfigurations);
  const [selected, setSelected] = useState<QueueConfiguration | null>(queueConfigurations[0] ?? null);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const storedConfigurations = queueConfigurationService.getConfigurations();
      setConfigurations(storedConfigurations);
      setSelected((current) => storedConfigurations.find((configuration) => configuration.id === current?.id) ?? storedConfigurations[0] ?? null);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function updateSelected(patch: Partial<QueueConfiguration>) {
    setSelected((current) => (current ? { ...current, ...patch } : current));
  }

  function saveConfiguration() {
    if (!selected) {
      return;
    }

    const validation = queueConfigurationService.validate(selected);
    if (validation) {
      setMessage(validation);
      return;
    }

    const next = queueConfigurationService.saveConfiguration(selected);
    setConfigurations(next);
    setSelected(next.find((item) => item.id === selected.id) ?? selected);
    setMessage("Queue configuration saved");
  }

  function toggleActive(configuration: QueueConfiguration) {
    if (configuration.isActive && !window.confirm(`Disable ${configuration.serviceName} queue service?`)) {
      return;
    }
    const nextConfiguration = { ...configuration, isActive: !configuration.isActive };
    const next = queueConfigurationService.saveConfiguration(nextConfiguration);
    setConfigurations(next);
    setSelected(nextConfiguration);
    setMessage(`${configuration.serviceName} status updated`);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
      <Card>
        <CardHeader>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-primary)]">Queue Services</p>
          <h2 className="mt-1 text-xl font-semibold text-slate-950">Number Prefixes, Counters, Priority Lane</h2>
        </CardHeader>
        <CardContent>
          {configurations.length === 0 ? (
            <EmptyState title="No queue configurations found." />
          ) : (
            <div className="grid gap-3 lg:grid-cols-2">
              {configurations.map((configuration) => (
                <button key={configuration.id} onClick={() => setSelected(configuration)} className={`rounded-md border p-4 text-left transition ${selected?.id === configuration.id ? "border-[var(--brand-primary)] bg-[var(--brand-surface-soft)]" : "border-[var(--brand-border)] bg-white hover:border-[var(--brand-secondary)]"}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-950">{configuration.serviceName}</p>
                      <p className="text-sm text-slate-500">Prefix: {configuration.prefix} · Start: {String(configuration.startingNumber).padStart(3, "0")}</p>
                    </div>
                    <Badge tone={configuration.isActive ? "green" : "slate"}>{configuration.isActive ? "Active" : "Inactive"}</Badge>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-slate-600">
                    <span>Counters: {configuration.counterCount}</span>
                    <span>{configuration.priorityEnabled ? "Priority" : "Regular"}</span>
                    <span>{configuration.transferEnabled ? "Transfer On" : "Transfer Off"}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-primary)]">Configuration Form</p>
          <h2 className="mt-1 text-xl font-semibold text-slate-950">{selected?.serviceName ?? "Select a service"}</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          {!selected ? (
            <EmptyState title="No service selected." />
          ) : (
            <>
              {message ? <p className="flex items-center gap-2 rounded-md bg-green-50 p-3 text-sm font-semibold text-green-800"><CheckCircle2 className="h-4 w-4" />{message}</p> : null}
              <label className="block text-sm font-medium text-slate-700">Prefix<Input value={selected.prefix} onChange={(event) => updateSelected({ prefix: event.target.value.toUpperCase() })} className="mt-1" /></label>
              <label className="block text-sm font-medium text-slate-700">Starting Number<Input type="number" min={1} value={selected.startingNumber} onChange={(event) => updateSelected({ startingNumber: Number(event.target.value) })} className="mt-1" /></label>
              <label className="block text-sm font-medium text-slate-700">Number of Counters<Input type="number" min={1} value={selected.counterCount} onChange={(event) => updateSelected({ counterCount: Number(event.target.value) })} className="mt-1" /></label>
              {[
                ["priorityEnabled", "Priority Queue Enabled"],
                ["transferEnabled", "Transfer Enabled"],
                ["isActive", "Active"],
              ].map(([key, label]) => (
                <label key={key} className="flex items-center justify-between rounded-md border border-[var(--brand-border)] px-4 py-3 text-sm font-medium text-slate-700">
                  {label}
                  <input type="checkbox" checked={Boolean(selected[key as keyof QueueConfiguration])} onChange={(event) => updateSelected({ [key]: event.target.checked } as Partial<QueueConfiguration>)} className="h-4 w-4 accent-[var(--brand-primary)]" />
                </label>
              ))}
              <div className="flex gap-2">
                <Button onClick={saveConfiguration}><Save className="h-4 w-4" />Save</Button>
                <Button variant="outline" onClick={() => toggleActive(selected)}>{selected.isActive ? "Disable Service" : "Enable Service"}</Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
