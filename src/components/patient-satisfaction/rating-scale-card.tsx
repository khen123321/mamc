import { satisfactionRatingScale } from "@/lib/mock/patient-satisfaction";

export function RatingScaleCard() {
  return (
    <div className="rounded-xl border border-[var(--brand-border)] bg-[var(--brand-surface-soft)] p-4">
      <h3 className="text-base font-semibold text-slate-950">Satisfaction Rating Scale</h3>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {satisfactionRatingScale.map((item) => (
          <div key={item.value} className="rounded-lg bg-white p-3">
            <p className="text-sm font-bold text-[var(--brand-primary)]">{item.value} = {item.label}</p>
            <p className="mt-1 text-xs leading-5 text-slate-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
