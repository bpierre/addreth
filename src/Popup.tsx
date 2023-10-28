import type { MutableRefObject, ReactNode } from "react";
import type { Theme } from "./types";

import { useCallback, useEffect, useRef, useState } from "react";
import * as styles from "./Popup.css";
import { useTransition } from "./transition-hook";

const MIN_SPACING = 20;

export function Popup({
  children,
  onClose,
  target,
  show = true,
  theme: th,
}: {
  children: ReactNode;
  onClose?: () => void;
  target?: MutableRefObject<HTMLElement | null>;
  show?: boolean;
  theme: Theme;
}) {
  const [[left, top], setCoordinates] = useState<[number, number]>([0, 0]);

  const popupRef = useRef<HTMLDivElement | null>(null);
  const { stage, shouldMount } = useTransition(show, 300);
  const mount = shouldMount || show;

  // last focused element before opening the popup
  const lastFocused = useRef<HTMLElement | undefined>();

  const close = useCallback(() => {
    lastFocused.current?.focus({ preventScroll: true });
    onClose?.();
  }, [onClose]);

  useEffect(() => {
    if (!popupRef.current || !target || !mount || !show) {
      return;
    }

    const popup = popupRef.current;

    // positioning
    const resizeObserver = new ResizeObserver(() => {
      if (!target.current) return;

      const targetRect = target.current.getBoundingClientRect();

      const [x, y]: [number, number] = [
        window.scrollX + Math.max(
          MIN_SPACING, // min left
          Math.min(
            window.innerWidth - popup.offsetWidth - MIN_SPACING, // max right
            targetRect.x - popup.offsetWidth / 2 + targetRect.width / 2,
          ),
        ),
        window.scrollY + Math.max(
          MIN_SPACING, // min top
          Math.min(
            window.innerHeight - popup.offsetHeight - MIN_SPACING, // max bottom
            targetRect.y - popup.offsetHeight / 2 + targetRect.height / 2,
          ),
        ),
      ];

      setCoordinates((prev) => (
        prev[0] === x && prev[1] === y ? prev : [x, y]
      ));
    });
    resizeObserver.observe(popup);

    const onEscape = ({ key }: KeyboardEvent) => {
      if (key === "Escape") {
        close();
      }
    };

    // close on escape
    popup.ownerDocument.addEventListener("keydown", onEscape);

    // close on window resize
    window.addEventListener("resize", close);

    const { activeElement } = popup.ownerDocument;
    if (activeElement instanceof HTMLElement) {
      lastFocused.current ??= activeElement;
    }

    popup.focus({ preventScroll: true });

    return () => {
      resizeObserver.disconnect();
      popup.ownerDocument.removeEventListener("keydown", onEscape);
      window.removeEventListener("resize", close);
    };
  }, [close, mount, show, target]);

  return mount && (
    <div
      ref={popupRef}
      className={[
        styles.main,
        stage === "enter" ? styles.mainEnter : "",
      ].join(" ")}
      onBlur={(event) => {
        // the newly focused element is outside the popup
        if (!popupRef.current?.contains(event.relatedTarget)) {
          event.stopPropagation();
          close();
        }
      }}
      tabIndex={0}
      style={{
        position: target ? "absolute" : "static",
        top,
        left,
        background: th.popupBackground,
        borderRadius: th.popupRadius,
        outlineColor: th.focusColor,
        boxShadow: th.popupShadow,
      }}
    >
      {children}
      <div
        // This is to prevent a case where the focus can leave the document,
        // preventing to move it back to the opener. This can happen when
        // the popup is inserted at the end of the document. To prevent this,
        // we add a focusable element at the end of the popup, which triggers
        // the popup to close when focused.
        onFocus={close}
        tabIndex={0}
        className={styles.lastFocusable}
      />
    </div>
  );
}
