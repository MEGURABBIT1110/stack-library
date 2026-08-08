import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";

import { BookDetailIdentity } from "@/components/book-detail-identity";
import { makeBook } from "@/stories/fixtures/books";

const meta = {
  title: "Components/BookDetailIdentity",
  component: BookDetailIdentity,
  args: {
    archiveNumber: "0420",
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
