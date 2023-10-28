import { globalStyle, style } from "@vanilla-extract/css";
import { buttonReset, ellipsis } from "./shared.css";

export const main = style({
  position: "relative",
  display: "inline-flex",
});

globalStyle(`${main} *`, {
  boxSizing: "border-box",
});

export const addressButton = style([buttonReset, {
  display: "grid",
  gridAutoFlow: "column",
  outline: 0,
}]);

export const addressButtonUnified = style({});

export const badgeIconLabel = style({
  position: "relative",
  zIndex: 2,
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  height: "100%",
  outlineWidth: 2,
});

globalStyle(
  `${addressButton}:focus-visible ${badgeIconLabel}`,
  { outlineStyle: "solid" },
);

export const badgeBackground = style({
  position: "absolute",
  inset: 0,
  zIndex: 1,
  height: "100%",
});

globalStyle(
  `${addressButtonUnified}:active ~ *,
   ${addressButtonUnified}:active ${badgeBackground},
   ${addressButton}:active ${badgeIconLabel}`,
  { top: 1 },
);

export const label = style({
  position: "relative",
  zIndex: 1,
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  height: "100%",
});

export const labelIn = style([ellipsis]);
