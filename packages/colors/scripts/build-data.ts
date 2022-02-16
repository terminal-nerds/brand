import path from "node:path";

import { Listr } from "listr2";

import { minifyJSON } from "@workspace/helpers/json";

import {
	createColorsPaletteJSON,
	createPrimaryColorsJSON,
} from "./tasks/data/create-data";
import { saveOutputToFile } from "./tasks/shared/save-to-file";

const OUTPUT_DIRECTORIES = {
	dist: path.join(process.cwd(), "./dist/data"),
	source: path.join(process.cwd(), "./source/data"),
};

interface Context {
	colorsPaletteJSON: string;
	primaryColorsJSON: string;
}

const tasks = new Listr<Context>(
	[
		{
			title: "Create JSON data for the colors...",
			task: async (context, task): Promise<void> => {
				context.colorsPaletteJSON = createColorsPaletteJSON();
				context.primaryColorsJSON = createPrimaryColorsJSON();
				task.output = "Done!";
			},
			options: {
				bottomBar: false,
				persistentOutput: true,
			},
		},
		{
			title: "Save colors JSON data into files...",
			task: async (context, task): Promise<void> => {
				task.output = "Output:\n";

				const colorsPaletteFilePath = path.join(
					OUTPUT_DIRECTORIES.source,
					"colors-palette.json",
				);
				const primaryColorsFilePath = path.join(
					OUTPUT_DIRECTORIES.source,
					"primary-colors.json",
				);

				saveOutputToFile(
					context.colorsPaletteJSON,
					colorsPaletteFilePath,
				);
				task.output += `\n${colorsPaletteFilePath}\n`;
				saveOutputToFile(
					context.primaryColorsJSON,
					primaryColorsFilePath,
				);
				task.output += `\n${primaryColorsFilePath}`;
			},
			options: {
				bottomBar: false,
				persistentOutput: true,
			},
		},
		{
			title: "Minify data outputs into distributable directory...",
			task: async (context, task): Promise<void> => {
				task.output = "Output:\n";

				const colorsPaletteFilePath = path.join(
					OUTPUT_DIRECTORIES.dist,
					"colors-palette.json",
				);
				const primaryColorsFilePath = path.join(
					OUTPUT_DIRECTORIES.dist,
					"primary-colors.json",
				);

				saveOutputToFile(
					minifyJSON(context.colorsPaletteJSON),
					colorsPaletteFilePath,
				);
				task.output += `\n${colorsPaletteFilePath}\n`;

				saveOutputToFile(
					minifyJSON(context.primaryColorsJSON),
					primaryColorsFilePath,
				);
				task.output += `\n${primaryColorsFilePath}`;
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
