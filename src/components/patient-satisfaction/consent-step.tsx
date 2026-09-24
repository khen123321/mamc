import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { patientSatisfactionConsentStatement, patientSatisfactionIntroduction } from "@/lib/mock/patient-satisfaction";
import { cn } from "@/lib/utils";

export function ConsentStep({
  agreed,
  onChange,
}: {
  agreed: boolean;
  onChange: (agreed: boolean) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">PATIENT SATISFACTION SURVEY</h1>
        <p className="mt-4 text-base leading-7 text-slate-600">{patientSatisfactionIntroduction}</p>
      </div>
      <Card>
        <CardContent>
          <p className="text-sm leading-7 text-slate-700">{patientSatisfactionConsentStatement}</p>
          <button
            type="button"
            role="checkbox"
            aria-checked={agreed}
            onClick={() => onChange(!agreed)}
            className="mt-6 flex w-full items-center gap-3 rounded-lg border border-[var(--brand-border)] bg-[var(--brand-surface-soft)] p-4 text-left text-sm font-semibold text-slate-800"
          >
            <span className={cn("flex h-5 w-5 shrink-0 items-center justify-center rounded border", agreed ? "border-[var(--brand-primary)] bg-[var(--brand-primary)] text-white" : "border-slate-300 bg-white text-transparent")}>
              <Check className="h-3.5 w-3.5" />
            </span>
            Agree
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
