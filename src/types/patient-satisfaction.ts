import type {
  PatientRelation,
  PatientSatisfactionAgeGroup,
  PatientSatisfactionGender,
  VisitPurpose,
  YesNoAnswer,
} from "@/enums/patient-satisfaction";

export type SatisfactionRatingValue = 5 | 4 | 3 | 2 | 1 | 0;

export interface PatientSatisfactionPersonalInformation {
  patientOrCompanionName: string;
  mobileNumber: string;
  emailAddress: string;
  confinementOrVisitDate: string;
  gender: PatientSatisfactionGender | "";
  ageGroup: PatientSatisfactionAgeGroup | "";
  relationToPatient: PatientRelation | "";
}

export interface EmergencyVisitDetails {
  medicalIllnessReasons: string[];
  injuryReasons: string[];
  otherMedicalIllness: string;
  otherInjury: string;
}

export interface OutPatientVisitDetails {
  reasons: string[];
  otherReason: string;
}

export interface InPatientVisitDetails {
  roomNumber: string;
}

export interface PatientSatisfactionVisitDetails {
  purposeOfVisit: VisitPurpose | "";
  emergency: EmergencyVisitDetails;
  outPatient: OutPatientVisitDetails;
  inPatient: InPatientVisitDetails;
}

export interface SatisfactionCategoryResponse {
  categoryId: string;
  ratings: Record<string, SatisfactionRatingValue | null>;
}

export interface PatientSatisfactionFinalFeedback {
  chooseAgain: YesNoAnswer | "";
  recommendHospital: YesNoAnswer | "";
  reasonsForChoosing: string[];
  otherReasonForChoosing: string;
  comments: string;
  overallHospitalAssessment: SatisfactionRatingValue | null;
}

export interface PatientSatisfactionDraft {
  consentAgreed: boolean;
  personalInformation: PatientSatisfactionPersonalInformation;
  visitDetails: PatientSatisfactionVisitDetails;
  satisfactionRatings: Record<string, SatisfactionCategoryResponse>;
  finalFeedback: PatientSatisfactionFinalFeedback;
}

export interface PatientSatisfactionResponse extends PatientSatisfactionDraft {
  responseId: string;
  submittedAt: string;
}

export interface RatingScaleDefinition {
  value: SatisfactionRatingValue;
  label: string;
  description: string;
}

export interface RatingCategoryDefinition {
  categoryId: string;
  title: string;
  subtitle: string;
  question: string;
  rows: string[];
}
