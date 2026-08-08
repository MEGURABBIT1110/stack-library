import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";

import { ScrollContextBar } from "@/components/scroll-context-bar";
import { makeBook } from "@/stories/fixtures/books";

const meta = {
  title: "Components/ScrollContextBar",
  component: ScrollContextBar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ScrollContextBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LibraryContext: Story = {
  args: {
    kind: "library",
    observeId: "scroll-context-target",
  },
  render: () => (
    <>
      <div id="scroll-context-target" style={{ minHeight: 720, padding: 24 }}>
        Book List content
      </div>
      <ScrollContextBar kind="library" observeId="scroll-context-target" />
    </>
  ),
  play: async ({ canvasElement }) => {
    const bar = canvasElement.querySelector(".scroll-context");

    await expect(bar).toHaveAttribute("inert");
  },
};

export const RecordContext: Story = {
  args: {
    book: makeBook(),
    kind: "record",
    observeId: "record-context-target",
  },
  render: () => (
    <>
      <div id="record-context-target" style={{ minHeight: 720, padding: 24 }}>
        Book Detail content
      </div>
      <ScrollContextBar
        book={makeBook({
          title: "長い日本語の技術書タイトルでも識別できる記録",
          authors: ["第一著者", "第二著者"],
          coverImageUrl: undefined,
        })}
        kind="record"
        observeId="record-context-target"
      />
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const bar = canvasElement.querySelector(".scroll-context");

    await expect(bar).toHaveAttribute("inert");
    await expect(canvasElement.querySelector(".scroll-context__record-copy strong")).toHaveTextContent(
      "長い日本語の技術書タイトルでも識別できる記録",
    );
  },
};
