import { PrimaryColorName, PRIMARY_COLORS, PRIMARY_COLOR_NAMES } from "$colors";
import type { PrimaryColorFunction } from "$colors";
import { COLOR_FUNCTIONS } from "$helpers/color-settings";
import { COLORS_PALETTE, COLORS_PALETTE_NAMES } from "$palette/index";
import type { PaletteColorSwatch, PaletteColorFunction } from "$palette/index";
import { COLOR_SWATCHES } from "$utils/ColorPalette";
import Case from "case";
import type { KebabCase } from "type-fest";

export function createColorsPaletteCSSContent() {
	const outputs = new Map<PaletteColorFunction, string>();

	for (const colorFunction of COLOR_FUNCTIONS) {
		for (const color of COLORS_PALETTE_NAMES) {
			const swatchesOutputs = new Set<string>();

			for (const swatch of COLOR_SWATCHES) {
				const parameters = COLORS_PALETTE[color].swatches.get(swatch);
				const name: PaletteColorSwatch = `${color}-${swatch}`;

				if (parameters) {
					swatchesOutputs.add(
						parameters.createCSSVariables(name, colorFunction),
					);
				} else {
					throw new Error(
						`"Color parameters not found for the swatch: "${swatch}"`,
					);
				}
			}

			outputs.set(
				`${color}_${colorFunction}`,
				[...swatchesOutputs].join("\n"),
			);
		}
	}

	return outputs;
}

export function createPrimaryColorsCSSContent() {
	const outputs = new Map<PrimaryColorFunction, string>();

	for (const colorFunction of COLOR_FUNCTIONS) {
		for (const name of PRIMARY_COLOR_NAMES) {
			const parameters = PRIMARY_COLORS[name];

			const fixedName = Case.kebab(name) as KebabCase<PrimaryColorName>;

			outputs.set(
				`${fixedName}_${colorFunction}`,
				parameters.createCSSVariables(fixedName, colorFunction),
			);
		}
	}

	return outputs;
}
