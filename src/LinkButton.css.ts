import { style } from "@vanilla-extract/css";
import {
  buttonReset,
  ellipsis,
  iconWrapper1,
  iconWrapper2,
  labelIconWrapper1,
  labelIconWrapper2,
} from "./shared.css";

export { iconWrapper1, iconWrapper2, labelIconWrapper1, labelIconWrapper2 };

export const main = style([buttonReset, {
  flexShrink: 0,
  overflow: "hidden",
  position: "relative",
  zIndex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  width: 0,
  gap: "0.3em",
  textDecoration: "none",
  color: "inherit",
  borderRadius: 4,
  ":active": {
    top: 1,
  },
  ":focus-visible": {
    zIndex: 2,
    outlineOffset: 0,
    outlineWidth: 2,
    outlineStyle: "solid",
  },
}]);

export const label = style([ellipsis, {
  flexShrink: 1,
}]);
