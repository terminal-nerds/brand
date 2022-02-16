import path from "node:path";

import fg from "fast-glob";
import fse from "fs-extra";

import postCSS from "postcss";
import atImport from "postcss-import";
import cssnano from "cssnano";

export async function processSourceCSS(
	inputDirectory: string,
	outputDirectory: string,
) {
	const inputFiles = fg.sync([path.join(inputDirectory, "**/*.css")]);

	for (const file of inputFiles) {
		const content = fse.readFileSync(file);
		const outputFilePath = file.replace(
			new RegExp(inputDirectory),
			outputDirectory,
		);

		const results = await postCSS()
			.use(atImport())
			.use(cssnano)
			.process(content, {
				from: file,
				to: outputFilePath,
				map: {
					annotation: true,
					inline: false,
				},
			});

		fse.outputFileSync(outputFilePath, results.css);

		if (results.map) {
			fse.outputFileSync(
				`${results.opts.to}.map`,
				results.map.toString(),
			);
		}
	}
}
