import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    // 1. Allow the specific ngrok domain
    allowedHosts: ["agrobiologic-tifany-unappealingly.ngrok-free.dev"],
    // 2. Listen on all local network interfaces (crucial for ngrok/APK testing)
    host: true,
    // 3. Define the port
    port: 5173,

    // Optional: Fixes HMR (Auto-refresh) issues through ngrok tunnels
    // hmr: {
    //   clientPort: 443,
    //   protocol: "wss",
    // },
  },
});
