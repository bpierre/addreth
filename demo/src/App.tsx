import type { ReactNode } from "react";

import { css } from "goober";
import { useEffect, useState } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import { nord } from "react-syntax-highlighter/dist/esm/styles/prism";
import { configureChains, createConfig, mainnet, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { Addreth, AddrethConfig } from "../../src";
import { AddrethPopup } from "../../src/AddrethPopup";
import { RainbowAvatar } from "./RainbowAvatar";

SyntaxHighlighter.registerLanguage("tsx", tsx);
nord["pre[class*=\"language-\"]"] = {
  ...nord["pre[class*=\"language-\"]"],
  background: "#0a0a0a",
};

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
    `// The badge auto resizes as expected\n\n<Addreth\n  ens={false}\n  shortenAddress={6}\n/>`,
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
    "// Custom icon\n\n<Addreth\n  icon={(address) => (\n    <RainbowAvatar address={address} />\n  )}\n/>",
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
  [
    "// Popup (internal API)",
    <AddrethPopup
      address={ADDR1}
      show={true}
      explorer={{
        name: "Etherscan",
        accountUrl: `https://etherscan.io/address/${ADDR1}`,
      }}
    />,
  ],
  [
    "// Popup (internal API) with a long explorer name",
    <AddrethPopup
      address={ADDR1}
      show={true}
      explorer={{
        name: "Etherscan Etherscan Etherscan",
        accountUrl: `https://etherscan.io/address/${ADDR1}`,
      }}
    />,
  ],
];
/* eslint-enable react/jsx-key */

const { publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()],
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

export function App() {
  return (
    <WagmiConfig config={config}>
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "80px",
          minWidth: "320px",
          margin: "0 auto",
          padding: "80px",
          fontSize: "20px",
          fontFamily: "sans-serif",
          "@media (max-width: 600px)": {
            gap: "40px",
            padding: "40px 0",
          },
        })}
      >
        <div
          className={css({
            fontSize: "20px",
            textAlign: "center",
            userSelect: "none",
            "a": {
              color: "inherit",
            },
            "a:focus-visible": {
              outline: "2px solid currentColor",
              outlineOffset: "8px",
              borderRadius: "4px",
            },
            "h1": {
              margin: "0 0 10px",
              fontSize: "60px",
            },
            "p": {
              margin: "0",
            },
            "@media (max-width: 600px)": {
              fontSize: "16px",
              "h1": {
                fontSize: "40px",
              },
            },
          })}
        >
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
        <div
          className={css({
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(540px, 1fr))",
            gridAutoRows: "480px",
            justifyContent: "center",
            gap: "60px",
            width: "100%",
            margin: "0 auto",
            "@media (max-width: 600px)": {
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            },
          })}
        >
          {DEMOS.map((demo, index) => (
            <Demo
              key={index}
              demo={demo}
            />
          ))}
        </div>
      </div>
    </WagmiConfig>
  );
}

function Demo({
  demo,
}: {
  demo: Demo | ((darkMode: boolean) => Demo);
}) {
  const [darkMode, setDarkMode] = useState(false);
  const [code, children] = Array.isArray(demo) ? demo : demo(darkMode);

  // delay mounting the syntax highlighter to circumvent
  // a seemingly random bug where it renders as [object Object].
  const [mountCode, setMountCode] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMountCode(true), 0);
    return () => clearTimeout(t);
  }, []);

  return (
    <AddrethConfig
      font="Figtree"
      fontMono="Commit Mono"
      theme={darkMode ? "dark" : "light"}
    >
      <div
        className={css({
          overflowX: "auto",
          position: "relative",
          overflow: "hidden",
          display: "grid",
          gridAutoRows: "2.5fr 2fr",
          boxShadow: "0 0 24px rgb(0 0 0 / 0.2)",
          borderRadius: "8px",
          "@media (max-width: 600px)": {
            borderRadius: 0,
          },
        })}
      >
        <button
          onClick={() => {
            setDarkMode(!darkMode);
          }}
          className={css({
            appearance: "none",
            position: "absolute",
            zIndex: 2,
            top: "0",
            right: "0",
            display: "grid",
            placeItems: "center",
            width: "60px",
            height: "60px",
            padding: "0",
            fontSize: "24px",
            background: "none",
            border: "none",
            borderRadius: "20px",
            cursor: "pointer",
            "&:focus-visible": {
              outline: `2px solid ${darkMode ? "#f8f8f8" : "#0a0a0a"}`,
              outlineOffset: "-6px",
              borderRadius: "50%",
            },
          })}
        >
          <span>
            {darkMode ? "🌛" : "🌞"}
          </span>
        </button>
        <div
          className={css({
            position: "relative",
            background: darkMode ? "#0a0a0a" : "#f8f8f8",
            borderBottom: "2px solid #f8f8f8",
          })}
        >
          <div
            className={css({
              position: "absolute",
              inset: "40px",
              display: "grid",
              placeItems: "center",
            })}
          >
            {children}
          </div>
        </div>
        <div
          className={css({
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "14px",
            color: "#f8f8f8",
            background: "#0a0a0a",
          })}
        >
          {mountCode && (
            <SyntaxHighlighter language="tsx" style={nord}>
              {code}
            </SyntaxHighlighter>
          )}
        </div>
      </div>
    </AddrethConfig>
  );
}
