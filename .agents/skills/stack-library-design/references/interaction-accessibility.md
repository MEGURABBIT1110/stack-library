# Interaction and Accessibility

Use this reference for interactive components, motion, state behavior, and accessibility acceptance criteria.

## Contents

- Interaction principles
- Accessibility contract
- Japanese-first checks
- State matrix
- Figma annotations
- Verification

## Interaction principles

### Immediate response

- Show press feedback on pointer-down.
- Keep drag and resize feedback continuous.
- Remove artificial waits from the input path.
- Never disable input solely to let an animation finish.

### Direct manipulation

- Track the pointer one-to-one after a small intent threshold.
- Preserve the point where the object was grabbed.
- Continue from the current on-screen position when interrupted.
- Hand release velocity into momentum-driven motion when the library supports it.
- Use progressive resistance at boundaries instead of an abrupt dead stop.

Do not add direct manipulation merely to make a static archive feel app-like.

### Spatial consistency

- Enter and exit along matching paths.
- Originate a popover, menu, or sheet from its trigger.
- Return focus to the source after dismissal.
- Keep the same action in the same place across comparable screens.

### Motion selection

Use motion only to:

- confirm input;
- explain a state transition;
- preserve spatial relationship;
- show progress or completion;
- maintain continuity during direct manipulation.

For routine UI, prefer restrained transitions. Use spring behavior only when continuity or momentum makes it more truthful. Avoid bounce on menus, tabs, counters, and passive data.

Animate compositor-friendly properties where possible. Avoid layout-heavy animation on dense lists.

### Reduced motion and transparency

Under reduced motion:

- replace large movement, parallax, and overshoot with short fades or immediate state changes;
- preserve focus, status, and completion feedback;
- avoid full-viewport motion and slow looping movement.

When translucent materials are used, provide a solid or higher-opacity alternative where the platform exposes reduced transparency or increased contrast preferences. Stack Library does not require glass; use it only when it clarifies a floating functional layer.

## Accessibility contract

### Perceivable

- Meet WCAG 2.2 AA contrast for text and UI components.
- Check actual light and dark backgrounds.
- Never use color alone for status, selection, error, or progress.
- Give meaningful covers, diagrams, and charts appropriate alternatives.
- Treat decorative images as decorative.
- Caption video and provide transcripts for audio content.
- Keep all essential information available without sound.

### Operable

- Use native interactive elements.
- Provide a visible focus indicator in every theme.
- Preserve logical tab order and reading order.
- Keep focused content visible beneath sticky UI.
- Support keyboard alternatives for drag, swipe, and pointer-only controls.
- Provide a single-pointer alternative to complex gestures.
- Use target sizes that remain operable for touch and motor variability.
- Avoid keyboard traps.

### Understandable

- Use specific labels and headings.
- Keep repeated controls in predictable locations.
- State validation errors beside the relevant field and explain recovery.
- Confirm destructive or irreversible actions, not routine ones.
- Preserve user-entered data after validation failure.
- Distinguish missing, zero, error, unknown, and unavailable in copy and semantics.

### Robust

- Use semantic landmarks and ordered headings.
- Prefer native HTML over ARIA.
- Give controls stable accessible names.
- Announce important asynchronous results through an appropriate live region.
- Manage focus when opening and closing modal surfaces.
- Keep status messages perceivable without forcing focus unless immediate action is required.

## Japanese-first checks

Test with:

- long Japanese titles without convenient spaces;
- mixed Japanese and Latin technical terms;
- multiple authors;
- ruby or punctuation if present;
- 200% text enlargement;
- 400% browser zoom or a 320 CSS-pixel reflow target;
- Windows and macOS font rendering when implementation access allows;
- missing glyph or fallback-font behavior.

Do not compress line height or character spacing merely to preserve a mockup's height.

## State matrix

For each relevant component, verify:

| Dimension | States |
| --- | --- |
| Data | normal, zero, missing, unknown, partial, error |
| System | idle, loading, success, warning, failure |
| Interaction | rest, hover, focus, active, selected, disabled |
| Content | short, long, empty, multiple, localized |
| View | desktop, mobile, enlarged text, light, dark |
| Preference | reduced motion, increased contrast where supported |

Do not create visible examples for every Cartesian combination. Create the smallest reference set that proves the rules and prevents implementation ambiguity.

## Figma annotations

Annotate behavior that static pixels cannot prove:

- semantic element or role;
- keyboard keys;
- focus destination and return;
- announcement text and priority;
- truncation and expansion behavior;
- value formatting and missing-state copy;
- responsive stacking order;
- reduced-motion replacement.

Keep annotations near the relevant component and separate normative rules from sample data.

## Verification

For implementation, combine automated checks with manual checks:

1. Navigate the changed flow using only the keyboard.
2. Inspect focus order and focus visibility.
3. Zoom and reflow the page.
4. Switch light and dark themes.
5. Enable reduced motion.
6. Inspect semantic structure with browser accessibility tooling.
7. Test dynamic state announcements.
8. Check long Japanese content and missing data.

Automated accessibility tooling cannot prove reading order, useful labels, focus behavior, or whether state distinctions are understandable.
