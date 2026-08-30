import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { LibraryHeader } from "@/components/layout/LibraryHeader";

const meta = {
  title: "Components/Layout/LibraryHeader",
  component: LibraryHeader,
  args: {
    currentPage: "library",
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
          "Figmaの埋め込み型ヘッダーに準拠し、製品名、現在位置を示すナビゲーション、テーマ切替を表示します。",
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
    variant: "record",
  },
};

export const BankCurrent: Story = {
  args: {
    currentPage: "bank",
  },
};
