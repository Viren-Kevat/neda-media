import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "spa-history-fallback",
      configureServer(server) {
        server.middlewares.use(historyFallbackMiddleware);
      },
      configurePreviewServer(server) {
        server.middlewares.use(historyFallbackMiddleware);
      }
    }
  ]
});

function historyFallbackMiddleware(req, _res, next) {
  if (req.method !== "GET" && req.method !== "HEAD") return next();
  const url = req.url?.split("?")[0] ?? "";
  if (!url || url.startsWith("/@") || url.startsWith("/node_modules") || url.startsWith("/src/")) return next();
  if (path.extname(url)) return next();
  req.url = "/index.html";
  next();
}
