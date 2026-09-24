# MCMC Hospital Management System Architecture

This document defines the reusable development architecture for the MCMC Hospital Management System. It exists to keep the codebase modular, typed, maintainable, and ready for future integration with NestJS, Supabase, or PostgreSQL without forcing backend infrastructure into the current demo.

## Architecture Goals

- Reuse existing enums, interfaces, types, constants, helpers, hooks, and components before creating new ones.
- Keep repeated domain values out of page and component code.
- Keep route pages focused on composition.
- Keep mock data behind services.
- Keep permissions separate from roles.
- Keep modules small and separated by responsibility.
- Keep TypeScript explicit enough that future API integration is straightforward.
- Follow the conventions of the existing CCIS-FE project where practical.

## System Boundaries

The application contains three separate systems in one Next.js codebase:

1. Public Website + Website Admin
2. Internal Ticketing System
3. Queue Management System

The patient-facing satisfaction survey is a public website experience, not an admin analytics module. It should stay separate from Internal Ticketing and Queue Management.

These systems must not be merged through naming, navigation, or shared workflow assumptions.

### Public Website + Website Admin

Public website routes provide informational hospital content only:

```text
/
/about
/services
/doctors
/hmo
/news
/careers
/contact
/hospital-map
/patient-satisfaction
```

Website Admin manages public website content only:

```text
/website-admin
/website-admin/homepage
/website-admin/services
/website-admin/doctors
/website-admin/news
/website-admin/hmo
/website-admin/careers
/website-admin/contact
/website-admin/media
/website-admin/settings
```

Website Admin must not manage internal staff tickets, role permissions, queue counters, or queue number configuration.

### Patient Satisfaction Survey

The patient satisfaction survey lives at:

```text
/patient-satisfaction
```

It is intended for NFC access on patient phones and does not require login. The survey preserves the MCMC Google Form questions, choices, branching, and 5-0 rating scale while using a mobile-first step-by-step UI.

Survey definitions and response storage belong in:

```text
src/enums/patient-satisfaction.ts
src/types/patient-satisfaction.ts
src/lib/mock/patient-satisfaction.ts
src/lib/services/patient-satisfaction-service.ts
src/components/patient-satisfaction/
```

UI components must not write to `localStorage` directly. Use `patientSatisfactionService` for draft and submitted response persistence. Admin analytics, charts, public satisfaction score calculations, filtering, authentication, and backend/database integration are intentionally out of scope until a later task.

### Internal Ticketing System

Internal Ticketing is for hospital staff and doctors only. Internal tickets represent staff workflow requests and use references such as:

```text
TKT-2026-0001
```

Ticketing routes live under:

```text
/ticketing
/ticketing/tickets
/ticketing/tickets/[id]
/ticketing/assignments
/ticketing/doctors
/ticketing/my-tickets
/ticketing/departments
/ticketing/admin/users
/ticketing/admin/roles
/ticketing/admin/audit-logs
/ticketing/admin/settings
```

Role Management controls access through permissions. IT Admin and Super Admin must be capable of accessing all modules through assigned permissions.

### Queue Management System

Queue Management is a separate service queue number system. Queue numbers are not internal tickets. Examples:

```text
ADM-018
CASH-041
HMO-023
LAB-018
```

Queue Management routes live under:

```text
/queue-system
/queue-system/operator
/queue-system/configuration
/queue-system/kiosk
/queue-system/display
/queue-system/reports
```

Kiosk and display routes must never expose patient names. They should show queue numbers, service names, counters, and general instructions only.

Legacy routes redirect to the new boundaries. For example, `/staff/queue` redirects to `/queue-system/operator`, while `/admin/roles` redirects to `/ticketing/admin/roles`.

## Current Project Shape

The current project uses Next.js App Router with TypeScript, Tailwind CSS, shared UI components, mock data, and a service layer.

```text
src/
  app/
  components/
    brand/
    dashboard/
    doctors/
    demo/
    kiosk/
    layout/
    map/
    queue/
    queue-system/
    ticketing/
    ui/
    website-admin/
  constants/
  lib/
    mock/
    services/
  types/
```

As the system grows, shared enums should live in:

```text
src/enums/
```

