# Ecosystem Evidence

Use this reference to inspect external design systems without turning Stack Library into a copy of them. These sources are discovery and comparison evidence, not visual authority.

## Contents

- Evaluation rule
- Source registry
- Catalog use
- Supplemental Figma set
- Comparison output

## Evaluation rule

Start with the Stack Library Issue, product language, current Figma library, React implementation, and Storybook. Use external systems only to answer a named question such as component API shape, Japanese typography, library organization, state coverage, documentation, governance, or design-to-code traceability.

For every borrowed idea, record:

- the Stack Library problem being solved;
- the source and exact inspected surface;
- the principle learned, separated from its visual styling;
- fit with Stack Library content, routes, themes, and accessibility contract;
- the adaptation made and patterns deliberately rejected;
- the date or revision inspected.

Do not copy tokens, component inventories, naming conventions, visual language, or admin-dashboard structure without a Stack Library requirement. Treat an old community file as historical evidence until its current status is verified.

## Source registry

Maintain external discovery as a small registry with these fields:

| Field | Purpose |
| --- | --- |
| Name | Stable system or library name |
| Canonical URL | Current public documentation |
| Figma | Exact community, library, file, and node target |
| Code | GitHub or package source when public |
| Resources | Designer or developer usage guidance |
| Rationale | Articles explaining goals, governance, or change history |
| Domain tags | Product type and platform; never a quality ranking |
| Last verified | Date the links and claimed practices were checked |

The public [Design System Collection](https://hiloki.notion.site/Design-System-Collection-b266887afdff455fb1f18823bcbc7ab5) demonstrates this cross-surface inventory shape with URL, Figma, GitHub, resources, blog, tags, and update fields. The [Open Design Systems list](https://www.designsystems.com/open-design-systems/) is a discovery index. Neither list is proof that a system is current, accessible, or appropriate for Stack Library.

## Catalog use

The complete row-by-row review of the public collection lives in [design-system-landscape.md](design-system-landscape.md). Use it to shortlist sources, not to choose a pattern by popularity. Check the canonical source again before a consequential decision because availability, ownership, versions, and retirement status change.

The catalog deliberately retains inaccessible, moved, deprecated, and historical entries. They are useful evidence for lifecycle, migration, archival labeling, and link-health practices, but they are not current implementation authority.

## Supplemental Figma set

Use the following user-selected files as supplemental design-file evidence. Re-verify the exact file before relying on details.

| System | Source | Inspect for |
| --- | --- | --- |
| JDD JP + UI Kit (iOS) | [Figma Community](https://www.figma.com/community/file/1004913616377523083) | Japanese/Latin typography separation, onboarding and guide surfaces, discoverable component order |
| Gaudiy DesignSystem | [Figma file](https://www.figma.com/file/MSb2SawAvBJaF73kP9ZvGR/%5BSHARE%5D-Gaudiy-DesignSystem?node-id=0%3A1) | Japanese product context, foundation-to-component organization, documented usage visible in the live file |
| Figma UI2 | [Figma Community](https://www.figma.com/community/file/928108847914589057) | Styles, components, variants, concise usage guidance, and example screens assembled from the system |
| Uber Base | [Figma Community](https://www.figma.com/community/file/805195278314519508) | Relationship among public Figma assets, component documentation, and coded implementation |
| SmartHR UI | [Figma Community](https://www.figma.com/community/file/978607227374353992) | Components versus layout examples, implementation-aware Auto Layout and resizing, naming, review, and publication discipline |
| Wantedly UI Components | [Figma Community](https://www.figma.com/community/file/994992887565225147) | Brand consistency, baseline usability, product-team efficiency, and designer-engineer maintenance goals |
| Ant Design | [Figma Community](https://www.figma.com/community/file/831698976089873405) | Broad desktop component/state coverage and documentation discoverability; reject generic SaaS composition by default |
| Polaris for Admin | [Figma Community](https://www.figma.com/community/file/930504625460155381) | Dense administration patterns and content structure; use only when an Issue genuinely needs comparable complexity |

Community file content and availability can change. If a source cannot be read directly, mark its detailed practices unverified; do not fill gaps from memory or a screenshot alone.

## Comparison output

Return a compact matrix:

| Question | Stack Library evidence | External evidence | Adopt, adapt, or reject | Contract impact | Verification |
| --- | --- | --- | --- | --- | --- |

Prefer `adapt`. `Adopt` requires matching semantics and constraints. `Reject` is correct when a pattern optimizes for commerce, social engagement, generic administration, or a platform convention that does not fit the technical-book archive.
