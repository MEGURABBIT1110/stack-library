import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { LibraryBank } from "@/components/section/library-bank";
import { libraryBooks, makeBook } from "../../fixtures/books";
import type { Book } from "@/types/book";

const meta = {
  title: "Components/Section/LibraryBank",
  component: LibraryBank,
  args: { books: libraryBooks },
  decorators: [
    (Story) => (
      <div className="storybook-canvas">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "登録価格の集計と蔵書別明細を示すPatternです。価格のゼロ、未登録、蔵書0件、取得失敗を異なる状態として扱います。",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LibraryBank>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {};

export const SomePricesMissing: Story = {
  args: {
    books: [
      ...libraryBooks,
      makeBook({
        contentId: "storybook-missing-price",
        title: "価格未登録の技術書",
        price: undefined,
        publisher: undefined,
        readingStatus: "paused",
      }),
    ],
  },
};

export const AllPricesZero: Story = {
  args: {
    books: libraryBooks.map((book) => ({ ...book, price: 0 })),
  },
};

export const NoRegisteredPrices: Story = {
  args: {
    books: libraryBooks.map((book) => ({ ...book, price: undefined })),
  },
};

export const NoBooks: Story = {
  args: { books: [] },
};

export const LongJapaneseAndMultipleAuthors: Story = {
  args: {
    books: [
      makeBook({
        contentId: "storybook-long-japanese",
        title:
          "長期運用される大規模な日本語プロダクトにおけるフロントエンド設計とアクセシビリティ検証の実践",
        authors: ["大石 周", "技術標本研究会", "Stack Library編集部"],
        price: 123456789,
        publisher:
          "長期運用技術とアクセシビリティ設計に関する日本語出版研究所",
        readingStatus: "reading",
      }),
    ],
  },
};

export const MoreThanOneHundredBooks: Story = {
  args: {
    books: Array.from({ length: 105 }, (_, index): Book =>
      makeBook({
        contentId: `storybook-bank-${index + 1}`,
        title: `技術標本 ${String(index + 1).padStart(3, "0")}`,
        price: index % 7 === 0 ? undefined : index * 100,
        publisher: index % 11 === 0 ? undefined : `技術出版社 ${index + 1}`,
      }),
    ),
  },
};

export const FetchError: Story = {
  args: { books: undefined, error: true },
};