Create this directory when the first shared enum is introduced or when an existing repeated union/string value is migrated into an enum.

## Module Responsibilities

### `src/app/`

Contains route segments and page-level composition.

Pages should:

- import services
- fetch or prepare route-level data
- compose reusable components
- keep business logic minimal

Pages should not:

- define reusable domain types
- contain large mock arrays
- duplicate shared UI markup
- contain scattered access-control rules

### `src/components/`

Contains reusable UI components.

Recommended folders:

```text
components/ui/             low-level primitives
components/layout/         nav, shell, page scaffolding
components/brand/          MCMC logo, tagline, brand components
components/doctors/        doctor module UI
components/appointments/   appointment module UI
components/queue/          queue and ticketing UI
components/dashboard/      analytics and dashboards
components/kiosk/          kiosk UI
components/map/            hospital map UI
components/rewards/        rewards UI
components/staff/          staff shell and staff views
components/ticketing/      internal ticketing UI
components/queue-system/   queue management shells
components/website-admin/  website content management UI
```

Before adding a component, search for an existing component that already solves the same UI problem.

### `src/types/`

Contains shared domain models and interfaces.

Examples currently include:

- `Doctor`
- `DoctorSchedule`
- `ScheduleSlot`
- `Appointment`
- `AppointmentRequest`
- `QueueTicket`
- `QueueService`
- `QueueCounter`
- `QueueTransfer`
- `RewardAccount`
- `RewardTransaction`
- `Department`
- `Patient`
- `HospitalFloor`
- `HospitalLocation`

Use these before creating new shapes.

Boundary naming:

- `EntityName` for domain entities
- `EntityNameRequest` for create/update input
- `EntityNameFormValues` for local form state
- `EntityNameDto` only for real API contracts
- `EntityNameSummary` only for intentionally reduced display models

Avoid vague duplicates like `DoctorData`, `DoctorInfo`, `DoctorDetails`, or `DoctorRecord` unless each name represents a documented boundary.

### `src/enums/`

Contains shared domain enums.

Use enums for repeated values such as:

- account statuses
- appointment statuses
- queue statuses
- user roles
- permission codes
- module codes
- ticket states
- staff availability states

Do not hardcode repeated values in components.

Preferred pattern:

```ts
export enum QueueStatus {
  Waiting = "waiting",
  Serving = "serving",
  Completed = "completed",
  Skipped = "skipped",
  Transferred = "transferred",
}
```

Then domain types can reference the enum:

```ts
export interface QueueTicket {
  status: QueueStatus;
}
```

For the current codebase, several status values still exist as string union types. When editing those modules, prefer migrating repeated values into `src/enums/` as part of the same change if the migration is low-risk.

### `src/constants/`

Contains stable shared values.

Examples:

- hospital identity
- MCMC brand tokens
- navigation items
- route paths
- storage keys
- module labels
- role-permission mappings
- shared display labels

Constants should not contain large mock datasets. Large mock datasets belong in `src/lib/mock/`.

### `src/lib/mock/`

Contains mock/demo data only.

Mock data should be realistic and consistent, but UI components should not depend on these arrays directly. The mock layer is a replaceable data source.

### `src/lib/services/`

Contains data access functions.

Services are the boundary between UI and data. Today they can return mock records. Later they can call NestJS, Supabase, or PostgreSQL-backed APIs without rewriting the UI.

Preferred usage:

```ts
const doctors = doctorService.getDoctors();
const ticket = queueService.generateTicket(serviceId);
const rewards = rewardService.getPatientRewards(patientId);
```

Avoid:

```ts
import { doctors } from "@/lib/mock/doctors";
```

inside route pages or UI components when a service exists.

### `src/lib/utils.ts`

Contains small generic helpers only.

Do not turn this file into a catch-all for domain logic. Domain-specific helpers should live near their module or inside a named service.

## Data Flow

The intended data flow is:

```text
Page
  -> service
    -> mock data today
    -> API/backend later
  -> typed reusable component
```

Components should receive typed props. Components should not know whether data came from mock arrays, Supabase, PostgreSQL, or an API.

## Roles And Permissions

Permissions must be separate from roles.

Roles answer:

```text
Who is this user?
```

Permissions answer:

