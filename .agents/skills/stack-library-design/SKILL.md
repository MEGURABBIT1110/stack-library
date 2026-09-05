---
name: stack-library-design
description: Design, extend, implement, or review Stack Library UI and design-system decisions by critically evaluating current assumptions while preserving product-specific decisions that still work. Use when changing or evaluating screens, components, tokens, Figma-to-React/Storybook contracts, interaction, accessibility, or visual consistency. Also use for audits of existing UI that may be inconsistent or generic. Do not use for data, API, route, or non-visual code changes unless they change a UI contract.
---

# Stack Library Design

Design Stack Library as a Japanese-first technical-book archive: precise, calm, legible, and accessible. Preserve `Technical Archive × Developer Observatory`; do not drift into a generic reading app, Notion clone, SaaS dashboard, or decorative “tech” interface.

## Establish authority and scope

Separate product intent, task scope, visual specification, and implementation evidence:

1. Use the user's current instruction to understand the desired direction. If it changes a frozen Issue, treat it as a scope change: update and re-freeze the Issue before implementation.
2. Use the frozen GitHub Issue for purpose, scope, exclusions, and acceptance criteria.
3. Use an Issue-linked Figma target for visual specification only when one is assigned and the task has visual scope.
4. Use `AGENTS.md` and applicable project documents for governance, architecture, content, and routing.
5. Use the current implementation, Storybook, and fresh render evidence to understand actual behavior, not to preserve a defect.
6. Use this skill's references as durable guidance, never as competing project truth.

Treat older proposals and unlinked Figma frames as history. When an Issue and its linked Figma target conflict, stop, report the exact conflict, and request resolution from the Issue owner. Do not invent a compromise or silently choose one.

Stay inside the frozen Issue. Correct a nearby defect only when required to satisfy acceptance criteria or prevent a direct regression. Record broader findings for separate scope.

Follow the `AGENTS.md` team packet and applicable role contract for ownership, forbidden surfaces, publication, and handoff. This skill does not redefine repository governance. Retain only the source order and stop on a missing or contradictory contract, target revision, or ownership boundary; return findings to the owning writer.

### Skill and agent boundary

`Skill = reusable knowledge / procedure / project-specific heuristic.`
`Agent = role / authority / task executor.`

Loading this skill does not activate an agent, approve work, authorize mutation, assign ownership, authorize publication, or authorize merge. Those decisions come from `AGENTS.md`, the team packet, the applicable role TOML, and user authorization where required.

Read project documents in the order required by `AGENTS.md`. Read `docs/CONTENT_MODEL.md` for data, type, microCMS, or fixture changes and `docs/ROUTING.md` for route or page-responsibility changes.

## Audit an existing or inconsistent design

Do not treat repeated implementation as proof of a coherent system. Before reusing or extending an existing pattern:

1. Inspect actual usage across the changed surface and its immediate neighbors: structure, tokens, class or component names, states, breakpoints, themes, and accessibility behavior.
2. Classify each inspected pattern as intentional contract, accidental drift, conflicting contract, or unknown intent. Confirm against current project documents and the frozen Issue where available.
3. Classify findings as **Preserve**, **Correct now**, or **Defer**. Correct only what the current scope and assigned writer authorize; send broader findings to a new or revised Issue.
4. For every non-preserved finding, record observable evidence, user or system consequence, candidate correction, affected sources, and scope impact. Repetition alone is not evidence of intent.
5. If the correction changes product direction, shared naming, tokens, component API, navigation, data meaning, or a cross-surface contract, make it an upstream decision and re-freeze the affected contract before downstream implementation.

Use [review-gates.md](references/review-gates.md) for the finding format and severity. A read-only audit reports findings and next ownership; it does not imply that corrections were applied.

## Route detailed guidance conditionally

Choose the smallest path that matches the task; do not run every design process for every change:

