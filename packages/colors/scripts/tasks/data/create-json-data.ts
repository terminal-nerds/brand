import { PRIMARY_COLORS, PRIMARY_COLOR_NAMES } from "$colors";
import { COLORS_PALETTE, COLORS_PALETTE_NAMES } from "$palette/index";

export function createColorsPaletteJSON() {
	const data = [...COLORS_PALETTE_NAMES].map((name) => {
		return [name, JSON.parse(COLORS_PALETTE[name].toJSON())];
	});
	return JSON.stringify(Object.fromEntries(data));
}

export function createPrimaryColorsJSON() {
	const data = [...PRIMARY_COLOR_NAMES].map((name) => {
		return [name, JSON.parse(PRIMARY_COLORS[name].toJSON())];
	});

	return JSON.stringify(Object.fromEntries(data));
}
