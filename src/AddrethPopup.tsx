import type { MutableRefObject } from "react";
import type { Address, ExplorerLink } from "./types";

import { blo } from "blo";
import * as styles from "./AddrethPopup.css";
import { useExtendConfig } from "./Config";
import { CopyButton } from "./CopyButton";
import { LinkButton } from "./LinkButton";
import { Popup } from "./Popup";

export function AddrethPopup({
  address,
  explorer,
  onClose,
  show,
  target,
}: {
  address: Address;
  explorer: ExplorerLink;
  onClose?: () => void;
  show: boolean;
  target?: MutableRefObject<HTMLElement | null>;
}) {
  const { theme: th, ...config } = useExtendConfig();
  return (
    <Popup
      onClose={onClose}
      target={target}
      show={show}
      theme={th}
    >
      <div
        className={styles.main}
        style={{
          ...config.font,
          fontSize: th.fontSize,
        }}
      >
        <div className={styles.addressArea}>
          <img
            className={styles.identicon}
            alt=""
            src={blo(address)}
          />
          <div
            className={styles.address}
            style={{
              ...config.fontMono,
              color: th.textColor,
            }}
          >
            {
              // split the address in six 7-chars groups
              (address.match(/.{1,7}/g) ?? []).map((part, i) => (
                <span key={i}>
                  {part}
                </span>
              ))
            }
          </div>
        </div>
        <div className={styles.actions}>
          <CopyButton
            content={address}
            label="address"
            showLabel={true}
            theme={th}
          />
          <LinkButton
            className={styles.explorerLink}
            explorer={explorer}
            showLabel={true}
            theme={th}
            style={{
              color: th.secondaryColor,
              outlineColor: th.focusColor,
            }}
          />
        </div>
      </div>
    </Popup>
  );
}
