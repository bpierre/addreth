"use client";

import { Addreth, AddrethConfig } from "addreth";
import Rand from "rand-seed";
import { configureChains, createConfig, mainnet, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import styles from "./page.module.css";
import "addreth/styles.css";

const rand = new Rand("1234");

const ADDRESSES_COUNT = 60;

const ADDRESSES = Array.from({ length: ADDRESSES_COUNT }, () => {
  let address = "0x";
  const chars = "abcdef0123456789";
  for (let i = 0; i < 40; i++) {
    address += chars.charAt(Math.floor(rand.next() * chars.length));
  }
  return address as `0x${string}`;
});

const { publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()],
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

export default function Home() {
  return (
    <WagmiConfig config={config}>
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
    </WagmiConfig>
  );
}
