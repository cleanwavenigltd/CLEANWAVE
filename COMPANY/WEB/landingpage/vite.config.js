import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Lightweight optimization for landing page to reduce initial bundle
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
  build: {
    minify: "esbuild",
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          "vendor-ui": ["framer-motion", "lucide-react"],
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
      },
    },
  },
}));