- Read [product-language.md](references/product-language.md) for a new screen, information hierarchy or language change, or material visual-direction change.
- Read [interaction-accessibility.md](references/interaction-accessibility.md) for interaction, motion, responsive behavior, focus, keyboard behavior, dynamic states, forms, or error recovery.
- Read [design-system-contracts.md](references/design-system-contracts.md) for tokens, components, variants, properties, Storybook contracts, lifecycle decisions, or Figma-to-code mappings.
- Read [ecosystem-evidence.md](references/ecosystem-evidence.md) for external benchmarks, borrowed patterns, or documentation/source-coverage audits.
- Read [design-system-landscape.md](references/design-system-landscape.md) only when selecting a benchmark or comparing the full catalog.
- Read [review-gates.md](references/review-gates.md) for critique, visual QA, handoff, or completion review.

Project documents override these references. For docs-only work, use the documentation checks in `docs/DEVELOPMENT.md`; do not infer a Figma or rendered-route obligation from this skill alone.

## Frame the product meaning

Before designing, state a compact brief:

- the person and action;
- the primary fact or decision;
- required states and distinctions;
- the route back to the book or usable knowledge;
- the product-specific device or signature that serves the task; use `Specimen Label` when relevant, but do not force a decorative device or invent one without product meaning;
- generic patterns to reject.

Treat a technical book as a knowledge node, not an e-commerce product. Treat metrics as evidence, not decoration. Use direct, natural Japanese labels; reserve English for the product name and established technical terms.

For accepted Book List shelf and cover work, follow [DESIGN.md](../../../docs/DESIGN.md) and the [Component Traceability Registry](../../../docs/COMPONENT_TRACEABILITY.md). Do not duplicate their numeric or component-responsibility contract here. Rejecting Booklog-like imitation does not authorize removing or redesigning an accepted shelf surface.

Define the data contract before polishing numeric or status UI. Preserve distinct meanings for zero, missing, unknown, unavailable, error, and not applicable.

## Inventory before assembly

Use a component-first process before assembling a screen:

1. Inventory applicable current tokens, Figma components, React components, Storybook stories, data shapes, and states.
2. Identify what can be reused unchanged, what requires a contract change, and what is genuinely missing.
3. Define each affected component's semantic responsibility, inputs, states, responsive behavior, accessibility contract, and verification surface.
4. Resolve component and token gaps before composing the page.
5. Assemble the screen from approved contracts; do not hide unresolved component decisions inside page-specific styling.
6. When a system contract is affected, use [design-system-contracts.md](references/design-system-contracts.md) to record reuse, extension, creation, deprecation, or migration and its consumer impact.

Add a token or component only when the existing system cannot express the requirement. Name it by semantic role. Avoid wrapper-only abstractions and props that expose incidental Figma structure.

## Follow the current architecture vocabulary

Delegate exact Atomic Design vocabulary and dependency rules to the current `docs/ARCHITECTURE.md`; do not freeze a duplicate taxonomy here. Use Atomic Design to control responsibility and dependency direction, not to derive information hierarchy or split by visual size.

Inspect and follow the current repository organization while keeping physical placement separate from Atomic classification. A directory name describes physical organization; it does not automatically determine semantic layer. Keep Figma names, React exports, Storybook titles, and architecture notes traceable without requiring identical trees.

Treat traceability as a behavioral contract, not a naming exercise. Map semantic responsibility, public states, variant axes, responsive rules, accessibility behavior, and verification evidence across Figma, React, and Storybook. Record an intentional platform-only difference instead of forcing false parity.

Model theme and responsive differences with semantic variables, CSS, viewport, or container behavior. Do not create theme-only or breakpoint-only component taxonomies.

## Preserve responsive semantic parity

Preserve the same primary task, primary facts, state distinctions, and accessible meaning across breakpoints. Semantic parity does not require identical visible fields, order, density, or disclosure.

On narrower layouts, omit, reorder, summarize, truncate, or progressively disclose secondary metadata only when the frozen Issue or Issue-linked Figma target authorizes it and the primary meaning and a discoverable path to full information remain intact. Record that upstream decision in the component or design contract; never let a downstream contract authorize the change or let information disappear accidentally.

