import type { ReactNode } from "react";
import type { Address } from "./types";

import { createContext, useContext } from "react";

export type EnsHooks = {
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

export type EnsFetchSettings = {
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

export function useEnsResolved() {
  return useContext(EnsContext);
}

export function EnsResolver({
  address,
  children,
  fetchSettings,
  ensHooks,
}: {
  address: Address;
  children: ReactNode;
  fetchSettings: EnsFetchSettings;
  ensHooks: EnsHooks;
}) {
  const name = ensHooks.useEnsName?.({
    address,
    enabled: fetchSettings.name,
  }).data ?? null;

  const avatar = ensHooks.useEnsAvatar?.({
    name: name || "",
    enabled: Boolean(fetchSettings.avatar && name),
  }).data ?? null;

  return (
    <EnsContext.Provider value={{ avatar, name }}>
      {children}
    </EnsContext.Provider>
  );
}
