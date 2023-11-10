// This file is separated from Ens.tsx to prevent an bundling issue
// where the import("wagmi") was being kept in the non-wagmi bundle.
// Related issue: https://github.com/vitejs/vite/issues/12203

import type { ReactNode } from "react";
import type { EnsFetchSettings, EnsHooks } from "./Ens";
import type { Address } from "./types";

import { useEffect, useState } from "react";
import { EnsResolver } from "./Ens";

export function EnsWagmi({
  address,
  children,
  fetchSettings,
}: {
  address: Address;
  children: ReactNode;
  fetchSettings: EnsFetchSettings;
}) {
  const [ensHooks, setWagmiHooks] = useState<EnsHooks | null>(null);

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
    ensHooks
      ? (
        <EnsResolver
          address={address}
          fetchSettings={fetchSettings}
          ensHooks={ensHooks}
        >
          {children}
        </EnsResolver>
      )
      : children
  );
}
