import tailwindcss from "@tailwindcss/vite";
import { nitroV2Plugin } from "@tanstack/nitro-v2-vite-plugin";
import { devtools } from "@tanstack/react-devtools/vite-plugin";
import { tanstackStart } from "@tanstack/start/plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ command }) => ({
  server: { port: 3000, host: "0.0.0.0" },
  ssr: {
    external: ["better-auth"],
  },
  plugins: [
    devtools(),
    mkcert(),
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart(),
    nitroV2Plugin({
      preset: "node-server",
      externals: { inline: ["srvx", "react-dom"] },
    }),
    react(),
  ],
}));