```text
What can this user do?
```

Role checks should not be scattered throughout the UI.

Recommended future structure:

```text
src/enums/role.enum.ts
src/enums/permission.enum.ts
src/constants/role-permissions.ts
src/lib/auth/permissions.ts
```

Example:

```ts
export enum RoleCode {
  SuperAdmin = "SUPER_ADMIN",
  ItAdmin = "IT_ADMIN",
  Doctor = "DOCTOR",
  Nurse = "NURSE",
  Cashier = "CASHIER",
  Patient = "PATIENT",
}

export enum Permission {
  AdminAccess = "admin:access",
  QueueManage = "queue:manage",
  AppointmentManage = "appointment:manage",
  DoctorManage = "doctor:manage",
  RewardManage = "reward:manage",
}
```

Role-to-permission mapping should be centralized:

```ts
export const rolePermissions: Record<RoleCode, Permission[]> = {
  [RoleCode.SuperAdmin]: Object.values(Permission),
  [RoleCode.ItAdmin]: Object.values(Permission),
  [RoleCode.Doctor]: [Permission.AppointmentManage],
  [RoleCode.Nurse]: [Permission.QueueManage],
  [RoleCode.Cashier]: [Permission.QueueManage],
  [RoleCode.Patient]: [],
};
```

IT Admin and Super Admin must be capable of accessing all system modules through permissions.

When adding a protected module:

1. Reuse or create a permission in `src/enums/permission.enum.ts`.
2. Add the permission to the correct roles in the centralized mapping.
3. Gate navigation with the permission.
4. Gate actions with the permission.
5. Avoid direct role-name checks unless the feature is specifically role-management UI.

### Implemented RBAC Layer

The internal operations demo now includes a reusable mock RBAC layer:

```text
src/enums/role.ts
src/enums/permission.ts
src/constants/role-permissions.ts
src/lib/services/auth-service.ts
src/components/auth/permission-gate.tsx
```

Use `authService.hasPermission`, `authService.hasAnyPermission`, `authService.hasAllPermissions`, `Can`, or `PermissionGate` for module and action access.

Do not scatter direct role checks through components. IT Admin receives full access through `authService.hasPermission`, not through repeated UI-specific conditions.

The Admin sidebar uses permission-filtered navigation and a local demo role switcher for presentation previews.

## Internal Ticketing And Queue Management Terminology

Use "Internal Ticketing" only for staff/doctor workflow records with `TKT-2026-XXXX` references.

Use "Queue Management", "queue number", or "service queue number" for public service counters and kiosk/display flows. Do not call queue numbers "tickets" in user-facing labels, navigation, or documentation.

Cashier, HMO, Admission, Laboratory, Pharmacy, Radiology, and Medical Records belong to Queue Management when the workflow is about queue number generation, operator calls, transfer, kiosk, display, or queue configuration.

Do not add diagnosis, prescriptions, medical history, clinical notes, laboratory results, or medical record attachments in this demo.

## Internal Assignments

Internal assignments are modeled with:

```text
src/enums/operations.ts
src/types/operations.ts
src/lib/mock/assignments.ts
src/lib/services/assignment-service.ts
```

Assignment pages should operate on internal staff workflow responsibilities and filter available doctors or staff by department where appropriate. Do not reuse Queue Management counters or queue numbers as internal ticket assignments.

## Audit Events

Audit events are centralized behind:

```text
src/lib/services/audit-service.ts
src/lib/mock/audit-logs.ts
```

Use:

```ts
auditService.log({
  module,
  action,
  recordId,
  description,
});
```

Do not manually duplicate audit object creation in pages. The current demo logs role permission changes, doctor assignment, doctor reassignment, consultation start/completion, department updates, queue configuration updates, user role/status updates, and demo reset.

Demo audit events are local presentation records only. They are not production-grade immutable or cryptographically secured audit persistence.

## Demo State

Internal operations demo state is persisted in browser `localStorage` through service functions.

```text
src/constants/storage-keys.ts
src/lib/services/demo-store.ts
src/lib/services/demo-reset-service.ts
```

The UI should not read or write these storage keys directly. Reset behavior should restore the base mock datasets for public website content, internal tickets, role permissions, assignments, departments, queue configuration, users, and audit logs.

