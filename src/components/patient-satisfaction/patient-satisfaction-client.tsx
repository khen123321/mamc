"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Send } from "lucide-react";
import { MCMCLogo } from "@/components/brand/mcmc-logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ConsentStep } from "@/components/patient-satisfaction/consent-step";
import { FinalFeedbackStep } from "@/components/patient-satisfaction/final-feedback-step";
import { PersonalInformationStep } from "@/components/patient-satisfaction/personal-information-step";
import { PurposeStep } from "@/components/patient-satisfaction/purpose-step";
import { SatisfactionRatingsStep } from "@/components/patient-satisfaction/satisfaction-ratings-step";
import { SurveyProgress, type SurveyStepDefinition } from "@/components/patient-satisfaction/survey-progress";
import { VisitDetailsStep } from "@/components/patient-satisfaction/visit-details-step";
import { VisitPurpose } from "@/enums/patient-satisfaction";
import { satisfactionCategories } from "@/lib/mock/patient-satisfaction";
import { createEmptyPatientSatisfactionDraft, patientSatisfactionService } from "@/lib/services/patient-satisfaction-service";
import type { PatientSatisfactionDraft, PatientSatisfactionPersonalInformation } from "@/types/patient-satisfaction";

const surveySteps: SurveyStepDefinition[] = [
  { id: "consent", label: "Consent" },
  { id: "personal", label: "Personal Info" },
  { id: "purpose", label: "Purpose" },
  { id: "visit-details", label: "Visit Details" },
  { id: "satisfaction", label: "Satisfaction" },
  { id: "final", label: "Final Feedback" },
];

