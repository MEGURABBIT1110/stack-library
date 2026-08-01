import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TechnicalAreaTags } from "@/components/common/technical-area-tags";

const meta = {
  title: "Components/Common/TechnicalAreaTags",
  component: TechnicalAreaTags,
  args: {
    areas: ["frontend", "design", "testing"],
  },
  parameters: {
    docs: {
      description: {
        component:
          "技術分野を中立色で示すCommon Primitiveです。複数時は折り返し、分野ごとの色分けは行いません。",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TechnicalAreaTags>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Wrapped: Story = {
  args: {
    areas: ["frontend", "architecture", "language", "testing"],
  },
  decorators: [
    (Story) => (
      <div style={{ width: 180 }}>
        <Story />
      </div>
    ),
  ],
};

export const Empty: Story = {
  args: {
    areas: [],
  },
};
