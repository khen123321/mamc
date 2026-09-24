import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SurveyStepDefinition {
  id: string;
  label: string;
}

export function SurveyProgress({
  steps,
  currentStep,
}: {
  steps: SurveyStepDefinition[];
  currentStep: number;
}) {
  return (
    <div className="rounded-xl border border-[var(--brand-border)] bg-white p-4">
      <div className="flex items-center justify-between gap-2 text-xs font-semibold text-slate-500">
        <span>Step {currentStep + 1} of {steps.length}</span>
        <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-[var(--brand-primary)] transition-all" style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }} />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 md:grid-cols-6">
        {steps.map((step, index) => (
          <div key={step.id} className={cn("flex min-h-14 flex-col items-center justify-center rounded-lg border px-2 py-2 text-center text-[11px] font-semibold", index <= currentStep ? "border-[var(--brand-primary)] bg-[var(--brand-surface-soft)] text-[var(--brand-primary)]" : "border-slate-200 bg-white text-slate-500")}>
            {index < currentStep ? <CheckCircle2 className="mb-1 h-4 w-4" /> : null}
            {step.label}
          </div>
        ))}
      </div>
    </div>
  );
}
