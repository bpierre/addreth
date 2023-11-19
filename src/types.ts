export type { Config } from "./AddrethConfig";

export type Address = `0x${string}`;

export type ExplorerLink = {
  name: string;
  accountUrl: string;
};

export type Color = string;

export type Font = {
  fontFamily: string;
  fontWeight: string;
};

export type Theme = {
  // general
  textColor: Color; // text color of the button and popup
  secondaryColor: Color; // color of icons
  focusColor: Color; // color of the focus ring
  fontSize: number; // font size

  // badge
  badgeHeight: number; // height of the badge
  badgeGap: number; // gap between badge itemstype
  badgeRadius: number; // radius used for the badge (if badgeGap is 0) or for individual buttons
  badgeIconRadius?: number; // radius for the badge icon (defaults to badgeRadius if not set)
  badgeBackground: Color; // background color for the badge
  badgePadding: number; // inner padding of the badge
  badgeLabelPadding: number; // padding inside the badge label

  // popup
  popupBackground: Color; // background color of the popup
  popupRadius: number; // radius of the popup
  popupShadow: string; // shadow of the popup
};

export type ThemeName =
  | "light"
  | "dark"
  | "unified-light"
  | "unified-dark"
  | "simple-light"
  | "simple-dark";

export type ThemeWithoutFonts = Omit<Theme, "font" | "fontMono">;

export type ThemeDeclaration =
  | Partial<ThemeWithoutFonts & { base: ThemeName }>
  | ThemeName;
