import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { BookShelf } from "@/components/layout/book-shelf";

const meta = {
  title: "Components/Layout/BookShelf",
  component: BookShelf,
  render: () => (
    <div className="storybook-canvas">
      <BookShelf />
    </div>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "何も収納していない1段分の棚本体だけを提供するLayoutです。書影やリンクは持たず、複数段のカタログ化と書影との組み合わせは上位のセクションが担当します。",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BookShelf>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
