import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";

import { BookCover } from "@/components/book-cover";
import { makeBook } from "@/stories/fixtures/books";

const meta = {
  title: "Components/Common/BookCover",
  component: BookCover,
  args: {
    book: makeBook({ coverImageUrl: undefined, title: "テスト書籍" }),
    variant: "detail",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BookCover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Placeholder: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("img", { name: /テスト書籍/ }),
    ).toBeVisible();
  },
};

export const DecorativePlaceholder: Story = {
  args: {
    decorative: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByRole("img")).toBeNull();
  },
};
