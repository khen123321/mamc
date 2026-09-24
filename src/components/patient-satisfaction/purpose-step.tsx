import { VisitPurpose } from "@/enums/patient-satisfaction";
import { visitPurposeOptions } from "@/lib/mock/patient-satisfaction";
import { ChoiceButton } from "@/components/patient-satisfaction/survey-fields";

export function PurposeStep({
  value,
  onChange,
}: {
  value: VisitPurpose | "";
  onChange: (value: VisitPurpose) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-semibold text-slate-950">Purpose of Visit</h2>
        <p className="mt-2 text-base text-slate-600">Dahilan ng pagbisita sa ospital</p>
      </div>
      <div className="grid gap-3">
        {visitPurposeOptions.map((option) => (
          <ChoiceButton key={option} label={option} selected={value === option} onClick={() => onChange(option as VisitPurpose)} />
        ))}
      </div>
    </div>
  );
}
