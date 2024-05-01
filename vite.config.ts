import * as path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: {
        index: path.resolve(__dirname, "src/index.ts"),
        ssc: path.resolve(__dirname, "src/ssc/index.ts"),
      },
      formats: ["cjs", "es"],
    },
  },
});
