"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Addreth, AddrethConfig } from "addreth";
import Rand from "rand-seed";
import { createConfig, http, WagmiProvider } from "wagmi";
import { mainnet } from "wagmi/chains";
import styles from "./page.module.css";

const queryClient = new QueryClient();

const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
});

const rand = new Rand("1234");

const ADDRESSES = Array.from({ length: 60 }, () => {
  let address = "0x";
  const chars = "abcdef0123456789";
  for (let i = 0; i < 40; i++) {
    address += chars.charAt(Math.floor(rand.next() * chars.length));
  }
  return address as `0x${string}`;
});

export default function Home() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <main className={styles.main}>
          <AddrethConfig>
            {ADDRESSES.map((address) => (
              <Addreth
                key={address}
                address={address}
                theme="dark"
                fontMono="monospace"
              />
            ))}
          </AddrethConfig>
        </main>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
