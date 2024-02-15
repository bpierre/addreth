"use client";

import type { ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Addreth, AddrethConfig } from "addreth";
import { Highlight, themes } from "prism-react-renderer";
import { useState } from "react";
import { WagmiProvider } from "wagmi";
import { createConfig, http } from "wagmi";
import { mainnet } from "wagmi/chains";
import { commit, figtree } from "../fonts";
import styles from "./page.module.css";
import { RainbowAvatar } from "./RainbowAvatar";

const queryClient = new QueryClient();

const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
});

const ADDR1 = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

type Demo = [
  code: string,
  demo: ReactNode,
];

type DemoDeclaration =
  | Demo
  | ((darkMode: boolean) => Demo);

/* eslint-disable react/jsx-key */
const DEMOS: DemoDeclaration[] = [
  [
    "<Addreth />",
    <Addreth address={ADDR1} />,
  ],
  [
    "<Addreth ens={false} />",
    <Addreth
      address={ADDR1}
      ens={false}
    />,
  ],
  (darkMode) => [
    `// Theme: unified\n\n<Addreth theme="${
      darkMode ? "unified-dark" : "unified-light"
    }" />`,
    <Addreth
      address={ADDR1}
      theme={darkMode ? "unified-dark" : "unified-light"}
    />,
  ],
  (darkMode) => [
    `// Theme: simple\n\n<Addreth theme="${
      darkMode ? "simple-dark" : "simple-light"
    }" />`,
    <Addreth
      address={ADDR1}
      theme={darkMode ? "simple-dark" : "simple-light"}
    />,
  ],
  (darkMode) => {
    const blue1 = darkMode ? "hsl(210 40% 40%)" : "hsl(210 40% 80%)";
    const blue2 = darkMode ? "hsl(210 40% 80%)" : "hsl(210 40% 40%)";
    return [
      `// Theme: custom\n\n<Addreth
  theme={{
    base: "${darkMode ? "dark" : "light"}",
    // …
  }}
/>`,
      <Addreth
        address={ADDR1}
        theme={{
          base: "light",
          textColor: blue2,
          secondaryColor: blue2,
          badgeRadius: 8,
          focusColor: blue2,
          badgeHeight: 48,
          badgeGap: 0,
          badgePadding: 8,
          fontSize: 20,
          badgeLabelPadding: 8,
          badgeBackground: blue1,
          popupBackground: blue1,
          popupShadow: `0 0 0 4px ${blue2}`,
          popupRadius: 20,
        }}
      />,
    ];
  },
  [
    `// Keep the first and last 6 characters\n\n<Addreth\n  ens={false}\n  shortenAddress={6}\n/>`,
    <Addreth
      address={ADDR1}
      ens={false}
      shortenAddress={6}
    />,
  ],
  [
    `// Full address\n\n<Addreth\n  ens={false}\n  shortenAddress={false}\n/>`,
    <Addreth
      address={ADDR1}
      ens={false}
      shortenAddress={false}
    />,
  ],
  [
    `// The badge resizes as expected\n\n<div style={{ width: 200 }}>\n  <Addreth\n    ens={false}\n    shortenAddress={false}\n  />\n</div>`,
    <div style={{ width: 200 }}>
      <Addreth
        address={ADDR1}
        ens={false}
        shortenAddress={false}
      />
    </div>,
  ],
  [
    `// A maximum width can be set\n\n<Addreth maxWidth={160} />`,
    <div>
      <Addreth
        address={ADDR1}
        maxWidth={160}
      />
    </div>,
  ],
  [
    "// Custom label\n\n<Addreth\n  label={(address) => \"Vitalik Buterin\"}\n/>",
    <Addreth
      address={ADDR1}
      label={() => "Vitalik Buterin"}
    />,
  ],
  [
    "// Always show the identicon\n\n<Addreth icon=\"identicon\" />",
    <Addreth
      address={ADDR1}
      icon="identicon"
    />,
  ],
  [
    "// No icon\n\n<Addreth icon={false} />",
    <Addreth
      address={ADDR1}
      icon={false}
    />,
  ],
  [
    "// Rainbow style icon\n\n<Addreth\n  icon={(address) => (\n    <RainbowAvatar address={address} />\n  )}\n/>",
    <Addreth
      address={ADDR1}
      icon={(address) => <RainbowAvatar address={address} />}
    />,
  ],
  [
    "// Custom explorer\n\n<Addreth\n  explorer={(address) => ({\n    name: \"Base\",\n    url: `https://basescan.org/address/${address}`,\n  })}\n/>",
    <Addreth
      address={ADDR1}
      explorer={(address) => ({
        name: "Base",
        accountUrl: `https://basescan.org/address/${address}`,
      })}
    />,
  ],
  [
    "// Only show the explorer button\n\n<Addreth actions=\"explorer\" />",
    <Addreth
      address={ADDR1}
      actions="explorer"
    />,
  ],
  [
    "// Only show the copy button\n\n<Addreth actions=\"copy\" />",
    <Addreth
      address={ADDR1}
      actions="copy"
    />,
  ],
  [
    "// No badge actions\n\n<Addreth actions=\"none\" />",
    <Addreth
      address={ADDR1}
      actions="none"
    />,
  ],
  [
    "<Addreth uppercase />",
    <Addreth
      address={ADDR1}
      uppercase={true}
    />,
  ],
  (darkMode) => [
    "// Link style\n\n<Addreth\n  ens={false}\n  actions=\"none\"\n  underline={true}\n  theme=\"simple-light\"\n/>",
    <Addreth
      actions="none"
      address={ADDR1}
      ens={false}
      theme={darkMode ? "simple-dark" : "simple-light"}
      underline={true}
    />,
  ],
  (darkMode) => {
    const base = darkMode ? "simple-dark" : "simple-light";
    return [
      `// Text button style\n\n<Addreth\n  ens={false}\n  actions="none"\n  theme={{ base: "${base}", radius: 4 }}\n/>`,
      <Addreth
        actions="none"
        address={ADDR1}
        ens={false}
        theme={{ base, badgeRadius: 4 }}
      />,
    ];
  },
];
/* eslint-enable react/jsx-key */

