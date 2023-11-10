import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import react from "@vitejs/plugin-react-swc";
import { transform as lightningcss } from "lightningcss";
import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

const entries = [
  "src/index.tsx",
  "src/index-no-wagmi.tsx",
];

const exports = [
  "index.js",
  "index-no-wagmi.js",
  "index.cjs.js",
  "index-no-wagmi.cjs.js",
];

export default defineConfig(({ mode }) => ({
  build: {
    outDir: "dist",
    brotliSize: true,
    target: ["es2020", "esnext"],
    lib: {
      entry: entries,
      formats: ["es", "cjs"],
      fileName: (format, entryName) => (
        `${entryName}.${format === "es" ? "js" : "cjs.js"}`
      ),
    },
    sourcemap: mode === "production" || "inline",
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime", "wagmi"],
    },
  },
  optimizeDeps: { entries },
  plugins: [
    dts({ insertTypesEntry: true }),
    vanillaExtractPlugin({
      identifiers: mode === "development" ? "debug" : "short",
      emitCssInSsr: true,
    }),
    {
      name: "inject-css",
      apply: "build",
      enforce: "post",
      async writeBundle(_, bundle) {
        if (!bundle["style.css"]) return;

        const { code: minifiedCss } = lightningcss({
          minify: true,
          filename: ".css",
          code: fs.readFileSync("dist/style.css"),
        });

        const injectCssCode =
          "\nif (typeof window !== \"undefined\") window._ADDRETH_CSS = "
          + JSON.stringify(minifiedCss.toString());

        // Append the CSS to each export
        exports.forEach((entry) => {
          if (!bundle[entry]) return;
          const filePath = path.join("dist", entry);
          fs.writeFileSync(
            filePath,
            fs.readFileSync(filePath, "utf-8") + injectCssCode,
          );
        });
      },
    },
    react(),
  ],
}));
