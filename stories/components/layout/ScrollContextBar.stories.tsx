import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, waitFor } from "storybook/test";

import { ScrollContextBar } from "@/components/layout/ScrollContextBar";
import { makeBook } from "../../fixtures/books";

const meta = {
  title: "Components/Layout/ScrollContextBar",
  component: ScrollContextBar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ScrollContextBar>;

export default meta;
type Story = StoryObj<typeof meta>;

let emitIntersection: IntersectionObserverCallback | undefined;

function mockIntersectionObserver() {
  const original = window.IntersectionObserver;

  window.IntersectionObserver = class {
    constructor(callback: IntersectionObserverCallback) {
      emitIntersection = callback;
    }

    disconnect() {}
    observe() {}
    takeRecords() {
      return [];
    }
    unobserve() {}
  } as unknown as typeof IntersectionObserver;

  return () => {
    window.IntersectionObserver = original;
    emitIntersection = undefined;
  };
}

export const LibraryContext: Story = {
  beforeEach: mockIntersectionObserver,
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
    emitIntersection?.([
      {
        boundingClientRect: { bottom: -1 } as DOMRect,
        isIntersecting: false,
      } as IntersectionObserverEntry,
    ], {} as IntersectionObserver);
    await waitFor(() => expect(bar).toHaveClass("scroll-context--visible"));
    await waitFor(() => expect(bar).not.toHaveAttribute("inert"));

    emitIntersection?.([
      {
        boundingClientRect: { bottom: 100 } as DOMRect,
        isIntersecting: true,
      } as IntersectionObserverEntry,
    ], {} as IntersectionObserver);
    await waitFor(() => expect(bar).not.toHaveClass("scroll-context--visible"));
    await waitFor(() => expect(bar).toHaveAttribute("inert"));
  },
};

export const RecordContext: Story = {
  beforeEach: mockIntersectionObserver,
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
    const bar = canvasElement.querySelector(".scroll-context");

    await expect(bar).toHaveAttribute("inert");
    await expect(canvasElement.querySelector(".scroll-context__record-copy strong")).toHaveTextContent(
      "長い日本語の技術書タイトルでも識別できる記録",
    );
  },
};
