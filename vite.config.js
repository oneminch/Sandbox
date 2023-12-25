import WindiCSS from "vite-plugin-windicss";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [WindiCSS()],
	base: "/Playground/",
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, "index.html"),
				"css-tinker": resolve(__dirname, "css-tinker/index.html"),
				"drag-n-drop": resolve(__dirname, "drag-n-drop/index.html"),
				"landing-page": resolve(__dirname, "landing-page/index.html"),
				"random-jokes": resolve(__dirname, "random-jokes/index.html")
			}
		}
	}
});