export default function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <AddrethConfig
          font={figtree.style.fontFamily}
          fontMono={commit.style.fontFamily}
        >
          <div className={styles.main}>
            <div className={styles.header}>
              <h1>
                addreth examples
              </h1>
              <p>
                <a
                  href="https://github.com/bpierre/addreth"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  github.com/bpierre/addreth
                </a>
              </p>
            </div>
            <div className={styles.demos}>
              {DEMOS.map((demo, index) => (
                <Demo
                  key={index}
                  demo={demo}
                />
              ))}
            </div>
          </div>
        </AddrethConfig>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

function Demo({
  demo,
}: {
  demo: Demo | ((darkMode: boolean) => Demo);
}) {
  const [darkMode, setDarkMode] = useState(false);
  const [code, children] = Array.isArray(demo) ? demo : demo(darkMode);
  return (
    <div className={styles.demo}>
      <button
        className={darkMode ? styles.darkButton : styles.lightButton}
        onClick={() => {
          setDarkMode(!darkMode);
        }}
      >
        <span>
          {darkMode ? "🌛" : "🌞"}
        </span>
      </button>
      <div
        className={styles.demoArea}
        style={{
          background: darkMode ? "#0a0a0a" : "#f8f8f8",
        }}
      >
        <div>
          <AddrethConfig theme={darkMode ? "dark" : "light"}>
            {children}
          </AddrethConfig>
        </div>
      </div>
      <div className={styles.demoCode}>
        <Highlight
          theme={themes.jettwaveDark}
          code={code}
          language="tsx"
        >
          {({ style, tokens, getLineProps, getTokenProps }) => (
            <pre style={{ ...style, backgroundColor: "transparent" }}>
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}
