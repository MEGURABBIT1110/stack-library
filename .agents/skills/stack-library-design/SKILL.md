---
name: stack-library-design
description: Design, extend, implement, or review Stack Library interfaces by critically evaluating current assumptions while preserving the product-specific decisions that still work. Use for Stack Library Figma work, UI/UX decisions, Atomic Design classification, component design, design-system changes, design-to-code implementation, screen additions, redesigns, visual QA, interaction or motion design, and end-to-end design audits. Also use when an existing design feels questionable or inconsistent, or when a proposed feature risks looking like a generic reading app, Notion clone, SaaS dashboard, or decorative “tech” interface.
---

# Stack Library Design

Design Stack Library as a Japanese-first technical-book archive: precise, calm, legible, and accessible. Preserve `Technical Archive × Developer Observatory`; do not drift into a generic reading app, Notion clone, SaaS dashboard, or decorative “tech” interface.

## Establish authority and scope

Resolve decisions in this order:

1. Follow the user's current instruction.
2. Follow the frozen GitHub Issue specification for purpose, scope, exclusions, and acceptance criteria.
3. Follow the Issue-linked target Figma node for visual specification.
4. Follow `AGENTS.md` and applicable project documents for governance and architecture.
5. Use the current implementation, Storybook, and fresh render evidence to understand actual behavior.
6. Use this skill's references as durable guidance, never as competing project truth.

Treat older proposals and unlinked Figma frames as history. Treat implementation as evidence, not authority to preserve a defect.

For the Book List shelf and covers, the user-confirmed shelf contract and [DESIGN.md](../../../docs/DESIGN.md) are project truth. Do not re-infer or redesign that contract from generic taste; keep its exact measurements, assets, and viewport rules in `DESIGN.md`.

When the Issue and its linked Figma target conflict, stop. Report the exact conflict and request resolution from the Issue owner; do not invent a compromise or silently choose one.

Stay inside the frozen Issue. Correct a nearby defect only when required to satisfy acceptance criteria or prevent a direct regression. Record broader findings for separate scope.

Honor the team packet:

- Write only as the assigned writer: `product_owner` for Issue fields, `figma_designer` for Figma, the tracked repository writer explicitly assigned in the team packet for tracked repository content, and `release_manager` for approved Git/PR metadata.
- Respect `owner`, `allowed_write_surfaces`, `forbidden_write_surfaces`, publication authorization, and handoff conditions.
- Never assign the same Issue specification, Figma node, or tracked file to concurrent writers.
- Return findings to the owning writer; reviewers and QA do not repair product sources.
- Stop before writing when a required contract, target revision, or ownership boundary is missing or contradictory.

Read project documents in the order required by `AGENTS.md`. Read `docs/CONTENT_MODEL.md` for data, type, microCMS, or fixture changes and `docs/ROUTING.md` for route or page-responsibility changes.

## Route detailed guidance conditionally

Load only the reference needed for the current task:

- Read [product-language.md](references/product-language.md) when creating a screen, changing information hierarchy or language, or materially changing visual direction.
- Read [interaction-accessibility.md](references/interaction-accessibility.md) when designing interaction, motion, responsive behavior, focus, keyboard behavior, dynamic states, forms, or error recovery.
- Read [design-system-contracts.md](references/design-system-contracts.md) when adding or changing a token, component, variant, component property, Storybook contract, or Figma-to-code mapping.
- Read [ecosystem-evidence.md](references/ecosystem-evidence.md) when benchmarking an external design system, evaluating a borrowed pattern, or auditing the system's documentation and source coverage.
- Read [design-system-landscape.md](references/design-system-landscape.md) when selecting a benchmark, checking the current status of a Design System Collection entry, or comparing coverage across the full catalog.
- Read [review-gates.md](references/review-gates.md) when performing critique, visual QA, handoff, or completion review.

Project documents override these references.

## Frame the product meaning

