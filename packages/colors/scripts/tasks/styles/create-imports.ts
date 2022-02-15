import { PRIMARY_COLOR_NAMES } from "$colors";
import { ColorFunction, COLOR_FUNCTIONS } from "$helpers/color-settings";
import { COLORS_PALETTE_NAMES } from "$palette/index";

function setImport(name: string, colorFunction: ColorFunction) {
	return `@import "./${name}/${colorFunction}.css"`;
}

function wrapOutput(output: Set<string>) {
	const content = [...output].join(";\n");

	return `${content};`;
}

export function createColorsPaletteImports() {
	const outputs = new Map<ColorFunction, string>();

	for (const colorFunction of COLOR_FUNCTIONS) {
		const imports = new Set<string>();

		for (const name of COLORS_PALETTE_NAMES) {
			imports.add(setImport(name, colorFunction));
		}

		outputs.set(colorFunction, wrapOutput(imports));
	}

	return outputs;
}

export function createPrimaryColorsImports() {
	const outputs = new Map<ColorFunction, string>();

	for (const colorFunction of COLOR_FUNCTIONS) {
		const imports = new Set<string>();

		for (const name of PRIMARY_COLOR_NAMES) {
			imports.add(setImport(name, colorFunction));
		}

		outputs.set(colorFunction, wrapOutput(imports));
	}

	return outputs;
}