## State Management

Use local React state for current demo interactions when the state is local to one component or route.

Explicitly type state where inference is not exact:

```ts
const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
const [selectedStatus, setSelectedStatus] = useState<QueueStatus>(QueueStatus.Waiting);
const [tickets, setTickets] = useState<QueueTicket[]>([]);
```

Avoid:

```ts
const [tickets, setTickets] = useState([]);
const [selectedDoctor, setSelectedDoctor] = useState(null);
```

Use `localStorage` only for demo persistence or lightweight UI state. Wrap browser-only APIs in client components and guard them from server execution.

## Component Size Guidelines

Avoid very large files.

Split a component when:

- it mixes data access, layout, forms, tables, and modals
- it exceeds roughly 250-300 lines
- it has multiple independent UI sections
- it contains repeated card/list/table markup
- it owns several unrelated pieces of state

Suggested split pattern:

```text
module/
  module-client.tsx
  module-summary-card.tsx
  module-table.tsx
  module-form.tsx
  module-dialog.tsx
  module.types.ts
  module.constants.ts
```

Prefer simple composition over deep abstraction.

## Forms

Form value types should be explicit.

Use a form-specific type when fields differ from the domain entity:

```ts
interface AppointmentFormValues {
  departmentId: string;
  doctorId: string;
  date: string;
  time: string;
  patientType: PatientType;
}
```

Do not reuse a full domain entity type for a partial form if required fields do not match.

## Status And Display Labels

Status values and display labels should be separated.

Example:

```ts
export enum AppointmentStatus {
  Confirmed = "confirmed",
  Pending = "pending",
  Completed = "completed",
  Cancelled = "cancelled",
}

export const appointmentStatusLabels: Record<AppointmentStatus, string> = {
  [AppointmentStatus.Confirmed]: "Confirmed",
  [AppointmentStatus.Pending]: "Pending",
  [AppointmentStatus.Completed]: "Completed",
  [AppointmentStatus.Cancelled]: "Cancelled",
};
```

This prevents repeated label strings and makes future localization easier.

## Routes And Navigation

Keep reusable navigation definitions in `src/constants/navigation.ts` or a module-specific constants file.

Do not duplicate route strings across multiple components when a route is reused.

Recommended future structure:

```text
src/constants/routes.ts
src/constants/navigation.ts
```

Route constants should be especially preferred for:

- portal routes
- staff routes
- admin routes
- appointment flow routes
- queue flow routes

## Brand And Styling

Use the centralized MCMC brand system:

- `src/constants/brand.ts`
- CSS variables in `src/app/globals.css`
- `src/components/brand/mcmc-logo.tsx`
- `src/components/brand/mcmc-tagline.tsx`
- shared UI primitives in `src/components/ui/`

Do not hardcode official colors repeatedly in components.

Use semantic variables such as:

- `var(--brand-primary)`
- `var(--brand-secondary)`
- `var(--brand-surface)`
- `var(--brand-border)`
- `var(--status-success)`
- `var(--status-danger)`

## Mock Data Rules

Mock data should:

- use realistic IDs
- remain internally consistent
- stay in `src/lib/mock/`
- be accessed through `src/lib/services/`
- avoid leaking into UI components directly

Mock data should not:

- become business logic
- define shared enums inline
- duplicate route labels or status strings
- contain real patient-sensitive data

## Future Backend Integration

The service layer is the backend replacement boundary.

When a real backend is introduced:

1. Keep component props and domain types stable where possible.
2. Replace service internals first.
3. Add DTO types only when API contracts differ from UI domain models.
4. Keep API mapping in services or dedicated mappers.
5. Avoid importing API client details into components.

Recommended future structure:

```text
src/lib/api/
src/lib/mappers/
src/lib/services/
src/types/
```

## Development Checklist

Before adding a feature:

1. Search for existing enums, types, constants, services, and components.
2. Reuse first; extend second; create only when necessary.
3. Keep mock data behind services.
4. Keep pages thin.
5. Type local state explicitly when inference is weak.
6. Keep permissions separate from roles.
7. Split large components.
8. Run validation.

Before handoff:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Document any intentional architectural exception in the relevant file or in this guide.
