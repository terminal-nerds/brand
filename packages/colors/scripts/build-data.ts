import path from "node:path";

import { Listr } from "listr2";

import { minifyJSONData } from "@workspace/helpers/json";

import {
	createColorsPaletteJSON,
	createPrimaryColorsJSON,
} from "./tasks/data/create-data";
import { saveJSONDataToFile } from "./tasks/data/save-to-file";

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

				saveJSONDataToFile(
					appendNewLine(context.colorsPaletteJSON),
					colorsPaletteFilePath,
				);
				task.output += `\n${colorsPaletteFilePath}\n`;
				saveJSONDataToFile(
					appendNewLine(context.primaryColorsJSON),
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

				saveJSONDataToFile(
					minifyJSONData(context.colorsPaletteJSON),
					colorsPaletteFilePath,
				);
				task.output += `\n${colorsPaletteFilePath}\n`;
				saveJSONDataToFile(
					minifyJSONData(context.primaryColorsJSON),
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

function appendNewLine(output: string) {
	return `${output}\n`;
}

try {
	await tasks.run();
} catch (error) {
	// eslint-disable-next-line no-console
	console.error(error);
}
