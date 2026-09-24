import type { ReactNode } from "react";
import { yesNoOptions, reasonsForChoosingHospitalOptions, satisfactionRatingValues } from "@/lib/mock/patient-satisfaction";
import type { PatientSatisfactionFinalFeedback } from "@/types/patient-satisfaction";
import { CheckboxOption, ChoiceButton, TextareaField, TextField } from "@/components/patient-satisfaction/survey-fields";
import { cn } from "@/lib/utils";

export function FinalFeedbackStep({
  value,
  onChange,
}: {
  value: PatientSatisfactionFinalFeedback;
  onChange: (value: PatientSatisfactionFinalFeedback) => void;
}) {
  function toggleReason(reason: string, checked: boolean) {
    onChange({
      ...value,
      reasonsForChoosing: checked ? [...value.reasonsForChoosing, reason] : value.reasonsForChoosing.filter((item) => item !== reason),
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-950">Final Questions</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">Please answer the final feedback questions from the existing MCMC survey.</p>
      </div>

      <QuestionBlock question="If future consults are required, would you still choose our hospital? [Pipiliin mo ba ang aming ospital sa mga susunod na konsultasyon?]">
        <div className="grid gap-3 sm:grid-cols-2">
          {yesNoOptions.map((option) => <ChoiceButton key={option} label={option} selected={value.chooseAgain === option} onClick={() => onChange({ ...value, chooseAgain: option })} />)}
        </div>
      </QuestionBlock>

      <QuestionBlock question="Would you recommend our hospital to others? (Irerekomenda mo ba sa iba?)">
        <div className="grid gap-3 sm:grid-cols-2">
          {yesNoOptions.map((option) => <ChoiceButton key={option} label={option} selected={value.recommendHospital === option} onClick={() => onChange({ ...value, recommendHospital: option })} />)}
        </div>
      </QuestionBlock>

      <QuestionBlock question="What made you choose our hospital? [Dahilan ng pagpili sa aming ospital?] *Please select all that applies.">
        <div className="grid gap-3 md:grid-cols-2">
          {reasonsForChoosingHospitalOptions.map((reason) => (
            <CheckboxOption key={reason} label={reason} checked={value.reasonsForChoosing.includes(reason)} onChange={(checked) => toggleReason(reason, checked)} />
          ))}
        </div>
        {value.reasonsForChoosing.includes("Others") ? (
          <div className="mt-4">
            <TextField label="Please Specify:" value={value.otherReasonForChoosing} onChange={(event) => onChange({ ...value, otherReasonForChoosing: event.target.value })} />
          </div>
        ) : null}
      </QuestionBlock>

      <TextareaField label="Comments:" value={value.comments} onChange={(comments) => onChange({ ...value, comments })} />

      <QuestionBlock question="Overall Hospital Assessment">
        <div className="grid grid-cols-6 gap-2">
          {satisfactionRatingValues.map((rating) => (
            <button
              key={rating}
              type="button"
              onClick={() => onChange({ ...value, overallHospitalAssessment: rating })}
              className={cn("h-12 rounded-md border text-sm font-bold transition", value.overallHospitalAssessment === rating ? "border-[var(--brand-primary)] bg-[var(--brand-primary)] text-white" : "border-slate-200 bg-white text-slate-700 hover:border-[var(--brand-secondary)]")}
            >
              {rating}
            </button>
          ))}
        </div>
      </QuestionBlock>
    </div>
  );
}

function QuestionBlock({ question, children }: { question: string; children: ReactNode }) {
  return (
    <section className="rounded-xl border border-[var(--brand-border)] bg-white p-4">
      <h3 className="text-sm font-semibold leading-6 text-slate-950">{question}</h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}
