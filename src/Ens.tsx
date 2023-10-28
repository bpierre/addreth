import type { ReactNode } from "react";
import type { Address } from "./types";

import { createContext, useContext, useEffect, useState } from "react";

type WagmiHooks = {
  useEnsAvatar:
    | null
    | ((params: { name: string | null; enabled: boolean }) => {
      data: string | null | undefined;
    });
  useEnsName:
    | null
    | ((params: { address: Address; enabled: boolean }) => {
      data: string | null | undefined;
    });
};

type WagmiFetch = {
  avatar: boolean;
  name: boolean;
};

export const EnsContext = createContext<{
  avatar: string | null;
  name: string | null;
}>({
  avatar: null,
  name: null,
});

export function Ens({
  address,
  children,
  fetch,
}: {
  address: Address;
  children: ReactNode;
  fetch: WagmiFetch;
}) {
  const [wagmiHooks, setWagmiHooks] = useState<WagmiHooks | null>(null);

  useEffect(() => {
    let cancelled = false;
    import("wagmi").then(
      (wagmi) => {
        if (!cancelled) {
          setWagmiHooks(wagmi);
        }
      },
      () => {
        if (!cancelled) {
          // no wagmi
          setWagmiHooks(null);
        }
      },
    );
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    wagmiHooks
      ? (
        <EnsResolver
          address={address}
          fetch={fetch}
          wagmiHooks={wagmiHooks}
        >
          {children}
        </EnsResolver>
      )
      : children
  );
}

export function useEnsResolved() {
  return useContext(EnsContext);
}

function EnsResolver({
  address,
  children,
  fetch,
  wagmiHooks,
}: {
  address: Address;
  children: ReactNode;
  fetch: WagmiFetch;
  wagmiHooks: WagmiHooks;
}) {
  const name = wagmiHooks.useEnsName?.({
    address,
    enabled: fetch.name,
  }).data ?? null;

  const avatar = wagmiHooks.useEnsAvatar?.({
    name: name || "",
    enabled: Boolean(fetch.avatar && name),
  }).data ?? null;

  return (
    <EnsContext.Provider value={{ avatar, name }}>
      {children}
    </EnsContext.Provider>
  );
}