Before designing, state a compact brief:

- the person and action;
- the primary fact or decision;
- required states and distinctions;
- the route back to the book or usable knowledge;
- the product-specific device, using `Specimen Label` or a device explicitly activated by the frozen Issue and supported by the current product, content, and route model;
- generic patterns to reject.

Treat a technical book as a knowledge node, not an e-commerce product. Treat metrics as evidence, not decoration. Use direct, natural Japanese labels; reserve English for the product name and established technical terms.

For the confirmed Book List shelf, treat the shelf surface as functional spatial containment for covers, not decorative nostalgia. Rejecting Booklog-like imitation does not authorize removing or redesigning the accepted shelf surface.

Preserve these component responsibilities; defer their exact values to `DESIGN.md`:

- `BookShelf` provides an empty, one-row shelf body that contains children but no data, heading, or links.
- `BookShelfSection` composes the heading, count, shelf rows, and cards, and derives row count from the registered books.
- `BookCard` is a cover-sized link to the detail view; it exposes a title-only tooltip on desktop hover and keyboard focus, not on mobile.
- `BookCover` renders an available or unavailable cover at its intrinsic ratio within the semantic maximum frame.

Define the data contract before polishing numeric or status UI. Preserve distinct meanings for zero, missing, unknown, unavailable, error, and not applicable.

## Inventory before assembly

Use a component-first process before assembling a screen:

1. Inventory applicable current tokens, Figma components, React components, Storybook stories, data shapes, and states.
2. Identify what can be reused unchanged, what requires a contract change, and what is genuinely missing.
3. Define each affected component's semantic responsibility, inputs, states, responsive behavior, accessibility contract, and verification surface.
4. Resolve component and token gaps before composing the page.
5. Assemble the screen from approved contracts; do not hide unresolved component decisions inside page-specific styling.
6. Record each affected asset as reuse, extend, create, deprecate, or migrate; include the consumer and compatibility impact for every non-reuse decision.

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

Before any Figma tool call, load and follow every applicable Figma prerequisite skill.

1. Confirm the Issue-linked file and node IDs, revision, themes, viewports, and states.
2. Inspect relevant variables, component sets, neighboring structure, and current implementation evidence.
3. Extend the nearest valid components and bind active semantic variables.
4. Represent structural differences with purposeful variants, not arbitrary content combinations.
5. Preserve Main Component and Instance relationships, component-property intent, descriptions, and existing code mappings; do not detach an instance or introduce a local style or raw value merely to obtain visual parity.
6. Inspect final screenshots and node structure, including bounds, Auto Layout, text resizing, clipping, overflow, variable bindings, component properties, and instance integrity.

Do not claim completion from property inspection alone. Use fresh visual evidence required by `AGENTS.md`, and invoke independent Figma QA when that contract requires it.

## Implement in code

1. Start only from the frozen Issue, approved visual/design contract, and applicable technical plan.
2. Preserve semantic HTML, server/client boundaries, domain rules, current tokens, and component responsibilities.
3. Render required states from valid data shapes; keep Storybook fixtures independent from microCMS.
4. Keep public props semantic; do not expose Figma layer names, breakpoint flags, theme variants, or purely visual switches as an API.
5. Add the smallest representative Story set that proves public states, long and missing content, applicable themes and widths, and keyboard behavior. Add interaction coverage when user input or state change is part of the contract.
6. Compare the final rendered surface with the Issue-linked Figma target and verify both changed behavior and accessible semantics.

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

## Report concisely

Lead with the outcome. Report:

- changed surface and Issue scope;
- key product or component-contract decision;
- intentional responsive omissions, reorderings, or disclosures;
- affected states, themes, and viewports;
- validation performed against which revision;
- unresolved conflict, external action, or deferred finding.

For reviews, report observable evidence, consequence, correction, and severity. Do not substitute taste words such as “cleaner” or “modern” for evidence.
