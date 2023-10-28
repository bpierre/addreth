import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import react from "@vitejs/plugin-react-swc";
import { transform as lightningcss } from "lightningcss";
import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import dts from "vite-plugin-dts";

export default defineConfig(({ mode }) => ({
  build: {
    brotliSize: true,
    target: ["es2020", "esnext"],
    outDir: "dist",
    lib: {
      entry: "src/index.ts",
      formats: ["es", "cjs"],
      fileName: (format, entryName) => (
        format === "es"
          ? `${entryName}.js`
          : `${entryName}.${format}.js`
      ),
    },
    sourcemap: mode === "production" || "inline",
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime", "wagmi"],
    },
  },
  optimizeDeps: {
    entries: ["src/index.ts"],
  },
  plugins: [
    dts({ insertTypesEntry: true }),
    vanillaExtractPlugin({
      identifiers: mode === "development" ? "debug" : "short",
      emitCssInSsr: true,
    }),
    cssInjectedByJsPlugin({
      injectCode: (cssCode) => {
        const { code: cssCodeMinified } = lightningcss({
          minify: true,
          filename: ".css",
          code: Buffer.from(JSON.parse(cssCode)),
        });
        return (
          `if (typeof window !== "undefined") window._ADDRETH_CSS = ${
            JSON.stringify(cssCodeMinified.toString())
          }`
        );
      },
      topExecutionPriority: false,
    }),
    react(),
  ],
}));
