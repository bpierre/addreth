import type { Address } from "./types";

import { useEnsAvatar, useEnsName } from "wagmi";

export function useEnsResolved({
  address,
  fetchSettings,
}: {
  address: Address;
  fetchSettings: {
    avatar: boolean;
    name: boolean;
  };
}) {
  const name = useEnsName({
    address,
    query: {
      enabled: fetchSettings.name,
    },
  }).data ?? null;

  const avatar = useEnsAvatar({
    name: name || "",
    query: {
      enabled: Boolean(fetchSettings.avatar && name),
    },
  }).data ?? null;

  return {
    avatar,
    name,
  };
}
