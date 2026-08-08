import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";

type TokenKind = "color" | "font" | "shadow";

type FoundationToken = {
  label: string;
  token: string;
  kind: TokenKind;
  role: string;
  foreground?: string;
  contrast?: string;
};

const foundationTokens: FoundationToken[] = [
  { label: "Canvas / 背景", token: "--color-canvas", kind: "color", role: "画面全体の背景", foreground: "--color-text", contrast: "本文" },
  { label: "Surface / 面", token: "--color-surface", kind: "color", role: "ヘッダーや台帳の面", foreground: "--color-text", contrast: "本文" },
  { label: "Text / 本文", token: "--color-text", kind: "color", role: "本文・見出し", foreground: "--color-canvas", contrast: "Canvas" },
  { label: "Muted text / 補助本文", token: "--color-text-muted", kind: "color", role: "補助説明・メタデータ", foreground: "--color-canvas", contrast: "Canvas" },
  { label: "Rule / 罫線", token: "--color-rule", kind: "color", role: "境界・区切り", foreground: "--color-surface", contrast: "Surface" },
  { label: "Accent / 強調", token: "--color-accent", kind: "color", role: "リンク・フォーカス・操作", foreground: "--color-canvas", contrast: "Canvas" },
  { label: "Accent soft / 強調面", token: "--color-accent-soft", kind: "color", role: "強調の背景面", foreground: "--color-text", contrast: "本文" },
  { label: "Reading / 読書中", token: "--color-reading", kind: "color", role: "読書中の状態", foreground: "--color-canvas", contrast: "Canvas" },
  { label: "Reading soft / 読書中の面", token: "--color-reading-soft", kind: "color", role: "読書中の状態面", foreground: "--color-text", contrast: "本文" },
  { label: "Archive accent / 蔵書強調", token: "--color-play", kind: "color", role: "蔵書の補助強調", foreground: "--color-canvas", contrast: "Canvas" },
  { label: "Archive accent soft / 蔵書強調面", token: "--color-play-soft", kind: "color", role: "蔵書の補助強調面", foreground: "--color-text", contrast: "本文" },
  { label: "Material floating / 浮遊面", token: "--color-material-floating", kind: "color", role: "浮遊する機能面", foreground: "--color-text", contrast: "本文" },
  { label: "Material highlight / 面のハイライト", token: "--color-material-highlight", kind: "color", role: "浮遊面の境界・反射", foreground: "--color-text", contrast: "本文" },
  { label: "Status tsundoku / 積読", token: "--color-status-tsundoku", kind: "color", role: "積読状態のsignal", foreground: "--color-canvas", contrast: "Canvas" },
  { label: "Status tsundoku soft / 積読面", token: "--color-status-tsundoku-soft", kind: "color", role: "積読状態の面", foreground: "--color-text", contrast: "本文" },
  { label: "Status finished / 読了", token: "--color-status-finished", kind: "color", role: "読了状態のsignal", foreground: "--color-canvas", contrast: "Canvas" },
  { label: "Status finished soft / 読了面", token: "--color-status-finished-soft", kind: "color", role: "読了状態の面", foreground: "--color-text", contrast: "本文" },
  { label: "Status reference / 参照", token: "--color-status-reference", kind: "color", role: "参照状態のsignal", foreground: "--color-canvas", contrast: "Canvas" },
  { label: "Status reference soft / 参照面", token: "--color-status-reference-soft", kind: "color", role: "参照状態の面", foreground: "--color-text", contrast: "本文" },
  { label: "Status paused / 中断", token: "--color-status-paused", kind: "color", role: "中断状態のsignal", foreground: "--color-canvas", contrast: "Canvas" },
  { label: "Status paused soft / 中断面", token: "--color-status-paused-soft", kind: "color", role: "中断状態の面", foreground: "--color-text", contrast: "本文" },
  { label: "Sans / 本文書体", token: "--font-sans", kind: "font", role: "日本語本文・UI", contrast: "Canvas" },
  { label: "Mono / 等幅書体", token: "--font-mono", kind: "font", role: "コード・識別子", contrast: "Canvas" },
  { label: "Floating / 浮遊影", token: "--shadow-floating", kind: "shadow", role: "浮遊する機能面", contrast: "Surface" },
  { label: "Book / 書影影", token: "--shadow-book", kind: "shadow", role: "書影の奥行き", contrast: "Canvas" },
] as const;

function FoundationTokens() {
  return (
    <div className="storybook-canvas">
      <div className="storybook-foundation-grid">
        {foundationTokens.map(({ label, token, kind, role, foreground, contrast }) => (
          <article className={`storybook-token storybook-token--${kind}`} key={token}>
            <div
              className="storybook-token__sample"
              style={{
                "--token-color": `var(${token})`,
                "--token-foreground": `var(${foreground ?? "--color-text"})`,
                "--token-shadow": `var(${token})`,
              } as CSSProperties}
            >
              <span aria-hidden="true">Aa</span>
            </div>
            <div className="storybook-token__copy">
              <strong>{label}</strong>
              <code>{token}</code>
              <span>{role}</span>
              {contrast ? <small>対比: {contrast}</small> : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

const meta = {
  title: "Foundations/SemanticTokens",
  component: FoundationTokens,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "アプリとStorybookで共有するsemantic foundationです。色・素材・書体・影を用途と対比関係つきで確認し、ツールバーのThemeでLight / Darkを切り替えます。",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FoundationTokens>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SemanticTokens: Story = {
  render: () => <FoundationTokens />,
};
