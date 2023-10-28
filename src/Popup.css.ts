import { globalStyle, style } from "@vanilla-extract/css";

export const main = style({
  zIndex: 999, // 999 should be enough since the portal target can be changed
  overflow: "hidden",
  outlineWidth: 2,

  // transition styles
  opacity: 0,
  scale: "0.9 0.9 1",
  transitionProperty: "opacity, scale",
  transitionDuration: "100ms",
  transitionTimingFunction: "cubic-bezier(0, 0.5 0.5, 1)",
  pointerEvents: "none",

  ":focus-visible": {
    outlineStyle: "solid",
  },
});

globalStyle(`${main}, ${main} *`, {
  boxSizing: "border-box",
});

export const mainEnter = style({
  opacity: 1,
  scale: "1 1 1",
  pointerEvents: "auto",
});

export const lastFocusable = style({
  position: "absolute",
  outline: 0,
});
