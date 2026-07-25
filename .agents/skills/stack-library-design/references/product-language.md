# Stack Library Product Language

Use this reference to decide whether a design belongs to Stack Library. Let the live product override stale details.

## Contents

- Product thesis
- Intended character
- Durable design instincts
- Product signatures
- Visual grammar
- Defaults to reject
- Copy and terminology
- Direction test

## Product thesis

Stack Library is not a reading diary or a digital bookshelf. It is a personal archive that reorganizes technical books into knowledge that can be revisited and used.

Use these transformations:

| Generic reading product | Stack Library |
| --- | --- |
| Book as an owned item | Book as a knowledge node |
| Review | Insight that can return to implementation |
| Rating | Difficulty, practical value, reread value, concept density |
| Challenge | Learning route |
| Shelf | Curated technical collection |
| Reading history | Trace from reading to application |
| Statistics | Evidence about the archive |

The central question is not “What did I read?” It is “What can I find, understand, reconnect, and apply?”

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
- Make the interface feel current to younger users without chasing disposable trends.

Do not encode the creator's biography, personality labels, or private history into the interface.

## Product signatures

### Specimen Label

Present a book or knowledge item as a catalogued technical specimen.

Use:

- precise title and authorship;
- compact but readable metadata;
- explicit status;
- technical topics and signals;
- clear provenance or registration state;
- stable alignment for scanning and comparison.

Avoid:

- store pricing hierarchy;
- star-review dominance;
- oversized cover art as the only identity;
- decorative labels without semantic value.

### Knowledge Trace

Represent movement through knowledge:

`read → understood → applied → revisited`

Use it through relationships, state transitions, linked notes, applied examples, learning routes, and reread cues. Do not force a graph visualization when a list, sequence, or relation label communicates better.

### Observatory

Use the observatory metaphor for orientation and relationships, not decoration. A knowledge map may feel like a quiet technical star chart, but stars, orbits, grids, and glows must encode something real.

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

Use short, concrete Japanese. Name a screen for what it contains.

Prefer:

- ライブラリ
- 技術トピック
- 読書メモ
- 学習ルート
- 知識マップ
- 実装接続度
- 再読価値
- 概念密度
- 価格未登録

Use English product or feature names when they function as stable identifiers, but pair them with a concise Japanese explanation when their meaning is not obvious.

Distinguish:

- `0` from 未登録;
- no books from books with missing fields;
- archive value from resale value;
- unread from paused;
- unknown from not applicable;
- incomplete data from system error.

## Direction test

Before showing a new direction, ask:

1. Can the purpose be identified without seeing the product name?
2. Which element could only belong to this product?
3. Which three generic defaults were actively avoided?
4. Does every accent, motif, and metric carry meaning?
5. Can a user return from this surface to a book, topic, note, route, or implementation insight?

If the answers are vague, revise the structure before decorating it.
