import fs from "node:fs";
import path from "node:path";

import fg from "fast-glob";
import parcelCSS from "@parcel/css";

export function minifyCSSOutputs(inputDirectory: string) {
	const files = fg.sync([path.join(inputDirectory, "./**/*.css")]);

	for (const file of files) {
		const { code } = parcelCSS.transform({
			code: fs.readFileSync(file),
			filename: file,
			minify: true,
			sourceMap: false,
		});

		fs.writeFileSync(file, code);
	}
}
