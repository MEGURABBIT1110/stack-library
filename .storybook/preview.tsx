import type { Decorator, Preview } from "@storybook/nextjs-vite";
import { useEffect, type ReactNode } from "react";

import "../src/app/globals.css";
import "../stories/storybook.css";

type Theme = "light" | "dark";

const viewportOptions = {
  desktop: {
    name: "デスクトップ",
    styles: { height: "1024px", width: "1280px" },
    type: "desktop",
  },
  tablet: {
    name: "タブレット",
    styles: { height: "1112px", width: "834px" },
    type: "tablet",
  },
  mobile: {
    name: "スマートフォン",
    styles: { height: "844px", width: "390px" },
    type: "mobile",
  },
} as const;

function ThemeBoundary({
  children,
  theme,
}: {
  children: ReactNode;
  theme: Theme;
}) {
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem("stack-library-theme", theme);
    window.dispatchEvent(new Event("stack-library-theme-change"));
  }, [theme]);

  return (
    <div className="storybook-theme-boundary" data-storybook-theme={theme}>
      {children}
    </div>
  );
}

const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme === "dark" ? "dark" : "light";

  return (
    <ThemeBoundary theme={theme}>
      <Story />
    </ThemeBoundary>
  );
};

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: "Stack Libraryの表示テーマ",
      toolbar: {
        dynamicTitle: true,
        icon: "paintbrush",
        items: [
          { icon: "sun", title: "Light", value: "light" },
          { icon: "moon", title: "Dark", value: "dark" },
        ],
      },
    },
  },
  initialGlobals: {
    theme: "light",
    viewport: { value: "desktop", isRotated: false },
  },
  parameters: {
    a11y: {
      test: "error",
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
    viewport: {
      options: viewportOptions,
    },
    options: {
      storySort: {
        order: [
          "Foundations",
          "Components",
          ["Common", "Card", "Section", "Layout"],
        ],
      },
    },
  },
};

export default preview;
