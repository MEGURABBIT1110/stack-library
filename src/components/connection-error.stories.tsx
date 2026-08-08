import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";

import { ConnectionError } from "@/components/connection-error";

const meta = {
  title: "Components/ConnectionError",
  component: ConnectionError,
  args: {
    error: new Error("storybook connection failure"),
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ConnectionError>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ServiceFailure: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("alert")).toBeVisible();
    await expect(canvas.getByRole("heading", { level: 1 })).toBeVisible();
  },
};
