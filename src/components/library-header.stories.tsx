import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { LibraryHeader } from "@/components/library-header";
import { libraryBooks } from "@/stories/fixtures/books";

const meta = {
  title: "Patterns/LibraryHeader",
  component: LibraryHeader,
  args: {
    books: libraryBooks,
    titleAsHeading: true,
    variant: "library",
  },
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
          "蔵書画面と詳細画面の入口を示すPatternです。テーマ切替と、利用可能な場合のみ蔵書メトリクスを表示します。",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LibraryHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Library: Story = {};

export const Record: Story = {
  args: {
    titleAsHeading: false,
    variant: "record",
  },
};

export const MetricsUnavailable: Story = {
  args: {
    books: undefined,
  },
};
