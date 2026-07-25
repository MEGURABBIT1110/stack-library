# Review Gates

Use only the stages needed for the task. An established screen change usually starts at Stage 3. A pure accessibility review may run Stage 6 alone.

## Contents

- Preflight
- Stage 1 — Product foundation
- Stage 2 — System foundation
- Stage 3 — Layout and information architecture
- Stage 4 — Components and states
- Stage 5 — Interaction and craft
- Stage 6 — Accessibility and technical quality
- Severity
- Review output
- Completion evidence

## Preflight — premise integrity

Before choosing a stage, verify:

- the current pattern still serves the product thesis and requested task;
- reuse would preserve meaning rather than merely preserve appearance;
- neighboring screens, breakpoints, themes, and states do not expose a contradiction;
- the design is not carrying forward a provisional, deprecated, or generic default;
- the proposed change addresses the cause rather than decorating the symptom.

Classify the inspected scope as:

- **Preserve:** coherent and intentional;
- **Correct now:** Blocker, Major, or an obvious low-risk local defect;
- **Defer:** valid concern outside the coherent task boundary.

Gate: the chosen scope is the smallest coherent result, not simply the smallest edit.

## Stage 1 — Product foundation

Verify:

- the human, action, meaning, and desired feeling are concrete;
- the feature strengthens the technical knowledge archive;
- one product-specific signature exists;
- three generic defaults have been named and rejected;
- terminology matches the current content model.

Gate: the direction is identifiable as Stack Library without decorative branding.

## Stage 2 — System foundation

Verify:

- current theme variables and typography are reused;
- light and dark modes express the same hierarchy;
- spacing, radius, border, and elevation follow a coherent scale;
- color has a semantic or interactive purpose;
- new tokens or components have a proven need;
- component properties describe meaningful structural or content variation.
- each component is assigned to the lowest Atomic Design layer that fully owns its responsibility;
- lower layers do not depend on higher layers;
- no component exists only to satisfy taxonomy or visual granularity.

Gate: the system can explain every new primitive and every layer boundary.

## Stage 3 — Layout and information architecture

Verify:

- one primary fact or action leads the page;
- labels are direct and Japanese-first;
- related information is grouped;
- comparison values share stable anchors;
- desktop and mobile preserve order and meaning;
- long content, missing content, and dense content have defined behavior;
- navigation shows location and a return path.

Gate: the layout remains coherent across breakpoints and content extremes.

## Stage 4 — Components and states

Verify:

- each component has a narrow role;
- interaction states are complete;
- zero, missing, unknown, error, and not applicable remain distinct;
- no dead-end flow exists;
- actions expose recovery, retry, undo, or a clear next step where relevant;
- repeated structures use shared components rather than visual copies;
- data retrieval, route selection, redirects, navigation policy, and the app-wide route schema remain at the Screen boundary;
- a lower-layer link is owned there only when its invariant semantic destination is intrinsic to that component's responsibility;
- theme and breakpoint differences do not create duplicate component hierarchies;
- real or representative Japanese data is used.

Gate: all implementation-significant states are defined.

## Stage 5 — Interaction and craft

Verify:

- input feedback is immediate;
- motion explains change and can be interrupted where needed;
- overlays preserve source relationship and focus;
- perceived loading behavior matches actual system behavior;
- icon geometry, alignment, spacing, and line joins hold at final size;
- no decorative metaphor competes with the content.

Gate: the interface responds without performing.

## Stage 6 — Accessibility and technical quality

Verify:

- semantic structure and heading order;
- keyboard operation and visible focus;
- contrast in light and dark themes;
- non-color state cues;
- accessible names and dynamic announcements;
- reflow and text enlargement;
- reduced-motion behavior;
- no essential audio-only information;
- lint, types, build, and relevant route rendering for code changes;
- clipping, bounds, variables, fonts, and instances for Figma changes.

Gate: no WCAG 2.2 AA blocker or technical regression remains in the changed scope.

## Severity

### Blocker

Use for:

- inaccessible core action;
- broken route or dead end;
- content loss or misleading data meaning;
- keyboard trap;
- unreadable contrast;
- missing error recovery for a required task;
- failed build or invalid Figma structure affecting delivery.

Fix before completion.

### Major

Use for:

- an inherited premise that no longer supports the product or task;
- broken hierarchy;
- inconsistent component or theme behavior;
- desktop/mobile meaning mismatch;
- missing important state;
- generic pattern that weakens the product identity;
- long Japanese content breaking layout;
- motion or focus behavior that causes significant friction.

Fix in the current iteration.

### Minor

Use for:

- small alignment or rhythm defects;
- low-risk copy refinement;
- nonessential motion polish;
- secondary consistency improvements.

Place in backlog only when it does not hide a larger structural issue.

## Review output

For each finding, include:

| Field | Content |
| --- | --- |
| Severity | Blocker, Major, or Minor |
| Stage | 1–6 |
| Element | Exact screen, component, or state |
| Observation | What is visibly or technically true |
| Consequence | What becomes harder, misleading, or inaccessible |
| Fix | Specific change |
| Verification | How to prove the correction |

Use observation → consequence → fix. Avoid unsupported preference statements.

## Completion evidence

Report only evidence relevant to the work:

- frames and states inspected;
- themes and breakpoints covered;
- component instances and variables reused;
- clipping or overflow result;
- keyboard and focus result;
- zoom/reflow result;
- reduced-motion result;
- lint, type, build, and route result.

Do not claim a full audit when only a screenshot was reviewed.
