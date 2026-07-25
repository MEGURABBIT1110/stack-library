import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";

import { ThemeSwitch } from "@/components/theme-switch";

const meta = {
  title: "Components/Primitives/ThemeSwitch",
  component: ThemeSwitch,
  args: {
    compact: false,
  },
  parameters: {
    docs: {
      description: {
        component:
          "Light / Darkを選ぶ2択のコントロールです。現在値はaria-pressedでも伝えます。",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ThemeSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  globals: {
    theme: "light",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const darkButton = canvas.getByRole("button", {
      name: "ダークテーマに切り替える",
    });

    await userEvent.click(darkButton);
    await expect(darkButton).toHaveAttribute("aria-pressed", "true");
    await expect(document.documentElement).toHaveAttribute("data-theme", "dark");
  },
};

export const Compact: Story = {
  args: {
    compact: true,
  },
};
