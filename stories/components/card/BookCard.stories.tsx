import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";

import { BookCard } from "@/components/card/BookCard";
import { baseBook, makeBook } from "../../fixtures/books";

const meta = {
  title: "Components/Card/BookCard",
  component: BookCard,
  args: {
    book: baseBook,
  },
  decorators: [
    (Story) => (
      <div className="storybook-canvas storybook-canvas--component">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "蔵書一覧の1冊を、書影だけで詳細へのリンクとして示すCompositeです。書誌情報や読書状態は詳細画面へ委譲します。",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BookCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CoverUnavailable: Story = {};

export const CoverAvailable: Story = {
  args: {
    book: makeBook({
      coverImageUrl: "/assets/covers/book-01.jpg",
      title: "Clean Code",
    }),
  },
};

export const Hover: Story = {
  args: {
    book: makeBook({
      coverImageUrl: "/assets/covers/book-01.jpg",
      title: "百年の孤独（新潮文庫）",
      authors: ["G・ガルシア＝マルケス"],
    }),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByRole("link", {
      name: "百年の孤独（新潮文庫）の詳細を開く",
    });
    const tooltip = canvas.getByText("百年の孤独（新潮文庫）");

    await expect(tooltip).not.toBeVisible();
    await userEvent.hover(card);
    await expect(tooltip).toBeInTheDocument();
    await userEvent.unhover(card);
    await expect(tooltip).toHaveTextContent("百年の孤独（新潮文庫）");
  },
};

export const LongJapaneseTitle: Story = {
  args: {
    book: makeBook({
      contentId: "storybook-long-title",
      title:
        "長期運用される大規模フロントエンドのためのコンポーネント設計とアクセシビリティ検証",
      authors: ["非常に長い著者名を持つ技術標本研究会", "共同執筆者"],
      coverImageUrl: "/assets/covers/book-02.jpg",
    }),
  },
};
