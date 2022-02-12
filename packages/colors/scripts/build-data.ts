import path from "node:path";

import { Listr } from "listr2";

import {
	createColorsPaletteJSON,
	createPrimaryColorsJSON,
} from "./tasks/data/create-json-data";
import { saveJSONDataToFile } from "./tasks/data/save-json-to-files";

const OUTPUT_DIRECTORY = path.join(process.cwd(), "./dist/data");

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
					OUTPUT_DIRECTORY,
					"colors-palette.json",
				);
				const primaryColorsFilePath = path.join(
					OUTPUT_DIRECTORY,
					"primary-colors.json",
				);

				saveJSONDataToFile(
					context.colorsPaletteJSON,
					colorsPaletteFilePath,
				);
				task.output += `\n${colorsPaletteFilePath}\n`;
				saveJSONDataToFile(
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
