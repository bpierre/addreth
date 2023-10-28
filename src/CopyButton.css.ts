import { style } from "@vanilla-extract/css";
import {
  buttonReset,
  iconWrapper1,
  iconWrapper2,
  labelIconWrapper1,
  labelIconWrapper2,
} from "./shared.css";

export { iconWrapper1, iconWrapper2, labelIconWrapper1, labelIconWrapper2 };

export const main = style([buttonReset, {
  flexShrink: 0,
  position: "relative",
  zIndex: 1,
  display: "flex",
  alignItems: "center",
  gap: "0.3em",
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

export const icon = style({
  position: "absolute",
  inset: 0,
  opacity: 0,
  scale: 0.5,
  transitionProperty: "opacity, scale",
  transitionDuration: "50ms",
  transitionTimingFunction: "ease-out",
});

export const iconEnter = style({
  opacity: 1,
  scale: 1,
});

export const iconLeave = style({
  transitionProperty: "none",
});
