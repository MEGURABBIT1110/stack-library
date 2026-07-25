---
name: stack-library-design
description: Design, extend, implement, or review Stack Library interfaces by critically evaluating current assumptions while preserving the product-specific decisions that still work. Use for Stack Library Figma work, UI/UX decisions, Atomic Design classification, component design, design-system changes, design-to-code implementation, screen additions, redesigns, visual QA, interaction or motion design, and end-to-end design audits. Also use when an existing design feels questionable or inconsistent, or when a proposed feature risks looking like a generic reading app, Notion clone, SaaS dashboard, or decorative “tech” interface.
---

# Stack Library Design

Design Stack Library as a quiet technical archive and a map back to usable knowledge. Make the interface feel precise, legible, calm, and unmistakably tied to technical books.

## Resolve the current truth

Use this priority order:

1. Follow the user's current instruction.
2. Inspect the live Figma file and current implementation.
3. Inspect current project documents and content models.
4. Use this skill's references as durable guidance.

Treat older proposals as history, not truth. Do not restore a removed field, route, technology choice, component, or visual motif merely because it appears in a reference. When sources conflict, apply the higher-priority source and mention only conflicts that affect the result.

Treat the current Figma file and implementation as evidence of the current state, not proof that the design is correct. Respect decisions that remain coherent; question assumptions that create unclear meaning, structural debt, inconsistency, inaccessibility, or a generic result.

Before reusing an existing pattern, perform a short premise check:

- Does it still serve the product thesis and the user's current goal?
- Does its information hierarchy make the primary meaning obvious?
- Does it contradict a neighboring screen, component contract, data state, or breakpoint?
- Is it accessible and technically representable?
- Is it a deliberate product decision, or merely an inherited default?

Do not preserve a flaw for the sake of visual consistency. Fix Blocker and Major problems in the changed surface, plus obvious low-risk defects in its immediate neighbors. If a correction would materially change the product direction, data model, navigation, or task scope, explain the evidence and ask one focused question before making that broader change.

Read [product-language.md](references/product-language.md) before creating a new screen or materially changing visual direction.
Read [interaction-accessibility.md](references/interaction-accessibility.md) for interactive components, motion, responsive behavior, and accessibility.
Read [review-gates.md](references/review-gates.md) for audits, handoff, and final verification.

## Choose the smallest valid path

### Fast path — established product

Use when the current Figma, tokens, components, and direction already exist.

1. Inspect the relevant current screen, component, and implementation.
2. Inspect the immediate neighboring surfaces and run the premise check.
3. State the feature's primary meaning, the gap to fill, and any existing defect that affects the result.
4. Separate what should be preserved, corrected now, and deferred.
5. Reuse only the structure, variables, typography, and components that still support the intended meaning.
6. Add the missing component, state, or rule and make the corrections needed for a coherent result.
7. Verify the changed surface and its neighboring surfaces.

Do not reopen settled brand decisions or wait for confirmation unless an unresolved choice would materially change the result.
The smallest valid path means the smallest coherent result, not the fewest changed pixels or nodes. Do not use reuse as a substitute for design judgment.

### Foundation path — genuinely new territory

Use when no existing pattern can express the feature.

1. Name at least five domain concepts from the actual product.
2. Define one product-specific signature for the feature.
3. Name three likely generic defaults and their replacements.
4. Define the intended feeling with concrete terms.
5. Ask one focused question only if the direction remains materially ambiguous.

Never create code or high-fidelity design from adjectives alone.

### Review path — audit or critique

1. Report an observable fact.
2. Explain the user or system consequence.
3. Give a concrete correction.
4. Classify it as Blocker, Major, or Minor.

Do not replace evidence with taste words such as “cleaner” or “more modern.”
If the user permits changes, implement Blocker and Major corrections and safe local Minor corrections instead of stopping at critique.

## Frame the feature before designing

Write a compact internal brief:

