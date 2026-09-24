import { demoStorageKeys } from "@/constants/storage-keys";
import { satisfactionCategories } from "@/lib/mock/patient-satisfaction";
import { getStoredValue, removeStoredValue, setStoredValue } from "@/lib/services/demo-store";
import type {
  PatientSatisfactionDraft,
  PatientSatisfactionResponse,
  SatisfactionCategoryResponse,
} from "@/types/patient-satisfaction";

function createEmptySatisfactionRatings(): Record<string, SatisfactionCategoryResponse> {
  return Object.fromEntries(
    satisfactionCategories.map((category) => [
      category.categoryId,
      {
        categoryId: category.categoryId,
        ratings: Object.fromEntries(category.rows.map((row) => [row, null])),
      },
    ]),
  );
}

export function createEmptyPatientSatisfactionDraft(): PatientSatisfactionDraft {
  return {
    consentAgreed: false,
    personalInformation: {
      patientOrCompanionName: "",
      mobileNumber: "",
      emailAddress: "",
      confinementOrVisitDate: "",
      gender: "",
      ageGroup: "",
      relationToPatient: "",
    },
    visitDetails: {
      purposeOfVisit: "",
      emergency: {
        medicalIllnessReasons: [],
        injuryReasons: [],
        otherMedicalIllness: "",
        otherInjury: "",
      },
      outPatient: {
        reasons: [],
        otherReason: "",
      },
      inPatient: {
        roomNumber: "",
      },
    },
    satisfactionRatings: createEmptySatisfactionRatings(),
    finalFeedback: {
      chooseAgain: "",
      recommendHospital: "",
      reasonsForChoosing: [],
      otherReasonForChoosing: "",
      comments: "",
      overallHospitalAssessment: null,
    },
  };
}

export const patientSatisfactionService = {
  getResponses: (): PatientSatisfactionResponse[] =>
    getStoredValue<PatientSatisfactionResponse[]>(demoStorageKeys.patientSatisfactionResponses, []),
  getDraft: (): PatientSatisfactionDraft => {
    const draft = getStoredValue<PatientSatisfactionDraft | null>(demoStorageKeys.patientSatisfactionDraft, null);
    return draft ?? createEmptyPatientSatisfactionDraft();
  },
  saveDraft: (draft: PatientSatisfactionDraft): PatientSatisfactionDraft =>
    setStoredValue<PatientSatisfactionDraft>(demoStorageKeys.patientSatisfactionDraft, draft),
  clearDraft: () => removeStoredValue(demoStorageKeys.patientSatisfactionDraft),
  submitResponse: (draft: PatientSatisfactionDraft): PatientSatisfactionResponse => {
    const response: PatientSatisfactionResponse = {
      ...draft,
      responseId: `PSR-${Date.now()}`,
      submittedAt: new Date().toISOString(),
    };
    setStoredValue<PatientSatisfactionResponse[]>(demoStorageKeys.patientSatisfactionResponses, [
      response,
      ...patientSatisfactionService.getResponses(),
    ]);
    patientSatisfactionService.clearDraft();
    return response;
  },
};
