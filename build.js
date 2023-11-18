import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import react from "@vitejs/plugin-react-swc";
import fs from "node:fs";
import path from "node:path";
import { build } from "vite";
import dts from "vite-plugin-dts";

const outDir = "dist";

async function bundle({
  emptyOutDir = true,
  entries = [],
  formats = [],
  plugins = [],
  rename = (name) => name,
}) {
  return build({
    build: {
      emptyOutDir,
      outDir,
      target: ["es2020", "esnext"],
      lib: {
        entry: entries,
        formats,
        fileName: (format, entryName) => (
          `${entryName}${format === "cjs" ? ".cjs.js" : ".js"}`
        ),
      },
      sourcemap: true,
      rollupOptions: {
        external: ["react", "react-dom", "react/jsx-runtime", "wagmi"],
        output: {
          assetFileNames: ({ name }) => rename(name),
        },
      },
    },
    optimizeDeps: { entries },
    plugins: [
      dts({ insertTypesEntry: true }),
      react(),
      ...plugins,
    ],
  });
}

// we build twice: first to collect the styles, then to inject them
let collectedCssCode = "";

console.log("\nCollecting styles…\n");
await bundle({
  emptyOutDir: true,
  entries: ["src/index.tsx"],
  formats: ["es"],
  plugins: [
    vanillaExtractPlugin({ identifiers: "short" }),
    {
      name: "collect-css",
      enforce: "post",
      async writeBundle(_, bundle) {
        if (bundle["index.css"]?.type === "asset") {
          collectedCssCode = JSON.stringify(
            String(bundle["index.css"].source),
          ).slice(1, -1); // remove quotes
        }
      },
    },
  ],
  rename: (name) => name === "style.css" ? "index.css" : name,
});

console.log("\nBundling for ES + CJS…\n");
await bundle({
  emptyOutDir: false,
  entries: [
    "src/index.tsx",
    "src/index-no-wagmi.tsx",
  ],
  formats: ["es", "cjs"],
  plugins: [
    vanillaExtractPlugin({ identifiers: "short" }),
    {
      name: "inject-css",
      transform: (code) => ({
        code: code.replace("__ADDRETH_CSS__", collectedCssCode),
        map: null,
      }),
    },
    {
      name: "use-client",
      enforce: "post",
      writeBundle(_, bundle) {
        for (const [fileName, entry] of Object.entries(bundle)) {
          // add "use client" to JS files
          if (entry.type === "chunk" && fileName.endsWith(".js")) {
            fs.writeFileSync(
              path.resolve(outDir, fileName),
              "\"use client\"\n\n" + entry.code,
            );
          }
        }
      },
    },
  ],
});

// remove dist/style.css (replaced by dist/index.css)
fs.rmSync(path.resolve(outDir, "style.css"));
