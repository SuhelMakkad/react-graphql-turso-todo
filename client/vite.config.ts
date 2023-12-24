import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const getPath = (route: string) => path.resolve(__dirname, route);

export default defineConfig({
  resolve: {
    alias: {
      "@/layouts": getPath("./src/layouts"),
      "@/pages": getPath("./src/pages"),
      "@/components": getPath("./src/common/components"),
      "@/graphql": getPath("./src/common/graphql"),
      "@/hooks": getPath("./src/common/hooks"),
      "@/styles": getPath("./src/common/styles"),
      "@/utils": getPath("./src/common/utils"),
      "@/store": getPath("./src/common/store"),
      "@/assets": getPath("./src/assets"),
      "@/": getPath("./src"),
      "@": getPath("./src"),
    },
  },
  plugins: [react()],
});
