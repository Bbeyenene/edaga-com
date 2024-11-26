import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@okta/okta-signin-widget": "node_modules/@okta/okta-signin-widget",
    },
  },
});
