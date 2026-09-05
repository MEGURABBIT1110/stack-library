# Stack Library Product Language

Follow the authority order in [SKILL.md](../SKILL.md). Use this reference only for durable Stack Library product language.

## Contents

- Scope boundary
- Product thesis
- Intended character
- Durable design instincts
- Product signatures
- Post-MVP concepts
- Visual grammar
- Defaults to reject
- Copy and terminology
- Direction test

## Scope boundary

Design the active MVP around four actions:

1. find a technical book in the collection;
2. confirm its bibliographic, reading, and reference information;
3. understand the collection and its registered-price total;
4. register a technical book.

Treat Book List, Book Detail, Library Bank, and Book Form as the MVP surfaces. Keep search and filtering inside Book List. Do not invent a route, field, relationship, metric, or interaction because this reference names a future concept.

Treat `Knowledge Trace`, an Observatory feature, topics, notes, knowledge maps, and learning routes as post-MVP concepts. Do not let them authorize scope unless both the frozen Issue and the current content model or route contract explicitly include them.

## Product thesis

Stack Library is not a reading diary, review service, store, or decorative digital bookshelf. It is a personal technical-book archive for finding, confirming, and registering books and their useful reference information.

Use these transformations:

| Generic reading product | Stack Library |
| --- | --- |
| Book as a product tile | Book as a catalogued technical specimen |
| Review or social score | Bibliographic, reading, and reference information |
| Decorative shelf | Searchable technical-book collection |
| Store price | Registered acquisition price with missing data shown honestly |
| Dashboard statistics | Evidence about the current collection |

Ask: “Which technical book do I have, what do I know about it, and can I find or register it without ambiguity?”

## Intended character

Aim for:

- quiet, not empty;
- precise, not sterile;
- approachable, not cute;
- editorial, not ornamental;
- technical, not pseudo-futuristic;
- modern, not trendy by default;
- information-rich, not cramped;
- slightly mysterious, never vague.

The desired emotional result is calm confidence. Delight should emerge from clarity, recognition, and craft.

## Durable design instincts

The following abstract principles come from the product's working history:

- Prefer meaning over spectacle.
- Reduce elements until the concept becomes legible.
- Reject familiar symbols when they add cliché rather than recognition.
- Preserve smooth geometry, exact alignment, and intentional continuity.
- Make the system trustworthy before making it impressive.
- Show uncertainty and missing data honestly.
- Respect established decisions that still hold; do not repeatedly restart the design.
- Treat an existing pattern as a hypothesis to verify, not an authority to obey.
- Correct incoherent premises when the evidence is visible; consistency with a flaw is not quality.
- Move quickly when the direction is known. Ask only when a choice changes the outcome.
- Keep visual and textual feedback complete without assuming access to sound.
- Keep the interface current without chasing disposable trends.

Do not encode the creator's biography, personality labels, or private history into the interface.

## Product signatures

### Specimen Label

Use `Specimen Label` as an optional, context-dependent heuristic when presenting a technical book as a catalogued specimen that can be identified, compared, and opened. It is not a formal product invariant. Do not force it, and never let it override the frozen Issue, current project documents, or an Issue-linked Figma target.

Use:

- precise title and authorship;
- compact, readable bibliographic metadata;
- explicit reading status;
- current technical-area and reference signals;
- clear registration or data provenance when available;
- stable alignment for scanning and comparison.

Avoid:

- store pricing hierarchy;
- star-review dominance;
- oversized cover art as the only identity;
- decorative labels without semantic value.

Do not require every surface to display every field. Preserve the same record identity and state meaning while adapting priority to the task and viewport.

## Post-MVP concepts

### Knowledge Trace

Reserve `Knowledge Trace` for a future feature that represents movement through knowledge:

`read → understood → applied → revisited`

Do not infer this trace from current reading statuses or reference memos. Use it only when the frozen Issue and current model define its states, relationships, and evidence. Prefer a list, sequence, or relation label over a graph when one becomes sufficient.

### Observatory as a feature

Preserve `Technical Archive × Developer Observatory` as product character: calm observation, precise metadata, and orientation within a collection. Treat any Observatory navigation, relationship view, knowledge map, or star-chart interface as post-MVP functionality. Add it only when the frozen Issue and current model define what every relationship and mark means.

Treat topics, notes, knowledge maps, and learning routes the same way. Do not add placeholder navigation or copy for unavailable features.

## Visual grammar

Use:

- thin rules and quiet separation;
- stable columns and precise anchors;
- restrained surface contrast;
- readable Japanese body text;
- compact metadata in a complementary mono style when active tokens support it;
- one restrained accent for meaningful emphasis;
- light and dark modes with equal information quality;
- flat, economical iconography.

Known project baselines have included IBM Plex Sans JP, IBM Plex Mono, and tobacco brown `#8d6029` as an accent. Confirm them in the live theme before use. Never recreate them as local constants if active variables already exist.

## Defaults to reject

Reject these unless the actual task proves them necessary:

- Booklog-style shelf nostalgia;
- Goodreads-style social ratings;
- Notion-like database chrome;
- generic left-sidebar SaaS dashboards;
- default shadcn/ui composition;
- identical rounded cards for all content;
- excessive chips and badges;
- decorative gradients and glass;
- neon cyberpunk or loud science-fiction styling;
- Japanese traditional motifs used only because the UI language is Japanese;
- literal books, stars, coins, or compasses added as visual explanation;
- English labels pasted onto a Japanese-first layout.

## Copy and terminology

Use short, concrete Japanese. Name a screen, action, field, and state for what currently exists.

Prefer:

- ライブラリ
- 技術書
- 書誌情報
- 読書状態
- 技術分野
- 参照メモ
- 登録価格
- 価格未登録
- 新しい本を登録

Use English product or feature names when they function as stable identifiers, but pair them with a concise Japanese explanation when their meaning is not obvious.

Distinguish:

- `0` from 未登録;
- no books from books with missing fields;
- archive value from resale value;
- 積読 from 読書中, 読了, 参照用, and 中断;
- unknown from not applicable;
- unavailable from error;
- incomplete data from system error.

Use post-MVP terms only when the frozen Issue and current model activate the corresponding concept. Never use aspirational terminology as evidence that a feature already exists.

## Direction test

Before showing a new direction, ask:

1. Can a user identify whether this surface helps them find, confirm, understand, or register a technical book?
2. Does `Specimen Label` or another justified device make the result specific to a technical-book archive?
3. Which generic reading-app, Notion, or SaaS defaults were actively avoided?
4. Does every accent, motif, metric, and label map to current data or a current action?
5. Does the surface preserve zero, missing, unknown, unavailable, error, and not-applicable distinctions?
6. Can the user reach the relevant current book, collection view, bank view, or registration action without relying on an unavailable feature?

If the answers are vague, revise the structure before decorating it.
