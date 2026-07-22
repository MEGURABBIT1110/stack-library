"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "stack-library-theme";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  document
    .getElementById("stack-library-icon")
    ?.setAttribute("href", theme === "dark" ? "/icon-dark.svg" : "/icon-light.svg");
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // The visual and accessible state should still update when storage is unavailable.
  }
  window.dispatchEvent(new Event("stack-library-theme-change"));
}

function subscribe(callback: () => void) {
  window.addEventListener("stack-library-theme-change", callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener("stack-library-theme-change", callback);
    window.removeEventListener("storage", callback);
  };
}

function getThemeSnapshot(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function SunIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3.25" />
      <path d="M12 2.5v2M12 19.5v2M4.5 12h-2M21.5 12h-2M5.28 5.28l1.42 1.42M17.3 17.3l1.42 1.42M18.72 5.28 17.3 6.7M6.7 17.3l-1.42 1.42" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M20.2 15.2A8.25 8.25 0 0 1 8.8 3.8a8.26 8.26 0 1 0 11.4 11.4Z" />
    </svg>
  );
}

export function ThemeSwitch({ compact = false }: { compact?: boolean }) {
  const theme = useSyncExternalStore(subscribe, getThemeSnapshot, () => "light");

  function selectTheme(nextTheme: Theme) {
    applyTheme(nextTheme);
  }

  return (
    <div
      aria-label="表示テーマ"
      className={`theme-switch${compact ? " theme-switch--compact" : ""}`}
      role="group"
    >
      <button
        aria-label="ライトテーマに切り替える"
        aria-pressed={theme === "light"}
        className="theme-switch__button theme-switch__button--light"
        onClick={() => selectTheme("light")}
        title="ライトテーマ"
        type="button"
      >
        <SunIcon />
      </button>
      <button
        aria-label="ダークテーマに切り替える"
        aria-pressed={theme === "dark"}
        className="theme-switch__button theme-switch__button--dark"
        onClick={() => selectTheme("dark")}
        title="ダークテーマ"
        type="button"
      >
        <MoonIcon />
      </button>
    </div>
  );
}
