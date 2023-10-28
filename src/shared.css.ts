import { style } from "@vanilla-extract/css";

export const buttonReset = style({
  border: 0,
  margin: 0,
  padding: 0,
  font: "inherit",
  lineHeight: "inherit",
  color: "inherit",
  background: "none",
  appearance: "none",
  textAlign: "left",
  textDecoration: "none",
  textTransform: "none",
  whiteSpace: "nowrap",
  cursor: "pointer",
});

export const ellipsis = style({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const iconWrapper1 = style({
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
});

export const iconWrapper2 = style({
  flexShrink: 0,
  flexGrow: 0,
  position: "relative",
  width: "1.3em",
  height: "1.3em",
});

export const labelIconWrapper1 = style([iconWrapper1, {
  width: "1.6em",
  height: "1.6em",
}]);

export const labelIconWrapper2 = style([iconWrapper2, {
  width: "100%",
  height: "100%",
}]);
