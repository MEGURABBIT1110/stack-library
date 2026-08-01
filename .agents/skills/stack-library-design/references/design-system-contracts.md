# Design System Contracts

Use this reference when changing Stack Library foundations, reusable Figma assets, React components, Storybook stories, or their mappings.

## Contents

- Change decision
- Token contract
- Component contract
- Figma library contract
- React and Storybook contract
- Traceability and handoff
- Migration and verification

## Change decision

Classify every affected asset:

| Decision | Use when | Required record |
| --- | --- | --- |
| Reuse | The existing contract already expresses the requirement | Asset and states reused |
| Extend | The responsibility is unchanged but a public state or semantic option is missing | Compatible API and new verification |
| Create | No current asset owns the responsibility | Layer, dependencies, owner, and initial consumers |
| Deprecate | The contract is misleading, duplicated, or unsafe | Replacement and removal condition |
| Migrate | Consumers or stored design instances must move | Ordered steps, compatibility window, and rollback |

Do not create a component to share appearance alone. Extract when a semantic responsibility, repeated behavior, accessibility rule, or independently verifiable state deserves an owner.

## Token contract

Prefer semantic tokens over raw values and component-scoped tokens over one-off overrides. For each added or changed token, record:

- semantic role and allowed use;
- collection, mode, and Figma variable name;
- CSS custom property or implementation mapping;
- Light and Dark values or explicit mode independence;
- contrast pairs and state combinations the token must satisfy;
- fallback, migration, and affected consumers.

Do not encode a component name in a global token unless the value is intentionally component-owned. Do not create theme or viewport variants when modes and responsive rules can express the change.

## Component contract

Freeze these fields before Figma or code implementation:

| Field | Required content |
| --- | --- |
| Responsibility | One semantic job and the boundary it does not own |
| Atomic layer | Foundation, Primitive, Composite, Pattern, or Screen |
| Composition | Allowed dependencies and slot/content ownership |
| Public API | Semantic inputs, events, defaults, and invalid combinations |
| State model | Data, system, interaction, and validation states that change meaning or behavior |
| Variant axes | Orthogonal structural choices only; defaults and prohibited combinations |
| Responsive rules | Reflow, wrapping, order, disclosure, truncation, and container behavior |
| Accessibility | Element or role, accessible name, keyboard behavior, focus, announcements, errors, and target size |
| Content rules | Long Japanese text, multiple values, zero, missing, unknown, unavailable, and error |
| Verification | Figma specimens, Stories, interaction checks, and rendered surfaces that prove the contract |
| Lifecycle | Reuse, extend, create, deprecate, or migrate; consumers and compatibility impact |

Treat disabled as an interaction constraint, not a substitute for loading, permission, validation, or unavailable states. Avoid variant axes that represent arbitrary sample content.

## Figma library contract

- Use the nearest valid published component and variable collection before creating a local asset.
- Keep Main Components in the assigned library surface and use Instances in specimens and screens.
- Preserve instance links. Do not detach to bypass a missing property; return the contract gap upstream.
- Use component properties for intentional public options. Keep internal layers private and name properties by meaning rather than layer structure.
- Bind semantic variables. Record any necessary raw value as debt with an owner and removal condition.
- Use Auto Layout, text hug/fill behavior, min/max constraints, and clipping deliberately so long Japanese content and text enlargement remain testable.
- Give reusable components a concise description covering purpose, usage boundary, and accessibility behavior.
- Preserve existing Code Connect or equivalent source mapping. Update it only when the mapped React owner changes.
- Create the smallest specimen set that proves rules; do not publish every Cartesian combination.
- After mutation, read back the exact nodes and inspect fresh screenshots plus structure as required by `AGENTS.md`.

## React and Storybook contract

React owns semantics, behavior, public props, data boundaries, and runtime accessibility. Storybook owns isolated evidence for reusable contracts. Figma owns visual and structural intent. Do not force the three surfaces to be identical where their responsibilities differ.

- Map one semantic component owner to one primary React export. Use composition instead of a prop surface that mirrors Figma layers.
- Keep theme and viewport behavior in semantic tokens, CSS, containers, or globals rather than `theme` or `mobile` component props.
- Keep fixtures deterministic, typed, and independent from microCMS.
- Add Stories for contract-relevant states, not decorative permutations. Include long Japanese content and missing or error states when they can change layout or meaning.
- Add an interaction test when keyboard input, focus movement, pressed/selected state, validation, disclosure, or announcement is part of the public contract.
- Use screen or route verification for behavior that cannot be proven in component isolation.

## Traceability and handoff

Maintain one row per reusable component:

| Field | Example content |
| --- | --- |
| Contract revision | Issue number plus frozen revision |
| Figma | File key, Main Component or Component Set node ID, property axes, specimen node IDs |
| React | Export name and repository path |
| Storybook | Title and contract-relevant Story names |
| Parity | responsibility, states, variants, responsive behavior, accessibility, and intentional differences |
| Evidence | Figma read-back, fresh screenshots, Story or interaction result, and rendered comparison when applicable |

A matching name is not proof of parity. Mark unknown or unverified fields explicitly.

## Migration and verification

For an incompatible change:

1. Identify every Figma instance, React consumer, Story, and screen affected.
2. Define the replacement and temporary compatibility rule.
3. Update the owner before consumers where dependency direction requires it.
4. Verify migrated consumers and confirm that no detached, deprecated, or unmapped use remains in the assigned scope.
5. Remove the old asset only after its recorded removal condition is met.

Select commands and visual checks from `docs/DEVELOPMENT.md`. Always verify reference links, contract completeness, Figma instance integrity, semantic variable binding, representative states, applicable Light/Dark modes, applicable Desktop/Mobile behavior, keyboard and focus behavior, reflow, and long Japanese content for the changed surface.
