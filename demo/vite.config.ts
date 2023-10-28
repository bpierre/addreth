import type { PluginOption } from "vite";

import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => ({
  build: {
    minify: false,
  },
  plugins: [
    react(),
    vanillaExtractPlugin({
      identifiers: mode === "development" ? "debug" : "short",
    }),
  ] satisfies PluginOption[],
}));
