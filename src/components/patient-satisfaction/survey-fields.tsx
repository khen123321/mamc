import type { ChangeEvent, FormEvent, InputHTMLAttributes, ReactNode } from "react";
import { useId } from "react";
import { cn } from "@/lib/utils";
import { Input, Select, Textarea } from "@/components/ui/input";

export function FieldLabel({ label, required = false, htmlFor, children }: { label: string; required?: boolean; htmlFor?: string; children: ReactNode }) {
  return (
    <div className="grid gap-2 text-sm font-semibold text-slate-700">
      <label htmlFor={htmlFor}>
        <span>{label}{required ? <span className="text-[var(--status-danger)]"> *</span> : null}</span>
      </label>
      {children}
    </div>
  );
}

export function TextField(props: InputHTMLAttributes<HTMLInputElement> & { label: string; required?: boolean }) {
  const { label, required, ...inputProps } = props;
  const generatedId = useId();
  const inputId = inputProps.id ?? generatedId;
  const inputFallback = inputProps.onInput ?? (
    inputProps.onChange
      ? (event: FormEvent<HTMLInputElement>) => {
          inputProps.onChange?.(event as ChangeEvent<HTMLInputElement>);
        }
      : undefined
  );

  return <FieldLabel label={label} required={required} htmlFor={inputId}><Input {...inputProps} id={inputId} required={required} onInput={inputFallback} /></FieldLabel>;
}

export function SelectField({
  label,
  required = false,
  value,
  options,
  placeholder = "Select one",
  id,
  name,
  onChange,
}: {
  label: string;
  required?: boolean;
  value: string;
  options: string[];
  placeholder?: string;
  id?: string;
  name?: string;
  onChange: (value: string) => void;
}) {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  return (
    <FieldLabel label={label} required={required} htmlFor={selectId}>
      <Select id={selectId} name={name} required={required} value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">{placeholder}</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </Select>
    </FieldLabel>
  );
}

export function TextareaField({
  label,
  value,
  onChange,
  placeholder,
  id,
  name,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
  name?: string;
}) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;

  return <FieldLabel label={label} htmlFor={textareaId}><Textarea id={textareaId} name={name} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} /></FieldLabel>;
}

export function ChoiceButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn("rounded-lg border px-4 py-3 text-left text-sm font-semibold transition", selected ? "border-[var(--brand-primary)] bg-[var(--brand-surface-soft)] text-[var(--brand-primary)] ring-4 ring-[var(--brand-focus)]" : "border-slate-200 bg-white text-slate-700 hover:border-[var(--brand-secondary)]")}
    >
      {label}
    </button>
  );
}

export function CheckboxOption({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-3 text-sm font-medium text-slate-700">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="mt-1 h-4 w-4 accent-[var(--brand-primary)]" />
      <span>{label}</span>
    </label>
  );
}
