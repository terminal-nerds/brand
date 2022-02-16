import chroma from "chroma-js";

import { roundNumber } from "@workspace/helpers/number";

export const COLOR_FUNCTIONS = ["hex", "hsl", "lch", "rgb"] as const;
export type ColorFunction = typeof COLOR_FUNCTIONS[number];

export type Alpha = number;
export type Chroma = number;
export type Hue = number;
export type Lightness = number;
export type Saturation = number;
export type Red = number;
export type Green = number;
export type Blue = number;

export interface ColorSettings {
	hex: HEX;
	red: Red;
	green: Green;
	blue: Blue;
	alpha: Alpha;
	chroma: Chroma;
	hue: Hue;
	lightness: Lightness;
	saturation: Saturation;
}
export type ColorSetting = keyof ColorSettings;

export type HEX = string;
// prettier-ignore
export type HSL = Pick<ColorSettings, "hue" | "saturation" | "lightness" | "alpha">;
// prettier-ignore
export type LCH = Pick<ColorSettings, "lightness" | "chroma" | "hue" | "alpha">;
export type RGB = Pick<ColorSettings, "red" | "green" | "blue" | "alpha">;

export function getColorSettings(hex: HEX): ColorSettings {
	const [hue, saturation, lightness] = chroma(hex).hsl();
	const [, chromaValue] = chroma(hex).lch();
	const [red, green, blue, alpha] = chroma(hex).rgba();

	return {
		hex,
		red,
		green,
		blue,
		alpha,
		chroma: roundNumber(chromaValue, 3),
		hue: roundNumber(Number.isNaN(hue) ? 0 : hue, 3),
		lightness: roundNumber(lightness * 100, 3),
		saturation: roundNumber(saturation * 100, 3),
	};
}
