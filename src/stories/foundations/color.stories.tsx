import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";

const semanticColors = [
  { label: "Canvas", token: "--color-canvas" },
  { label: "Surface", token: "--color-surface" },
  { label: "Text", token: "--color-text" },
  { label: "Muted text", token: "--color-text-muted" },
  { label: "Rule", token: "--color-rule" },
  { label: "Accent", token: "--color-accent" },
  { label: "Accent soft", token: "--color-accent-soft" },
  { label: "Reading", token: "--color-reading" },
  { label: "Reading soft", token: "--color-reading-soft" },
  { label: "Archive accent", token: "--color-play" },
  { label: "Archive accent soft", token: "--color-play-soft" },
] as const;

function SemanticColorTokens() {
  return (
    <div className="storybook-canvas">
      <div className="storybook-token-grid">
        {semanticColors.map(({ label, token }) => (
          <div className="storybook-token" key={token}>
            <div
              aria-hidden="true"
              className="storybook-token__sample"
              style={{ "--token-color": `var(${token})` } as CSSProperties}
            />
            <div className="storybook-token__copy">
              <strong>{label}</strong>
              <code>{token}</code>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const meta = {
  title: "Foundations/Color",
  component: SemanticColorTokens,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "アプリとStorybookで共有するsemantic colorです。ツールバーのThemeでLight / Darkを切り替えます。",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SemanticColorTokens>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SemanticTokens: Story = {};