export function PatientSatisfactionClient() {
  const [draft, setDraft] = useState<PatientSatisfactionDraft>(() => createEmptyPatientSatisfactionDraft());
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [draftLoaded, setDraftLoaded] = useState<boolean>(false);

  const currentStepId = surveySteps[currentStep].id;
  const canGoBack = currentStep > 0;
  const isLastStep = currentStep === surveySteps.length - 1;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDraft(patientSatisfactionService.getDraft());
      setDraftLoaded(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (draftLoaded && !submitted) {
      patientSatisfactionService.saveDraft(draft);
    }
  }, [draft, draftLoaded, submitted]);

  const missingRatingCount = useMemo(() => {
    return satisfactionCategories.reduce((count, category) => {
      const categoryRatings = draft.satisfactionRatings[category.categoryId]?.ratings ?? {};
      return count + category.rows.filter((row) => categoryRatings[row] === null || categoryRatings[row] === undefined).length;
    }, 0);
  }, [draft.satisfactionRatings]);

  if (!draftLoaded) {
    return (
      <SurveyShell>
        <Card className="mx-auto max-w-xl">
          <CardContent>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-primary)]">Patient Satisfaction Survey</p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-950">Loading survey...</h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">Preparing the official MCMC feedback form.</p>
          </CardContent>
        </Card>
      </SurveyShell>
    );
  }

  function updateDraft(patch: Partial<PatientSatisfactionDraft>) {
    setDraft((current) => ({ ...current, ...patch }));
    setError("");
  }

  function updatePersonalInformation(patch: Partial<PatientSatisfactionPersonalInformation>) {
    setDraft((previous) => ({
      ...previous,
      personalInformation: {
        ...previous.personalInformation,
        ...patch,
      },
    }));
    setError("");
  }

  function goBack() {
    setCurrentStep((step) => Math.max(0, step - 1));
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function continueForward() {
    const validation = validateStep(currentStepId, draft, missingRatingCount);
    if (validation) {
      setError(validation);
      return;
    }

    if (isLastStep) {
      patientSatisfactionService.submitResponse(draft);
      setSubmitted(true);
      setDraft(createEmptyPatientSatisfactionDraft());
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setCurrentStep((step) => Math.min(surveySteps.length - 1, step + 1));
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (submitted) {
    return (
      <SurveyShell>
        <Card className="mx-auto max-w-xl">
          <CardContent className="text-center">
            <CheckCircle2 className="mx-auto h-14 w-14 text-[var(--brand-primary)]" />
            <h1 className="mt-5 text-3xl font-semibold text-slate-950">Thank You!</h1>
            <p className="mt-4 text-sm leading-6 text-slate-600">Thank you for taking the time to share your experience. Your feedback helps us improve our services.</p>
            <Link href="/" className="mt-7 inline-block"><Button>Back to MCMC Website</Button></Link>
          </CardContent>
        </Card>
      </SurveyShell>
    );
  }

  return (
    <SurveyShell>
      <div className="mx-auto max-w-4xl space-y-5">
        <SurveyProgress steps={surveySteps} currentStep={currentStep} />
        <Card>
          <CardContent>
            {currentStepId === "consent" ? <ConsentStep agreed={draft.consentAgreed} onChange={(consentAgreed) => updateDraft({ consentAgreed })} /> : null}
            {currentStepId === "personal" ? <PersonalInformationStep value={draft.personalInformation} onChange={updatePersonalInformation} /> : null}
            {currentStepId === "purpose" ? <PurposeStep value={draft.visitDetails.purposeOfVisit} onChange={(purposeOfVisit) => updateDraft({ visitDetails: { ...draft.visitDetails, purposeOfVisit } })} /> : null}
            {currentStepId === "visit-details" ? <VisitDetailsStep value={draft.visitDetails} onChange={(visitDetails) => updateDraft({ visitDetails })} /> : null}
            {currentStepId === "satisfaction" ? <SatisfactionRatingsStep value={draft.satisfactionRatings} onChange={(satisfactionRatings) => updateDraft({ satisfactionRatings })} /> : null}
            {currentStepId === "final" ? <FinalFeedbackStep value={draft.finalFeedback} onChange={(finalFeedback) => updateDraft({ finalFeedback })} /> : null}
          </CardContent>
        </Card>

        {error ? <p className="rounded-lg border border-orange-200 bg-orange-50 p-4 text-sm font-semibold text-orange-900">{error}</p> : null}

        <div className="sticky bottom-0 z-10 -mx-4 border-t border-slate-200 bg-[var(--brand-background)]/95 px-4 py-4 backdrop-blur md:static md:mx-0 md:border-0 md:bg-transparent md:p-0">
          <div className="mx-auto flex max-w-4xl gap-3">
            <Button type="button" variant="outline" className="flex-1" disabled={!canGoBack} onClick={goBack}>
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <Button type="button" className="flex-1" onClick={continueForward}>
              {isLastStep ? <Send className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
              {isLastStep ? "Submit" : "Continue"}
            </Button>
          </div>
        </div>
      </div>
    </SurveyShell>
  );
}

function SurveyShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[var(--brand-background)] px-4 py-6 md:px-6 md:py-10">
      <div className="mx-auto mb-6 flex max-w-4xl items-center justify-between gap-4">
        <Link href="/" className="inline-flex items-center">
          <MCMCLogo variant="horizontal" className="max-h-14 max-w-[190px] md:max-w-[220px]" />
        </Link>
        <span className="hidden rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-primary)] ring-1 ring-[var(--brand-border)] sm:inline-flex">
          Official Feedback Form
        </span>
      </div>
      {children}
    </main>
  );
}

function validateStep(stepId: string, draft: PatientSatisfactionDraft, missingRatingCount: number): string {
  if (stepId === "consent" && !draft.consentAgreed) {
    return "Please agree to the consent statement before continuing.";
  }

  if (stepId === "personal") {
    const personal = draft.personalInformation;
    if (!personal.patientOrCompanionName.trim() || !personal.mobileNumber.trim() || !personal.confinementOrVisitDate || !personal.gender || !personal.ageGroup) {
      return "Please complete all required personal information fields.";
    }
    if (personal.emailAddress.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personal.emailAddress.trim())) {
      return "Please enter a valid email address or leave the email field blank.";
    }
  }

  if (stepId === "purpose" && !draft.visitDetails.purposeOfVisit) {
    return "Please select the purpose of visit.";
  }

  if (stepId === "visit-details") {
    const details = draft.visitDetails;
    if (details.purposeOfVisit === VisitPurpose.ER) {
      if (details.emergency.medicalIllnessReasons.includes("Others") && !details.emergency.otherMedicalIllness.trim()) {
        return "Please specify the other medical/illness reason.";
      }
      if (details.emergency.injuryReasons.includes("Others") && !details.emergency.otherInjury.trim()) {
        return "Please specify the other injury reason.";
      }
    }
    if (details.purposeOfVisit === VisitPurpose.OutPatient && details.outPatient.reasons.includes("Others (Please specify)") && !details.outPatient.otherReason.trim()) {
      return "Please specify the other outpatient reason.";
    }
  }

  if (stepId === "satisfaction" && missingRatingCount > 0) {
    return `Please complete all satisfaction ratings. ${missingRatingCount} item${missingRatingCount === 1 ? "" : "s"} remaining.`;
  }

  if (stepId === "final") {
    if (draft.finalFeedback.reasonsForChoosing.includes("Others") && !draft.finalFeedback.otherReasonForChoosing.trim()) {
      return "Please specify the other reason for choosing the hospital.";
    }
    if (draft.finalFeedback.overallHospitalAssessment === null) {
      return "Please provide the required Overall Hospital Assessment rating.";
    }
  }

  return "";
}
