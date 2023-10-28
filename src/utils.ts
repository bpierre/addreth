import type { Address } from "./types";

export function shortenAddress(address: Address, chars: number) {
  return address.length < chars * 2 + 2
    ? address
    : address.slice(0, chars + 2) + "…" + address.slice(-chars);
}

export const externalLinkAttributes = {
  rel: "noopener noreferrer",
  target: "_blank",
};