- Human: who is using this surface, and in what context?
- Action: what verb must they complete?
- Meaning: what must they understand immediately?
- States: what values or conditions must remain distinguishable?
- Return path: how does this help them return to knowledge or implementation?
- Signature: use `Specimen Label`, `Knowledge Trace`, or a justified new product-specific device.
- Rejections: which generic patterns must not appear?

For numeric and status surfaces, define the data contract first. Distinguish zero, missing, unknown, unavailable, error, and not applicable. Never let visual polish collapse those states.

## Build the information hierarchy

Order content by meaning, not by component availability:

1. Put the page's primary fact or action first.
2. Add enough context to interpret it correctly.
3. Expose state, provenance, and incompleteness.
4. Place secondary metadata where it supports scanning.
5. Move advanced controls one level deeper.

Prefer direct Japanese labels. Avoid vague destinations such as “Home” or “Overview” when a specific label exists. Use English for the product name or established technical terms only when it improves recognition.

Treat a technical book as a knowledge node, not an e-commerce product. Treat metrics as evidence, not decoration. Treat an empty state as a state of the archive, not empty space to fill with illustration.

## Preserve the visual system

- Reuse the active theme variables and component APIs.
- Preserve light/dark parity; do not finish one theme and merely invert it.
- Keep Japanese typography primary. Verify line breaks, line height, metadata density, and long titles with real Japanese content.
- Use restrained neutral surfaces, thin rules, precise anchors, and one meaningful accent.
- Use color for action, status, or emphasis; never use color as the only carrier of meaning.
- Keep radii, elevation, and spacing systematic. Avoid large soft cards and excessive pills by default.
- Prefer flat, legible icon geometry. Keep joins smooth and recognizable at the actual rendered size.
- Add no decorative object merely to literalize “book,” “archive,” “star,” “bank,” or “technology.”

When a new token or component appears necessary, first prove that the current system cannot represent the need. Name additions by semantic role rather than isolated appearance.

## Apply Atomic Design as a dependency model

Use Atomic Design to control responsibility, reuse, and dependency direction. Do not use it to generate the information hierarchy or to split components by visual size.

Use the project vocabulary:

```txt
Foundations
  -> Primitives
    -> Composites
      -> Patterns
        -> Screens
```

- Treat Foundations as tokens and rules, not exported React components.
- Treat Primitives as single-responsibility controls or labels such as Button, Link, and Status.
- Treat Composites as reusable domain units such as Book Card that combine Primitives around one meaning.
- Treat Patterns as page regions such as Header, Context Bar, and Book List that coordinate Composites.
- Treat Screens as App Router pages that own routing, data retrieval, and page-level composition.

Enforce these rules:

1. Keep dependencies moving from higher layers toward lower layers; never make a lower layer import a higher layer. Allow same-layer composition when it stays acyclic and each component retains an independent responsibility. If same-layer components mainly coordinate one another, promote that coordinator to the next layer.
2. Classify a component at the lowest layer that fully owns its semantic responsibility.
3. Extract a component only when it has an independent responsibility, reuse value, or verification value.
4. Keep data retrieval, route selection, redirects, navigation policy, and the app-wide route schema at the Screen boundary. Allow a lower layer to own or construct an invariant semantic destination when that link is intrinsic to its responsibility, such as a book card deriving its canonical detail URL from a book identifier or the product identity returning to the library root. Accept an `href` contract when the component must work in multiple routing contexts; do not add pass-through route props solely to satisfy the taxonomy.
5. Model theme and breakpoint differences with variables, CSS, viewport, or container behavior instead of duplicate atomic layers.
6. Keep Figma, React, and Storybook classifications traceable through stable names, story titles, or architecture notes for shared units that need independent verification. Do not require a separate Story for every export or force identical node trees, props, or file structures.
7. Add a separate Template layer only when multiple Screens share a page skeleton that needs independent reuse and verification.

Let product meaning and accessibility override taxonomy. Do not add wrapper components, generic atoms, or pass-through props merely to complete an Atomic Design hierarchy.

Treat a homogeneous collection of one label concept, such as technical-area tags, as a Primitive when the collection still has one semantic responsibility. Promote it to a Composite only when it coordinates distinct primitives, interactions, or domain meanings.

