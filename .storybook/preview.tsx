import type { Decorator, Preview } from "@storybook/nextjs-vite";
import { useEffect, type ReactNode } from "react";

import "../src/app/globals.css";
import "../src/stories/storybook.css";

type Theme = "light" | "dark";

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
    options: {
      storySort: {
        order: [
          "Foundations",
          "Components",
          ["Primitives", "Composites"],
          "Patterns",
        ],
      },
    },
  },
};

export default preview;
