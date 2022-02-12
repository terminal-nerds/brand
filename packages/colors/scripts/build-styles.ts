import path from "node:path";

import { Listr } from "listr2";

import type { ColorFunction } from "$helpers/color-settings";

import { createColorCSSOutputs } from "./tasks/styles/create-css-content";
import { saveCSSOutputToFile } from "./tasks/styles/save-css-to-files";
import { wrapCSSOutputsInFile } from "./tasks/styles/wrap-css-outputs";
import { resolveCSSImports } from "./tasks/styles/resolve-css-imports";
import { minifyCSSOutputs } from "./tasks/styles/minify-css-outputs";

const OUTPUT_DIRECTORY = path.join(process.cwd(), "./dist/styles");

interface Context {
	colorsOutputs: Map<string, string>;
	indexOutputs: Map<ColorFunction, string>;
}

const tasks = new Listr<Context>(
	[
		{
			title: "Create CSS files with variables for every color and its function...",
			task: async (context, task): Promise<void> => {
				context.colorsOutputs = createColorCSSOutputs();
				task.output = "Done!";
			},
			options: {
				bottomBar: false,
				persistentOutput: true,
			},
		},
		{
			title: "Save colors CSS outputs into files...",
			task: async (context, task): Promise<void> => {
				task.output = "Files:\n";

				for (const [fileName, output] of context.colorsOutputs) {
					const [colorName, colorFunction] = fileName.split("-");
					const filePath = path.join(
						OUTPUT_DIRECTORY,
						`${colorName}`,
						`${colorFunction}.css`,
					);

					saveCSSOutputToFile(output, filePath);
					task.output += `\n${filePath}`;
				}
			},
			options: {
				bottomBar: false,
				persistentOutput: true,
			},
		},
		{
			title: "Wrap CSS color functions files into one index content...",
			task: async (context, task): Promise<void> => {
				context.indexOutputs = wrapCSSOutputsInFile();
				task.output = "Done!";
			},
			options: {
				bottomBar: false,
				persistentOutput: true,
			},
		},
		{
			title: "Save wrapped CSS index content into files...",
			task: async (context, task): Promise<void> => {
				task.output = "Files:\n";

				for (const [colorFunction, output] of context.indexOutputs) {
					const filePath = path.join(
						OUTPUT_DIRECTORY,
						`${colorFunction}.css`,
					);

					saveCSSOutputToFile(output, filePath);
					task.output += `\n${filePath}`;
				}
			},
			options: {
				bottomBar: false,
				persistentOutput: true,
			},
		},
		{
			title: "Resolve CSS imports...",
			task: async (_, task): Promise<void> => {
				await resolveCSSImports(OUTPUT_DIRECTORY);

				task.output = "Done!";
			},
			options: {
				bottomBar: false,
				persistentOutput: true,
			},
		},
		{
			title: "Minify CSS files...",
			task: async (_, task): Promise<void> => {
				minifyCSSOutputs(OUTPUT_DIRECTORY);

				task.output = "Done!";
			},
			options: {
				bottomBar: false,
				persistentOutput: true,
			},
		},
	],
	{
		rendererOptions: {
			clearOutput: false,
			collapse: true,
			collapseSkips: false,
		},
	},
);

try {
	await tasks.run();
} catch (error) {
	// eslint-disable-next-line no-console
	console.error(error);
}
