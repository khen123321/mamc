import {
  PatientRelation,
  PatientSatisfactionAgeGroup,
  PatientSatisfactionGender,
  VisitPurpose,
  YesNoAnswer,
} from "@/enums/patient-satisfaction";
import type { RatingCategoryDefinition, RatingScaleDefinition } from "@/types/patient-satisfaction";

export const patientSatisfactionConsentStatement =
  "By filling-up this survey form, I hereby declare that I have read and understood the Hospital’s Data Privacy Statement included in the admission forms I have previously signed, and I further express my consent for the Hospital to collect, record, organize, update, modify, retrieve, consult, use, consolidate, block, erase, and/or destroy my personal, privileged, or sensitive information.";

export const patientSatisfactionIntroduction =
  "We are continuously finding better ways to improve our services. Your feedback is highly appreciated. All information provided will be treated with privacy and confidentiality.";

export const patientSatisfactionGenderOptions = Object.values(PatientSatisfactionGender);
export const patientSatisfactionAgeGroupOptions = Object.values(PatientSatisfactionAgeGroup);
export const patientRelationOptions = Object.values(PatientRelation);
export const visitPurposeOptions = Object.values(VisitPurpose);
export const yesNoOptions = Object.values(YesNoAnswer);

export const emergencyMedicalIllnessOptions = ["Heart Problem", "Stroke", "Difficulty of breathing", "Others"];
export const emergencyInjuryOptions = ["Trauma / Accident / Fracture", "Burn", "Bleeding", "Poisoning", "Others"];

export const outPatientReasonOptions = [
  "Consultation",
  "Follow up Consultation",
  "Laboratory",
  "X-ray / Ultrasound",
  "Vaccination",
  "Minor / Major Operation",
  "Others (Please specify)",
];

export const reasonsForChoosingHospitalOptions = [
  "Doctor’s order",
  "Previous consult /check-up",
  "Recommended by friends/relatives",
  "Referred by other hospital within the network (Mount Grace)",
  "Hospitalization plan (Insurance, HMO, Corporate)",
  "Hospital staff’s referral",
  "Advertisements and publicity",
  "Social Media (Facebook, Instagram, Twitter)",
  "Website",
  "Popularity of hospital within the area",
  "Known doctors",
  "Others",
];

export const satisfactionRatingScale: RatingScaleDefinition[] = [
  { value: 5, label: "VERY SATISFIED", description: "exceeds satisfaction and expectations all the time" },
  { value: 4, label: "SATISFIED", description: "exceeds satisfaction and expectations most of the time" },
  { value: 3, label: "NEUTRAL", description: "meets satisfaction and expectations all the time" },
  { value: 2, label: "FAIR", description: "meets satisfaction and expectations sometimes" },
  { value: 1, label: "DISSATISFIED", description: "rarely meets satisfaction and expectations" },
  { value: 0, label: "NOT APPLICABLE", description: "does not apply with the given scenario" },
];

export const satisfactionRatingValues = satisfactionRatingScale.map((item) => item.value);

export const satisfactionCategories: RatingCategoryDefinition[] = [
  {
    categoryId: "timeliness",
    title: "Timeliness",
    subtitle: "Mabilis na serbisyo sa pangangailangan ng pasyente",
    question: "Promptly attended to your needs; process was smooth; constantly received updates",
    rows: ["Emergency Room", "Admission", "Nurses", "Doctor – Consultant", "Doctor – Intern/Resident", "Procedures & Tests", "Meal/s", "Room"],
  },
  {
    categoryId: "communication",
    title: "Communication",
    subtitle: "Maayos at malinaw na pagpapaliwanag ng mga preparasyon, impormasyon at medical procedure.",
    question: "Explained completely and accurately things you need to know (procedures and/or preparations to be done, your condition/diet)",
    rows: ["Emergency Room", "Admission", "Nurses", "Doctor – Consultant", "Doctor – Intern/Resident", "Procedures & Tests", "Meal/s"],
  },
  {
    categoryId: "customer-relations",
    title: "Customer Relations",
    subtitle: "Pakikitungo ng mga empleyado",
    question: "Staff/Doctors are friendly, courteous & caring. Spent enough time with you and were helpful and efficient.",
    rows: ["Emergency Room", "Admission", "Nurses", "Doctor – Consultant", "Doctor – Intern/Resident", "Procedures & Tests", "Dietary (Meals)", "Discharge", "Other Facilities (Information/ Front Desk, Telephone Operator, Guards)"],
  },
  {
    categoryId: "service",
    title: "Service",
    subtitle: "Tama at maayos na pagbibigay ng serbisyo.",
    question: "Accuracy and efficiency of process, quality and accessibility",
    rows: ["Dietary (Meals)", "Discharge", "Other Facilities (Information/ Front Desk, Telephone Operator, Guards)"],
  },
  {
    categoryId: "hospital-upkeep",
    title: "Hospital Upkeep",
    subtitle: "Kaayusan ng buong ospital. (Malinis at kumpletong pasilidad)",
    question: "Clean, complete amenities, including communication system, all functional",
    rows: ["Room", "Other Facilities (cafeteria, common restrooms)", "Infection Control measures (COVID-19) (Physical Distancing, Wearing of Mask, Alcohol/ Sanitizers in Hallways, Temperature Scanning)", "Disinfection / Sanitation"],
  },
];