Allow story-local render helpers to demonstrate Foundations, provided they are not exported as production Foundation components and do not become an alternative token source.

## Design responsive structure

Use the same information model across breakpoints. Change composition, not meaning.

- Preserve order, labels, and state distinctions between desktop and mobile.
- Define which regions wrap, stack, scroll, truncate, or reveal.
- Keep repeated values aligned where comparison matters.
- Test long Japanese titles, multiple authors, large numbers, missing covers, and dense tags.
- Avoid horizontal scrolling except for inherently two-dimensional content.
- Prevent fixed headers, sheets, and footers from hiding focused or magnified content.

Use existing frame widths and content gutters from the live design. Do not introduce new breakpoint numbers from habit.

## Design interaction as feedback

- Respond immediately to user input.
- Keep state changes visible and reversible where practical.
- Allow an interaction to be interrupted; never lock input merely because an animation is running.
- Anchor overlays and transitions to their source.
- Use motion to explain state or spatial change, not to perform.
- Use restrained timing for routine UI; use spring or momentum behavior only for direct manipulation.
- Provide a reduced-motion equivalent that preserves feedback and meaning.

Never depend on audio. If sound or haptics are optional reinforcement, provide the same causal and completion information visually and semantically.

## Make accessibility part of the component contract

For every interactive component, specify:

- semantic role and accessible name;
- keyboard operation and visible focus;
- reading and focus order;
- hover, focus, active, disabled, loading, success, warning, and error states as applicable;
- announcements for dynamic updates;
- text alternative or long description for meaningful visuals;
- non-color cue for every state;
- behavior at text enlargement and reflow;
- reduced-motion behavior.

Use native HTML before ARIA in implementation. Do not invent interaction semantics in Figma that cannot be expressed robustly in code.

## Work in Figma

Load and follow the applicable Figma prerequisite skills before using Figma tools.

1. Inspect current pages, variables, styles, and component sets.
2. Extend the nearest current screen rather than a deprecated page.
3. Build repeated UI as components with a small, meaningful property API.
4. Use variants for structural differences, not arbitrary content combinations.
5. Bind color and typography to active variables and styles.
6. Cover desktop/mobile and light/dark where the feature applies.
7. Include normal, partial, empty, loading, and error references when implementation decisions depend on them.
8. Add data and accessibility notes beside the visual design when the rule is not visible.
9. Inspect bounds, clipping, overflow, font substitution, and instance usage before completion.

Do not duplicate a component merely to create a theme or breakpoint version when a variable mode or structural variant can express it.

## Implement in code

1. Inspect the repository's current stack and conventions.
2. Preserve semantic HTML, existing tokens, and component boundaries.
3. Keep domain rules separate from formatting.
4. Render every defined state from real data shapes.
5. Avoid a new dependency when platform primitives or the current stack suffice.
6. Verify lint, type checks, build, and the relevant rendered route.
7. Perform keyboard, reflow, theme, and reduced-motion checks for changed interactions.

Do not infer the project's framework from old planning documents.

## Communicate efficiently

Lead with the outcome. Keep process narration short.

For a creation or implementation, report:

- what was created or changed;
- which existing assumptions were preserved, corrected, or deliberately left unchanged;
- the key product-specific decision;
- states and breakpoints covered;
- verification completed;
- any remaining external action.

For a review, group findings by severity. For each finding, give the affected element, observation, consequence, and concrete fix. Omit empty severity groups.

## Finish through quality gates

Apply only the gates relevant to the task, but never skip the accessibility and technical gate for shippable work. Use [review-gates.md](references/review-gates.md).

Do not call the work complete while any of these remain:

- meaning depends on inference the interface could state;
- zero and missing are conflated;
- a state is conveyed only by color, motion, or sound;
- Japanese text breaks the layout;
- mobile loses information available on desktop;
- the result could be mistaken for a generic book app, Notion page, or SaaS template;
- a new visual motif exists without a functional role;
- changed code or Figma structure has not been inspected in its final state.
