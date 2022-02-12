// import { PRIMARY_COLORS, PRIMARY_COLOR_NAMES } from "$colors";
import { COLOR_FUNCTIONS } from "$helpers/color-settings";
import { COLORS_PALETTE, COLORS_PALETTE_NAMES } from "$palette/index";
import { COLOR_SWATCHES } from "$utils/ColorPalette";

export function createColorCSSOutputs() {
	const outputs = new Map<string, string>();

	for (const colorFunction of COLOR_FUNCTIONS) {
		for (const color of COLORS_PALETTE_NAMES) {
			const swatchesOutputs = new Set<string>();

			for (const swatch of COLOR_SWATCHES) {
				const parameters = COLORS_PALETTE[color].swatches.get(swatch);
				const name = `${color}-${swatch}`;

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
				`${color}-${colorFunction}`,
				[...swatchesOutputs].join("\n\n"),
			);
		}
	}

	return outputs;
}
