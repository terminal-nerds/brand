import type { ColorParameters } from "$utils/ColorParameters";

export const COLOR_SWATCHES = [
	50, 100, 200, 300, 400, 500, 600, 700, 800, 900,
] as const;
export type ColorSwatch = typeof COLOR_SWATCHES[number];
export type ColorSwatches = Map<ColorSwatch, ColorParameters>;

export class ColorPalette {
	public name: string;
	public swatches: ColorSwatches;

	constructor(name: string, swatches: ColorSwatches) {
		this.name = name;
		this.swatches = swatches;
	}

	toJSON() {
		const map = new Map();

		for (const [swatch, parameters] of this.swatches) {
			map.set(swatch, JSON.parse(parameters.toJSON()));
		}

		return JSON.stringify(Object.fromEntries(map));
	}
}
