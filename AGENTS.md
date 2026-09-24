<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# MCMC Development Rules

These rules apply to all work in this MCMC Hospital Management System. The project should follow the modular structure and coding discipline used in the existing CCIS-FE project: reuse first, keep modules separated, avoid duplicate definitions, and make future backend integration straightforward.

## Search Before Creating

Before creating any:

- enum
- interface
- type
- constant
- helper
- utility
- hook
- reusable component

search the existing codebase first.

Use `rg` or `rg --files` before adding new shared code. Check at least:

- `src/enums/`
- `src/types/`
- `src/constants/`
- `src/lib/services/`
- `src/lib/utils.ts`
- `src/components/`

Do not create duplicate definitions. Extend or reuse the existing definition when the meaning is the same.

## Enums

Shared enums belong in:

`src/enums/`

Repeated values must not be hardcoded.

Bad:

```ts
if (status === "ACTIVE") {}
if (role === "DOCTOR") {}
if (ticket.status === "WAITING") {}
```

Good:

```ts
if (status === AccountStatus.Active) {}
if (role === RoleCode.Doctor) {}
if (ticket.status === QueueStatus.Waiting) {}
```

If a value is repeated across modules, define it once as an enum or constant. Do not create a new enum if an existing enum already expresses the same domain concept.

When extending an existing union type from `src/types/`, prefer migrating repeated values to `src/enums/` first, then update the type to use the enum where practical.

## Types And Interfaces

Shared interfaces and reusable domain types belong in:

`src/types/`

Module-specific internal types may stay inside the module file only when they are small and not reused elsewhere.

Before adding a type, search for existing domain models such as:

- `Doctor`
- `Patient`
- `Appointment`
- `QueueTicket`
- `QueueService`
- `RewardAccount`
- `Department`
- `HospitalLocation`
- `HospitalFloor`

Do not create parallel shapes such as `DoctorData`, `DoctorInfo`, or `DoctorRecord` unless they represent a genuinely different boundary, such as an API DTO or form payload.

Name boundary types clearly:

- `AppointmentRequest` for create/update input
- `Appointment` for the domain entity
- `AppointmentFormValues` for local form state
- `AppointmentDto` only when an actual API contract exists

## Constants

Shared constants belong in:

`src/constants/`

Do not hardcode repeated strings for:

- roles
- permissions
- statuses
- queue states
- appointment states
- route paths
- navigation labels
- department codes
- storage keys
- feature flags
- hospital branding

Use constants for stable labels and configuration. Use services for data access.

## Components

Reusable components belong in:

`src/components/`

Before creating a component, search for an existing component with similar responsibility. Prefer extending an existing component with typed props over creating a visually similar duplicate.

Use the current component folders as the default organization:

- `src/components/ui/` for low-level primitives
- `src/components/layout/` for navigation, shells, and page scaffolding
- `src/components/brand/` for MCMC brand components
- `src/components/doctors/` for doctor-specific UI
- `src/components/appointments/` for appointment-specific UI
- `src/components/queue/` for queue-specific UI
- `src/components/dashboard/` for dashboards and analytics UI
- `src/components/kiosk/` for kiosk UI
- `src/components/map/` for hospital map UI
- `src/components/rewards/` for rewards UI

Do not put large amounts of markup directly inside page files. Pages should compose services and reusable components.

## React State

Explicitly type local React state when TypeScript cannot infer the exact domain safely.

Good:

```ts
const [selectedDate, setSelectedDate] = useState<string>("");
const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
const [tickets, setTickets] = useState<QueueTicket[]>([]);
const [status, setStatus] = useState<QueueStatus>(QueueStatus.Waiting);
```

Avoid untyped empty arrays and ambiguous null state.

Bad:

```ts
const [tickets, setTickets] = useState([]);
const [selectedDoctor, setSelectedDoctor] = useState(null);
```

## Avoid Any

Do not use `any` unless there is no reasonable type available.

Preferred alternatives:

- use an existing domain type from `src/types/`
- define a narrow interface
- use `unknown` and narrow it safely
- use generic utility types such as `Partial<T>`, `Pick<T>`, or `Record<K, V>`

If `any` is unavoidable, add a short comment explaining why.

## Services And Data Access

UI should access domain data through services in:

`src/lib/services/`

Mock data belongs in:

`src/lib/mock/`

Pages and components should not depend heavily on mock arrays directly. Use service functions such as:

```ts
doctorService.getDoctors();
appointmentService.getAvailableSlots("DOC-001");
queueService.generateTicket("QS-HMO");
```

This keeps the UI ready for later NestJS, Supabase, or PostgreSQL integration.

## Module Boundaries

Keep modules separated by responsibility.

Recommended boundaries:

- `app/` contains routes and route composition
- `components/` contains reusable UI
- `constants/` contains stable values and config
- `enums/` contains shared repeated domain values
- `lib/mock/` contains demo/mock records
- `lib/services/` contains data access functions
- `lib/` contains shared utilities
- `types/` contains domain models and shared interfaces

Do not import mock data directly into route pages when a service exists.

## File Size And Complexity

Avoid huge components and files.

If a file grows beyond roughly 250-300 lines or mixes unrelated responsibilities, split it into:

- smaller presentational components
- a local helper
- a typed config file
- a service function
- a module-specific constants file

Prefer readable composition over monolithic components.

## Roles And Permissions

Keep permissions separate from roles.

Roles describe who the user is. Permissions describe what the user can do.

Bad:

```ts
if (user.role === "ADMIN") {
  showQueueManagement();
}
```

Good:

```ts
if (user.permissions.includes(Permission.QueueManage)) {
  showQueueManagement();
}
```

Role Management must control access through permissions.

IT Admin and Super Admin must be capable of accessing all system modules through assigned permissions. Do not hardcode module access to a role name unless the role-permission system explicitly maps that role to the required permissions.

## Access Control

When adding protected routes, navigation items, dashboards, or actions:

1. Define or reuse the permission.
2. Map roles to permissions in a single shared location.
3. Check permissions in UI and service boundaries.
4. Keep navigation visibility and action authorization based on permissions.

Do not scatter role checks across components.

## Styling And Brand

Use centralized brand tokens and components.

Use:

- `src/constants/brand.ts`
- CSS variables in `src/app/globals.css`
- `MCMCLogo`
- `MCMCTagline`
- shared UI primitives in `src/components/ui/`

Do not hardcode MCMC colors repeatedly in components.

## Next.js App Router

Follow the App Router conventions already used in this project.

- Use route files under `src/app/`.
- Keep route pages thin.
- Mark interactive components with `"use client"` only when needed.
- Prefer server components for static composition.
- Read the local Next.js guidance in `node_modules/next/dist/docs/` before using APIs that may have changed in Next.js 16.

## Quality Gates

Before completing feature work, run:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Fix lint, type, and build errors before handing off.

## Documentation

When adding a new architectural pattern, shared enum, permission model, or module boundary, update:

`docs/ARCHITECTURE.md`

Keep this file and the architecture guide aligned.
