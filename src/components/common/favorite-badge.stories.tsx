import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FavoriteBadge } from "@/components/common/book-status";

const meta = {
  title: "Components/Common/FavoriteBadge",
  component: FavoriteBadge,
  parameters: {
    docs: {
      description: {
        component: "お気に入り状態を文字とアイコンで示すPrimitiveです。",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FavoriteBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
