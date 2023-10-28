import { style } from "@vanilla-extract/css";

export const main = style({
  display: "flex",
  flexDirection: "column",
  gap: "1.2em",
  padding: "1.2em 1.2em 1em",
});

export const addressArea = style({
  display: "flex",
  alignItems: "center",
  gap: "1.2em",
  width: "100%",
});

export const identicon = style({
  borderRadius: "0.4em",
  width: "3.6em",
  height: "3.6em",
});

export const address = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "0.8em 0.6em",
});

export const actions = style({
  display: "flex",
  justifyContent: "space-between",
  gap: "1.2em",
  width: "100%",
});

export const explorerLink = style({
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: 0,
  maxWidth: "fit-content",
});
