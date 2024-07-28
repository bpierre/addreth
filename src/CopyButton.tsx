import type { CSSProperties } from "react";
import type { Theme } from "./types";

import { useCallback, useRef, useState } from "react";
import * as styles from "./CopyButton.css";
import { Icon } from "./icons";
import { useTransition } from "./transition-hook";

export function CopyButton({
  className,
  content,
  label,
  showLabel,
  style,
  theme: th,
}: {
  className?: string;
  content: string;
  label: string;
  showLabel?: boolean;
  style?: CSSProperties;
  theme: Theme;
}) {
  const [showCheck, setShowCheck] = useState(false);
  const cancelCopyAnim = useRef<() => void>();

  const startCopyAnim = useCallback(() => {
    cancelCopyAnim.current?.();
    cancelCopyAnim.current = () => {
      clearTimeout(timer);
    };
    setShowCheck(true);
    const timer = setTimeout(() => {
      setShowCheck(false);
    }, 400);
  }, []);

  const checkTransition = useTransition(showCheck, 100);

  label = `Copy ${label}`;

  return (
    <button
      className={[styles.main, className ?? ""].join(" ")}
      title={label}
      onClick={() => {
        void navigator.clipboard.writeText(content);
        startCopyAnim();
      }}
      type="button"
      style={{
        overflow: "hidden",
        color: th.secondaryColor,
        outlineColor: th.focusColor,
        ...style,
      }}
    >
      {showLabel && <div>{`${label} `}</div>}
      <div className={showLabel ? styles.labelIconWrapper1 : styles.iconWrapper1}>
        <div className={showLabel ? styles.labelIconWrapper2 : styles.iconWrapper2}>
          <div
            className={[
              styles.icon,
              checkTransition.stage !== "enter" ? styles.iconEnter : "",
              checkTransition.stage !== "leave" ? styles.iconLeave : "",
            ].join(" ")}
          >
            <Icon name="copy" />
          </div>
          <div
            className={[
              styles.icon,
              checkTransition.stage === "enter" ? styles.iconEnter : "",
              checkTransition.stage === "leave" ? styles.iconLeave : "",
            ].join(" ")}
          >
            <Icon name="check" />
          </div>
        </div>
      </div>
    </button>
  );
}
