import {
  patientRelationOptions,
  patientSatisfactionAgeGroupOptions,
  patientSatisfactionGenderOptions,
} from "@/lib/mock/patient-satisfaction";
import type { PatientSatisfactionPersonalInformation } from "@/types/patient-satisfaction";
import { SelectField, TextField } from "@/components/patient-satisfaction/survey-fields";

export function PersonalInformationStep({
  value,
  onChange,
}: {
  value: PatientSatisfactionPersonalInformation;
  onChange: (value: Partial<PatientSatisfactionPersonalInformation>) => void;
}) {
  return (
    <div className="space-y-5">
      <SectionHeading title="Personal Information" description="Please provide the basic visit information requested in the existing MCMC survey." />
      <div className="grid gap-4 md:grid-cols-2">
        <TextField id="patientOrCompanionName" name="patientOrCompanionName" autoComplete="name" label="Name of Patient / Companion" required value={value.patientOrCompanionName} onChange={(event) => onChange({ patientOrCompanionName: event.target.value })} />
        <TextField id="mobileNumber" name="mobileNumber" autoComplete="tel" label="Mobile No." required type="tel" value={value.mobileNumber} onChange={(event) => onChange({ mobileNumber: event.target.value })} />
        <TextField id="emailAddress" name="emailAddress" autoComplete="email" label="Email Address" type="email" value={value.emailAddress} onChange={(event) => onChange({ emailAddress: event.target.value })} />
        <TextField id="confinementOrVisitDate" name="confinementOrVisitDate" label="Date of Confinement/Visit" required type="date" value={value.confinementOrVisitDate} onChange={(event) => onChange({ confinementOrVisitDate: event.target.value })} />
        <SelectField id="gender" name="gender" label="Gender" required value={value.gender} options={patientSatisfactionGenderOptions} onChange={(gender) => onChange({ gender: gender as PatientSatisfactionPersonalInformation["gender"] })} />
        <SelectField id="ageGroup" name="ageGroup" label="Age Group" required value={value.ageGroup} options={patientSatisfactionAgeGroupOptions} onChange={(ageGroup) => onChange({ ageGroup: ageGroup as PatientSatisfactionPersonalInformation["ageGroup"] })} />
      </div>
      <SelectField
        id="relationToPatient"
        name="relationToPatient"
        label="If the respondent is not the patient, please indicate relation to Patient:"
        value={value.relationToPatient}
        options={patientRelationOptions}
        onChange={(relationToPatient) => onChange({ relationToPatient: relationToPatient as PatientSatisfactionPersonalInformation["relationToPatient"] })}
      />
    </div>
  );
}

function SectionHeading({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-slate-950">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}
