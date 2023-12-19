import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/styles*": path.resolve(__dirname, "./src/common/styles*"),
      "@/utils*": path.resolve(__dirname, "./src/common/utils*"),
      "@/components*": path.resolve(__dirname, "./src/common/components*"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
