import { satisfactionRatingValues } from "@/lib/mock/patient-satisfaction";
import type { RatingCategoryDefinition, SatisfactionCategoryResponse, SatisfactionRatingValue } from "@/types/patient-satisfaction";
import { cn } from "@/lib/utils";

export function RatingCategoryCard({
  category,
  value,
  onChange,
}: {
  category: RatingCategoryDefinition;
  value: SatisfactionCategoryResponse;
  onChange: (value: SatisfactionCategoryResponse) => void;
}) {
  function updateRating(row: string, rating: SatisfactionRatingValue) {
    onChange({
      ...value,
      ratings: {
        ...value.ratings,
        [row]: rating,
      },
    });
  }

  return (
    <section className="rounded-xl border border-[var(--brand-border)] bg-white p-5">
      <div>
        <h3 className="text-xl font-semibold text-slate-950">{category.title}</h3>
        <p className="mt-1 text-sm leading-6 text-[var(--brand-primary)]">{category.subtitle}</p>
        <p className="mt-3 text-sm leading-6 text-slate-600">&ldquo;{category.question}&rdquo;</p>
      </div>
      <div className="mt-5 grid gap-4">
        {category.rows.map((row) => (
          <div key={row} className="rounded-lg border border-slate-200 p-3">
            <p className="text-sm font-semibold text-slate-800">{row}</p>
            <div className="mt-3 grid grid-cols-6 gap-2">
              {satisfactionRatingValues.map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => updateRating(row, rating)}
                  className={cn("h-11 rounded-md border text-sm font-bold transition", value.ratings[row] === rating ? "border-[var(--brand-primary)] bg-[var(--brand-primary)] text-white" : "border-slate-200 bg-white text-slate-700 hover:border-[var(--brand-secondary)]")}
                  aria-label={`${row} rating ${rating}`}
                >
                  {rating}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
