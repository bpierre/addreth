import type { Theme, ThemeDeclaration, ThemeName, ThemeWithoutFonts } from "./types";

const THEME_LIGHT: ThemeWithoutFonts = {
  // general
  textColor: "#1E1E1E",
  secondaryColor: "#808080",
  focusColor: "#1E1E1E",
  fontSize: 15,

  // badge
  badgeBackground: "#ededed",
  badgeGap: 3,
  badgeHeight: 24,
  badgePadding: 0,
  badgeLabelPadding: 8,
  badgeRadius: 4,

  // popup
  popupBackground: "#fff",
  popupRadius: 4,
  popupShadow: "0 4px 8px rgb(0 0 0 / 0.1)",
};

const THEME_DARK: ThemeWithoutFonts = {
  ...THEME_LIGHT,
  textColor: "#D9D9D9",
  secondaryColor: "#808080",
  focusColor: "#D9D9D9",
  badgeBackground: "#1E1E1E",
  popupBackground: "#1E1E1E",
};

const THEME_UNIFIED_BASE: Partial<ThemeWithoutFonts> = {
  badgeHeight: 32,
  badgePadding: 4,
  badgeLabelPadding: 6,
  badgeGap: 0,
  badgeBackground: "none",
  badgeRadius: 32,
};

const THEME_SIMPLE_BASE: Partial<ThemeWithoutFonts> = {
  badgeBackground: "none",
  badgeGap: 0,
  badgeLabelPadding: 4,
  badgeIconRadius: 12,
};

const DEFAULT_THEME: ThemeName = "light";

export const THEMES: Record<ThemeName, ThemeWithoutFonts> = {
  "light": THEME_LIGHT,
  "dark": THEME_DARK,
  "unified-light": {
    ...THEME_LIGHT,
    ...THEME_UNIFIED_BASE,
    badgeBackground: "#ededed",
  },
  "unified-dark": {
    ...THEME_DARK,
    ...THEME_UNIFIED_BASE,
    badgeBackground: "#1E1E1E",
  },
  "simple-light": {
    ...THEME_LIGHT,
    ...THEME_SIMPLE_BASE,
  },
  "simple-dark": {
    ...THEME_DARK,
    ...THEME_SIMPLE_BASE,
  },
};

// Get a theme object from a declaration, inheriting
// from the specified base theme or the default one.
export function getTheme(declaration: ThemeDeclaration = "light"): Theme {
  const { base, ...themeWithoutBase } = (
    typeof declaration === "string" ? { base: declaration } : declaration
  );

  return {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    ...base && THEMES[base] || THEMES[DEFAULT_THEME],
    ...themeWithoutBase,
  };
}
