// https://tsup.egoist.sh/

import { defineConfig } from "tsup";

export default defineConfig({
	clean: true,
	dts: true,
	entry: ["source/**/*"],
	format: ["esm"],
	minify: true,
	noExternal: ["@workspace/helpers"],
	sourcemap: true,
	splitting: true,
	target: ["esnext"],
});
