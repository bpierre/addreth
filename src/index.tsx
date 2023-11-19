import type { ForwardedRef } from "react";
import type { AddrethProps } from "./Addreth";

import { forwardRef } from "react";
import { Addreth as AddrethWrapped } from "./Addreth";
import { useExtendConfig } from "./AddrethConfig";
import { EnsWagmi } from "./EnsWagmi";

export { AddrethConfig } from "./AddrethConfig";
export { THEMES } from "./theme";
export * from "./types";

export const Addreth = forwardRef(function Addreth(
  props: AddrethProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const config = useExtendConfig(props);
  return (
    <EnsWagmi
      address={props.address}
      fetchSettings={{
        avatar: config.icon === "ens",
        name: config.label === "ens",
      }}
    >
      <AddrethWrapped
        ref={ref}
        address={props.address}
        config={config}
      />
    </EnsWagmi>
  );
});
