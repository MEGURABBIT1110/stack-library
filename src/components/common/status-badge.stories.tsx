import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { StatusBadge } from "@/components/common/status-badge";
import { READING_STATUS_DEFINITIONS } from "@/lib/books/labels";

const meta = {
  title: "Components/Common/StatusBadge",
  component: StatusBadge,
  args: {
    status: "reading",
  },
  parameters: {
    docs: {
      description: {
        component:
          "読書状態を文字とsignalで示すCommon Primitiveです。色だけに依存せず、日本語ラベルを常に表示します。",
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
    <div className="storybook-canvas storybook-canvas--primitive storybook-canvas--status-badges">
      {READING_STATUS_DEFINITIONS.map(({ id }) => (
        <StatusBadge key={id} status={id} />
      ))}
    </div>
  ),
};
