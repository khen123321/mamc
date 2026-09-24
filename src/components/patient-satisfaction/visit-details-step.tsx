import { VisitPurpose } from "@/enums/patient-satisfaction";
import {
  emergencyInjuryOptions,
  emergencyMedicalIllnessOptions,
  outPatientReasonOptions,
} from "@/lib/mock/patient-satisfaction";
import type { PatientSatisfactionVisitDetails } from "@/types/patient-satisfaction";
import { CheckboxOption, TextField } from "@/components/patient-satisfaction/survey-fields";

export function VisitDetailsStep({
  value,
  onChange,
}: {
  value: PatientSatisfactionVisitDetails;
  onChange: (value: PatientSatisfactionVisitDetails) => void;
}) {
  if (value.purposeOfVisit === VisitPurpose.ER) {
    return <EmergencyDetails value={value} onChange={onChange} />;
  }

  if (value.purposeOfVisit === VisitPurpose.OutPatient) {
    return <OutPatientDetails value={value} onChange={onChange} />;
  }

  if (value.purposeOfVisit === VisitPurpose.InPatient) {
    return <InPatientDetails value={value} onChange={onChange} />;
  }

  return <p className="text-sm text-slate-600">Please select a purpose of visit first.</p>;
}

function EmergencyDetails({
  value,
  onChange,
}: {
  value: PatientSatisfactionVisitDetails;
  onChange: (value: PatientSatisfactionVisitDetails) => void;
}) {
  return (
    <div className="space-y-6">
      <BranchHeading title="Reason for Emergency" subtitle="Dahilan ng Emergency" />
      <CheckboxGroup
        title="Emergency I (Medical/Illness)"
        options={emergencyMedicalIllnessOptions}
        selected={value.emergency.medicalIllnessReasons}
        onChange={(medicalIllnessReasons) => onChange({ ...value, emergency: { ...value.emergency, medicalIllnessReasons } })}
      />
      {value.emergency.medicalIllnessReasons.includes("Others") ? (
        <TextField label="Please Specify:" value={value.emergency.otherMedicalIllness} onChange={(event) => onChange({ ...value, emergency: { ...value.emergency, otherMedicalIllness: event.target.value } })} />
      ) : null}
      <CheckboxGroup
        title="Emergency II (Injury)"
        options={emergencyInjuryOptions}
        selected={value.emergency.injuryReasons}
        onChange={(injuryReasons) => onChange({ ...value, emergency: { ...value.emergency, injuryReasons } })}
      />
      {value.emergency.injuryReasons.includes("Others") ? (
        <TextField label="Please Specify:" value={value.emergency.otherInjury} onChange={(event) => onChange({ ...value, emergency: { ...value.emergency, otherInjury: event.target.value } })} />
      ) : null}
    </div>
  );
}

function OutPatientDetails({
  value,
  onChange,
}: {
  value: PatientSatisfactionVisitDetails;
  onChange: (value: PatientSatisfactionVisitDetails) => void;
}) {
  return (
    <div className="space-y-6">
      <BranchHeading title="Reason for Visit / Consultation" subtitle="Dahilan ng pagkonsulta / check-up" />
      <CheckboxGroup
        title="Choices"
        options={outPatientReasonOptions}
        selected={value.outPatient.reasons}
        onChange={(reasons) => onChange({ ...value, outPatient: { ...value.outPatient, reasons } })}
      />
      {value.outPatient.reasons.includes("Others (Please specify)") ? (
        <TextField label="Please Specify:" value={value.outPatient.otherReason} onChange={(event) => onChange({ ...value, outPatient: { ...value.outPatient, otherReason: event.target.value } })} />
      ) : null}
    </div>
  );
}

function InPatientDetails({
  value,
  onChange,
}: {
  value: PatientSatisfactionVisitDetails;
  onChange: (value: PatientSatisfactionVisitDetails) => void;
}) {
  return (
    <div className="space-y-6">
      <BranchHeading title="Room Number" subtitle="In Patient details" />
      <TextField label="Indicate Room Number" value={value.inPatient.roomNumber} onChange={(event) => onChange({ ...value, inPatient: { roomNumber: event.target.value } })} />
    </div>
  );
}

function CheckboxGroup({
  title,
  options,
  selected,
  onChange,
}: {
  title: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}) {
  function toggle(option: string, checked: boolean) {
    onChange(checked ? [...selected, option] : selected.filter((item) => item !== option));
  }

  return (
    <div className="space-y-3">
      <h3 className="text-base font-semibold text-slate-950">{title}</h3>
      <div className="grid gap-3 md:grid-cols-2">
        {options.map((option) => (
          <CheckboxOption key={option} label={option} checked={selected.includes(option)} onChange={(checked) => toggle(option, checked)} />
        ))}
      </div>
    </div>
  );
}

function BranchHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-slate-950">{title}</h2>
      <p className="mt-2 text-base text-slate-600">{subtitle}</p>
    </div>
  );
}
