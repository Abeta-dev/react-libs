# ADR 0007: TypeScript `exactOptionalPropertyTypes` Compatibility Status

## Status
Adopted (Enabled `"exactOptionalPropertyTypes": true` across entire codebase)

## Context
TypeScript 4.4 introduced the `exactOptionalPropertyTypes` compiler flag. When enabled, TypeScript strictly differentiates between an optional property being absent from an object vs. present with the value `undefined`:
- Without `exactOptionalPropertyTypes`: `{ foo?: string }` permits `{ foo: "bar" }`, `{}`, and `{ foo: undefined }`.
- With `exactOptionalPropertyTypes: true`: `{ foo?: string }` permits `{ foo: "bar" }` and `{}`, but raises error `TS2375` on `{ foo: undefined }`. To allow `undefined`, the type must be explicitly written as `{ foo?: string | undefined }`.

As part of quality gate hardening, we resolved all 28 type errors across four domains and enabled `"exactOptionalPropertyTypes": true` in `tsconfig.json`.

## Technical Resolutions Across the 4 Domains

1. **Upstream Headless UI Primitives (@radix-ui/*)**:
   - Where Radix UI type definitions define optional props as `prop?: Type` rather than `prop?: Type | undefined`:
     - `PopoverContent`: `...(side !== undefined ? { side } : {})`
     - `Slider`: `...(value !== undefined ? { value } : {})` and `...(defaultValue !== undefined ? { defaultValue } : {})`
     - `MenubarCheckboxItem`, `ContextMenuCheckboxItem`, `DropdownMenuCheckboxItem`: `...(checked !== undefined ? { checked } : {})`
     - `Combobox`: `...(option.disabled !== undefined ? { disabled: option.disabled } : {})`

2. **TypeScript Standard DOM Library (`lib.dom.d.ts`)**:
   - `RequestInit` in `lib.dom.d.ts` specifies `signal?: AbortSignal | null;` and `credentials?: RequestCredentials;`.
   - In `src/lib/export-utils.ts`: `...(signal ? { signal } : {})` ensures `signal` is only present when non-null.
   - In `src/lib/analytics/adapters/http.ts`: `...(this.credentials !== undefined ? { credentials: this.credentials } : {})`.

3. **Ecosystem & Peer Dependencies (`sonner`, `react-day-picker`)**:
   - `Toaster` in `sonner`: `theme` computed as concrete `NonNullable<ToasterProps["theme"]>` with fallback to `"system"`.
   - `DatePickerWithRange`: `resolvedDefaultMonth` narrowed prior to passing to `Calendar`, passing exact props without undefined pollution.

4. **Internal Interfaces & Component Contracts**:
   - Library interfaces intentionally permit callers to supply `undefined` for optional properties by using explicit `prop?: Type | undefined` syntax:
     - `StepItem`, `StepperProps`, `StepRowProps`, `OnboardingPanelProps`
     - `DataTableProps`, `DatePickerWithRangeProps`, `AmountSummaryCardProps`, `FilterSelectProps`, `FileUploadProps`
     - `AnalyticsEvent`, `AnalyticsConfig`, `AnalyticsQueueOptions`, `DomTrackerOptions`, `AuditTrailPayload`
     - Storybook story helper types updated to permit `undefined` on test args.

## Decision
We enable `"exactOptionalPropertyTypes": true` in `tsconfig.json` alongside:
- `"strict": true` (all strict mode family flags enabled)
- `"noUncheckedIndexedAccess": true` (guards array and record lookups against out-of-bounds `undefined`)
- `"noUnusedLocals": true`
- `"noUnusedParameters": true`
- `"noFallthroughCasesInSwitch": true`

## Consequences
- **Positive**:
  - Maximum TypeScript type rigor: callers and internal implementations cannot accidentally inject `{ prop: undefined }` where an omitted property is expected.
  - Zero compiler errors across 100% of the codebase, including all components, hooks, utilities, tests, and stories.
  - Full compatibility with React 19, Radix UI headless components, Sonner, and React Day Picker maintained without monkey patching.
- **Maintenance**:
  - New components forwarding optional props to third-party types without `| undefined` in their definitions should use conditional key spreading `...(prop !== undefined ? { prop } : {})`.
