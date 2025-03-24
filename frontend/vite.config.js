import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default defineConfig({
  plugins: [react()], // This plugin handles JSX transformation.
  resolve: {
    alias: {
      services: path.resolve(__dirname, "src/services"),
      models: path.resolve(__dirname, "src/models"),
      components: path.resolve(__dirname, "src/components"),
    },
  },
});