Define wrapping, stacking, scrolling, truncation, and disclosure explicitly. Verify long Japanese titles, multiple authors, dense metadata, missing covers, zero values, and narrow containers. Use current project breakpoints and containers rather than habitual values.

## Work in Figma

Use this section only when both an Issue-linked Figma target is assigned and the task has visual scope. `Figma: none` is a valid non-blocking path; docs-only and nonvisual tasks do not inherit Figma obligations.

Before any Figma tool call, load and follow every applicable Figma prerequisite skill. Those skills, `AGENTS.md`, `figma_designer`, and `figma_design_qa` define mutation, read-back, fresh screenshot, and QA procedure; this skill supplies the design heuristics only.

1. Confirm the assigned file and node context before designing.
2. Inspect relevant variables, component sets, neighboring structure, and current implementation evidence.
3. Extend the nearest valid components and bind active semantic variables.
4. Represent structural differences with purposeful variants, not arbitrary content combinations.
5. Preserve Main Component and Instance relationships, component-property intent, descriptions, and existing code mappings; do not detach an instance or introduce a local style or raw value merely to obtain visual parity.

Follow the applicable Figma contracts for completion evidence and independent QA; do not claim visual completion from property inspection alone.

## Implement in code

1. Start only from the frozen Issue, approved visual/design contract, and applicable technical plan.
2. Preserve semantic HTML, server/client boundaries, domain rules, current tokens, and component responsibilities.
3. Render required states from valid data shapes; keep Storybook fixtures independent from microCMS.
4. Keep public props semantic; do not expose Figma layer names, breakpoint flags, theme variants, or purely visual switches as an API.
5. For reusable component or design-system changes, add the smallest representative Story set that proves public states, long and missing content, applicable themes and widths, and keyboard behavior. For page-only changes, add or update Stories only when the current architecture or Issue requires them. Add interaction coverage when user input or state change is part of the contract.
6. When a Figma target is assigned for visual scope, compare the final rendered surface with that target and verify both changed behavior and accessible semantics. Otherwise validate the nonvisual or docs-only outcome against its applicable contract.

Do not infer visual values, API boundaries, routes, or data fields when an upstream contract is unresolved.

## Keep essential quality constraints

- Target WCAG 2.2 AA. Maintain Japanese readability, meaningful heading order, visible and unobscured focus, keyboard operation, operable target size, reflow, and non-color state cues.
- Preserve Light/Dark accessibility and sufficient contrast through semantic variables.
- Preserve distinct presentation and semantics for zero, missing, and error states.

Use the conditionally linked references for detailed visual grammar and accessibility guidance.

## Validate by risk

Select and reuse validation exactly as defined by `docs/DEVELOPMENT.md`. Do not invent a second validation matrix here.

For documentation-only work, inspect the diff, references, terminology, links, and cross-document consistency. For code or Figma work, run only risk-appropriate checks and fresh visual comparisons required by project governance. Re-run a successful check only when its input or environment has been invalidated.

Do not call work complete while a required source is unresolved, a Blocker or Major discrepancy remains, the final changed state is uninspected, or required evidence is missing.

## Maintenance dependencies

Re-audit this skill when any of these sources change: product identity or design principles, Figma workflow, agent authority, component architecture or traceability, or accessibility policy. Keep this skill's heuristics and routing concise; do not copy those sources here. A source change may require updating the relevant reference or role contract instead of this skill.

## Report concisely

Lead with the outcome. Report:

- changed surface and Issue scope;
- key product or component-contract decision;
- intentional responsive omissions, reorderings, or disclosures;
- affected states, themes, and viewports;
- validation performed against which revision;
- unresolved conflict, external action, or deferred finding.

For reviews, report observable evidence, consequence, correction, and severity. Do not substitute taste words such as “cleaner” or “modern” for evidence.
