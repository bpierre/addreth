import type { CSSProperties } from "react";
import type { ExplorerLink, Theme } from "./types";

import { Icon } from "./icons";
import * as styles from "./LinkButton.css";

export function LinkButton({
  className,
  explorer,
  showLabel,
  style,
  theme: th,
}: {
  className?: string;
  explorer: ExplorerLink;
  showLabel?: boolean;
  style?: CSSProperties;
  theme: Theme;
}) {
  return (
    <a
      className={[styles.main, className].join(" ")}
      href={explorer.accountUrl}
      title={explorer.name}
      rel="noopener noreferrer"
      target="_blank"
      style={{
        display: "flex",
        color: th.secondaryColor,
        outlineColor: th.focusColor,
        ...style,
      }}
    >
      {showLabel && <div className={styles.label}>{explorer.name + " "}</div>}
      <div className={showLabel ? styles.labelIconWrapper1 : styles.iconWrapper1}>
        <div className={showLabel ? styles.labelIconWrapper2 : styles.iconWrapper2}>
          <Icon name="link" />
        </div>
      </div>
    </a>
  );
}
