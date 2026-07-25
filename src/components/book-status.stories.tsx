import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  FavoriteBadge,
  StatusBadge,
  TechnicalAreaTags,
} from "@/components/book-status";
import { READING_STATUS_DEFINITIONS } from "@/lib/books/labels";

const meta = {
  title: "Components/Primitives/Status",
  component: StatusBadge,
  args: {
    status: "reading",
  },
  parameters: {
    docs: {
      description: {
        component:
          "読書状態を文字と色で示すPrimitiveです。色だけに依存せず、日本語ラベルを常に表示します。",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Reading: Story = {};

export const AllReadingStates: Story = {
  args: {
    status: "tsundoku",
  },
  render: () => (
    <div className="storybook-canvas storybook-canvas--primitive">
      {READING_STATUS_DEFINITIONS.map(({ id }) => (
        <StatusBadge key={id} status={id} />
      ))}
    </div>
  ),
};

export const Favorite: Story = {
  render: () => (
    <div className="storybook-canvas storybook-canvas--primitive">
      <FavoriteBadge />
    </div>
  ),
};

export const TechnicalAreas: Story = {
  render: () => (
    <div className="storybook-canvas storybook-canvas--primitive">
      <TechnicalAreaTags areas={["frontend", "design", "testing"]} />
    </div>
  ),
};
