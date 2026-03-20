import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";

// export default defineConfig({
//   plugins: [
//     react(),
//     tsconfigPaths() // <-- подхватывает все alias из tsconfig.json
//   ]
// });

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths({
      projects: ["./tsconfig.app.json"]
    })
  ]
});
