import { RatingCategoryCard } from "@/components/patient-satisfaction/rating-category-card";
import { RatingScaleCard } from "@/components/patient-satisfaction/rating-scale-card";
import { satisfactionCategories } from "@/lib/mock/patient-satisfaction";
import type { SatisfactionCategoryResponse } from "@/types/patient-satisfaction";

export function SatisfactionRatingsStep({
  value,
  onChange,
}: {
  value: Record<string, SatisfactionCategoryResponse>;
  onChange: (value: Record<string, SatisfactionCategoryResponse>) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-semibold text-slate-950">Satisfaction Ratings</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">Rate each applicable row from 5 to 0 using the exact MCMC rating scale.</p>
      </div>
      <RatingScaleCard />
      <div className="space-y-5">
        {satisfactionCategories.map((category) => (
          <RatingCategoryCard
            key={category.categoryId}
            category={category}
            value={value[category.categoryId]}
            onChange={(categoryResponse) => onChange({ ...value, [category.categoryId]: categoryResponse })}
          />
        ))}
      </div>
    </div>
  );
}
