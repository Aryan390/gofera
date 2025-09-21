import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      includeAssets: ["robots.txt", "favicon.ico", "apple-touch-icon.png"],
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        navigateFallbackDenylist: [/^\/api\//],
        runtimeCaching: [
          {
            // app shell & chunks
            urlPattern: ({ url }) =>
              url.origin === self.location.origin &&
              url.pathname.startsWith("/assets/"),
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "static-assets",
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
          {
            // images
            urlPattern: ({ url }) =>
              url.origin === self.location.origin &&
              /\.(?:png|jpg|jpeg|gif|svg|webp)$/.test(url.pathname),
            handler: "CacheFirst",
            options: {
              cacheName: "image-cache",
              expiration: { maxEntries: 150, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // GET API (e.g., /api/*)
            urlPattern: ({ url }) => url.pathname.startsWith("/api/"),
            handler: "NetworkFirst",
            method: "GET",
            options: {
              cacheName: "api-cache",
              networkTimeoutSeconds: 3, // Why: avoids long hangs when offline
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
      manifest: {
        name: "Gofera",
        short_name: "Gofera",
        description: "Ride sharing app",
        start_url: "/",
        display: "standalone",
        background_color: "#0b0f19",
        theme_color: "#0ea5e9",
        icons: [
          // { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          // { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          // { src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
          {
            src: "/icons/manifest-icon-192.maskable.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/manifest-icon-192.maskable.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/icons/manifest-icon-512.maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/manifest-icon-512.maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
  // build: {
  //   rollupOptions: {
  //     output: {
  //       // Use a function to group modules by path
  //       manualChunks(id) {
  //         if (id.includes("node_modules")) {
  //           if (id.includes("/react/") || id.includes("react-dom"))
  //             return "react";
  //           if (id.includes("/three/")) return "three";
  //           if (id.includes("/postprocessing/")) return "postprocessing";
  //         }
  //       },
  //     },
  //   },
  //   // optional: only if you still see warnings
  //   // chunkSizeWarningLimit: 900,
  // },
});
