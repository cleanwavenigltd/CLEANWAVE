import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  server: {
    host: true,
    middlewareMode: false,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-redux": ["@reduxjs/toolkit", "react-redux"],
          "vendor-routing": ["react-router-dom"],
          "vendor-ui": ["lucide-react", "recharts"],
          "vendor-other": ["axios", "framer-motion", "jwt-decode"],
        },
        chunkFileNames: "js/[name]-[hash].js",
        entryFileNames: "js/[name]-[hash].js",
      },
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
      },
    },
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    cssCodeSplit: true,
    chunkSizeWarningLimit: 200,
  },
  optimizeDeps: {
    include: [
      "@reduxjs/toolkit",
      "react-redux",
      "react-router-dom",
      "axios",
      "jwt-decode",
    ],
  },
});
