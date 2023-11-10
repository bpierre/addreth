import type { ForwardedRef } from "react";
import type { AddrethProps } from "./Addreth";

import { forwardRef } from "react";
import { Addreth as AddrethWrapped } from "./Addreth";
import { useExtendConfig } from "./Config";

export { ConfigProvider as AddrethConfig } from "./Config";
export { THEMES } from "./theme";
export * from "./types";

export const Addreth = forwardRef(function Addreth(
  props: AddrethProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const config = useExtendConfig(props);
  return (
    <AddrethWrapped
      ref={ref}
      address={props.address}
      config={config}
    />
  );
});
