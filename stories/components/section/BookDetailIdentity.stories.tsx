import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";
import { page } from "vitest/browser";

import { BookDetailIdentity } from "@/components/section/BookDetailIdentity";
import { makeBook } from "../../fixtures/books";

const meta = {
  title: "Components/Section/BookDetailIdentity",
  component: BookDetailIdentity,
  args: {
    book: makeBook({
      coverImageUrl: undefined,
      title: "長い日本語とTypeScriptを含む技術書タイトルの判読性を確認する記録",
      authors: ["第一著者", "第二著者", "第三著者"],
    }),
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BookDetailIdentity>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LongJapaneseRecord: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("heading", { level: 1 })).toHaveTextContent(
      "長い日本語とTypeScriptを含む技術書タイトルの判読性を確認する記録",
    );
    await expect(canvas.getByText(/第一著者/)).toBeVisible();
    await expect(canvas.getByRole("img", { name: /長い日本語/ })).toBeVisible();
  },
};

export const MissingCover: Story = {
  args: {
    book: makeBook({ coverImageUrl: undefined, title: "書影未登録の技術書" }),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("img", { name: /書影未登録/ })).toBeVisible();
  },
};

export const NarrowJapaneseRecord: Story = {
  play: async ({ canvasElement }) => {
    await page.viewport(320, 900);
    const canvas = within(canvasElement);
    const identity = canvasElement.querySelector(".book-identity");

    await expect(canvas.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(identity).toBeTruthy();
    await expect(identity!.scrollWidth).toBeLessThanOrEqual(320);
  },
};
