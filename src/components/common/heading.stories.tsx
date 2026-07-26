import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";

import { Heading } from "@/components/common/heading";

const meta = {
  title: "Components/Common/Heading",
  component: Heading,
  args: {
    as: "h1",
    children: "技術書を、知識として積み重ねる",
    scale: "page",
  },
  argTypes: {
    as: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
    },
    scale: {
      control: "select",
      options: ["page", "section", "subsection", "compact"],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "見出しの視覚スケールを担うCommonのPrimitiveです。HTMLのh1〜h6は画面の文書構造に応じてasで選び、見た目はscaleで独立して指定します。",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByRole("heading", { level: 1 });

    await expect(heading).toHaveAttribute("data-heading-scale", "page");
  },
};

export const ScaleGuide: Story = {
  render: () => (
    <div className="heading-story__scale-guide">
      <Heading as="h1" scale="page">
        h1 / Page — 技術書ライブラリ
      </Heading>
      <Heading as="h2" scale="section">
        h2 / Section — 書籍別の登録価格
      </Heading>
      <Heading as="h3" scale="subsection">
        h3 / Subsection — 長い日本語の書名でも読みやすい見出し
      </Heading>
      <Heading as="h4" scale="compact">
        h4 / Compact — 補助的な見出し
      </Heading>
    </div>
  ),
};
