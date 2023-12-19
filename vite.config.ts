import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const getPath = (route: string) => path.resolve(__dirname, route);

export default defineConfig({
  base: "/fashion-landing-page/",
  resolve: {
    alias: {
      "@/layouts": getPath("./src/layouts"),
      "@/pages": getPath("./src/pages"),
      "@/components": getPath("./src/common/components"),
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
})
