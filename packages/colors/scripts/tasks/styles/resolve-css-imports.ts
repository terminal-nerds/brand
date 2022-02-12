import fs from "node:fs";
import path from "node:path";

import fg from "fast-glob";
import postCSS from "postcss";
import atImport from "postcss-import";

export async function resolveCSSImports(inputDirectory: string) {
	const files = fg.sync([path.join(inputDirectory, "./*.css")]);

	for (const file of files) {
		const content = fs.readFileSync(file);

		const results = await postCSS().use(atImport()).process(content, {
			from: file,
		});

		const output = results.css
			.replace(/:root {/g, (match, index, matches) => {
				return matches.indexOf(match) === index ? match : "";
			})
			.replace(/}/g, (match, index, matches) => {
				return matches.lastIndexOf(match) === index ? match : "";
			})
			.replace(/\n{3}/g, "\n");

		fs.writeFileSync(file, output);
	}
}
