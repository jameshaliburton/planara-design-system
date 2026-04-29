import { defineConfig } from "tsup";
import { copyFileSync } from "node:fs";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ["react", "react-dom", "next", "next/link", "next/image"],
  onSuccess: async () => {
    // Copy the CSS tokens to dist alongside the JS bundle
    copyFileSync("src/tokens.css", "dist/tokens.css");
  },
});
