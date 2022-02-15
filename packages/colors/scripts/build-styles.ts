import path from "node:path";

import { Listr } from "listr2";

import type { ColorFunction } from "$helpers/color-settings";

import {
	createColorsPaletteCSSContent,
	createPrimaryColorsCSSContent,
} from "./tasks/styles/create-content";
import { saveOutputToFile } from "./tasks/shared/save-to-file";
import {
	createColorsPaletteImports,
	createPrimaryColorsImports,
} from "./tasks/styles/create-imports";
import { processSourceCSS } from "./tasks/styles/process-source";
import type { PaletteColorFunction } from "$palette/index";

const OUTPUT_DIRECTORIES = {
	dist: {
		colorsPalette: path.join(process.cwd(), "./dist/styles/palette"),
		primaryColors: path.join(process.cwd(), "./dist/styles/primary"),
	},
	source: {
		colorsPalette: path.join(process.cwd(), "./source/styles/palette"),
		primaryColors: path.join(process.cwd(), "./source/styles/primary"),
	},
};

interface Context {
	colorsPalette: {
		content: Map<PaletteColorFunction, string>;
		imports: Map<ColorFunction, string>;
	};
	primaryColors: {
		content: Map<string, string>;
		imports: Map<string, string>;
	};
}

const tasks = new Listr<Context>(
	[
		{
			title: "Create CSS files content for every primary color and color swatch in palette...",
			task: async (context, task): Promise<void> => {
				context.colorsPalette.content = createColorsPaletteCSSContent();
				context.primaryColors.content = createPrimaryColorsCSSContent();
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

				for (const [fileName, output] of context.colorsPalette
					.content) {
					const [colorName, colorFunction] = fileName.split("-");
					const filePath = path.join(
						OUTPUT_DIRECTORIES.source.colorsPalette,
						`${colorName}`,
						`${colorFunction}.css`,
					);

					saveOutputToFile(output, filePath);
					task.output += `\n${filePath}`;
				}

				for (const [fileName, output] of context.primaryColors
					.content) {
					const [colorName, colorFunction] = fileName.split("-");
					const filePath = path.join(
						OUTPUT_DIRECTORIES.source.primaryColors,
						`${colorName}`,
						`${colorFunction}.css`,
					);

					saveOutputToFile(output, filePath);
					task.output += `\n${filePath}`;
				}
			},
			options: {
				bottomBar: false,
				persistentOutput: true,
			},
		},
		{
			title: "Create CSS import files...",
			task: async (context, task): Promise<void> => {
				context.colorsPalette.imports = createColorsPaletteImports();
				context.primaryColors.imports = createPrimaryColorsImports();
				task.output = "Done!";
			},
			options: {
				bottomBar: false,
				persistentOutput: true,
			},
		},
		{
			title: "Save imports CSS content into files...",
			task: async (context, task): Promise<void> => {
				task.output = "Files:\n";

				for (const [colorFunction, output] of context.colorsPalette
					.imports) {
					const filePath = path.join(
						OUTPUT_DIRECTORIES.source.colorsPalette,
						`${colorFunction}.css`,
					);

					saveOutputToFile(output, filePath);
					task.output += `\n${filePath}`;
				}

				for (const [colorFunction, output] of context.primaryColors
					.imports) {
					const filePath = path.join(
						OUTPUT_DIRECTORIES.source.primaryColors,
						`${colorFunction}.css`,
					);

					saveOutputToFile(output, filePath);
					task.output += `\n${filePath}`;
				}
			},
			options: {
				bottomBar: false,
				persistentOutput: true,
			},
		},
		{
			title: "Process CSS files into distributable directory...",
			task: async (_, task): Promise<void> => {
				await processSourceCSS(
					OUTPUT_DIRECTORIES.source.colorsPalette,
					OUTPUT_DIRECTORIES.dist.colorsPalette,
				);
				await processSourceCSS(
					OUTPUT_DIRECTORIES.source.primaryColors,
					OUTPUT_DIRECTORIES.dist.primaryColors,
				);

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
	await tasks.run({
		colorsPalette: {
			content: new Map(),
			imports: new Map(),
		},
		primaryColors: {
			content: new Map(),
			imports: new Map(),
		},
	});
} catch (error) {
	// eslint-disable-next-line no-console
	console.error(error);
}
