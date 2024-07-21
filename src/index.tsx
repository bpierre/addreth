import type { ForwardedRef } from "react";
import type { AddrethProps } from "./Addreth";

import { forwardRef, useMemo } from "react";
import { useEnsAvatar, useEnsName } from "wagmi";
import { Addreth as AddrethWrapped } from "./Addreth";
import { useExtendConfig } from "./AddrethConfig";

export { AddrethConfig } from "./AddrethConfig";
export { THEMES } from "./theme";
export * from "./types";

export const Addreth = forwardRef(function Addreth(
  props: AddrethProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const config = useExtendConfig(props);

  const { data: name } = useEnsName({
    address: props.address,
    query: {
      enabled: config.label === "ens",
    },
  });

  const { data: avatar } = useEnsAvatar({
    name: name || "",
    query: {
      enabled: Boolean(name && config.icon === "ens"),
    },
  });

  const ens = useMemo(() => ({
    avatar: avatar ?? null,
    name: name ?? null,
  }), [avatar, name]);

  return (
    <AddrethWrapped
      ref={ref}
      address={props.address}
      config={config}
      ens={ens}
    />
  );
});
