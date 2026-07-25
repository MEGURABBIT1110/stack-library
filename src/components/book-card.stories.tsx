import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { BookCard } from "@/components/book-card";
import { baseBook, makeBook } from "@/stories/fixtures/books";

const meta = {
  title: "Components/Composites/BookCard",
  component: BookCard,
  args: {
    archiveNumber: "0001",
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
          "蔵書一覧で、書影・書名・著者・読書状態を1つの遷移先として示すCompositeです。",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BookCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CoverUnavailable: Story = {};

export const LongJapaneseContent: Story = {
  args: {
    archiveNumber: "0042",
    book: makeBook({
      contentId: "storybook-long-title",
      title:
        "長期運用される大規模フロントエンドのためのコンポーネント設計とアクセシビリティ検証",
      authors: ["非常に長い著者名を持つ技術標本研究会", "共同執筆者"],
      readingStatus: "reading",
      isFavorite: false,
    }),
  },
};

export const NotFavorite: Story = {
  args: {
    archiveNumber: "0012",
    book: makeBook({
      contentId: "storybook-not-favorite",
      readingStatus: "tsundoku",
      isFavorite: false,
    }),
  },
};
