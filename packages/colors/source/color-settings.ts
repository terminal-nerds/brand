import chroma from "chroma-js";

export const COLOR_FUNCTIONS = [
	"hex",
	"hexa",
	"hsl",
	"hsla",
	"lch",
	"lcha",
	"hsl",
	"hsla",
] as const;
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
	alpha: Alpha;
	chroma: Chroma;
	hue: Hue;
	lightness: Lightness;
	saturation: Saturation;
	red: Red;
	green: Green;
	blue: Blue;
}
export type ColorSetting = keyof ColorSettings;

export type HEX = string;
export type HEXA = `${string}00`;

export type HSL = Pick<ColorSettings, "hue" | "saturation" | "lightness">;
// prettier-ignore
export type HSLA = Pick<ColorSettings, "hue" | "saturation" | "lightness" | "alpha">;
export type LCH = Pick<ColorSettings, "lightness" | "chroma" | "hue">;
// prettier-ignore
export type LCHA = Pick<ColorSettings, "lightness" | "chroma" | "hue" | "alpha">;
export type RGB = Pick<ColorSettings, "red" | "green" | "blue">;
export type RGBA = Pick<ColorSettings, "red" | "green" | "blue" | "alpha">;

export function getColorSettings(hex: HEX): ColorSettings {
	const [hue, saturation, lightness] = chroma(hex).hsl();
	const [, chromaValue] = chroma(hex).lch();
	const [red, green, blue, alpha] = chroma(hex).rgba();

	return {
		alpha,
		chroma: Math.round(chromaValue),
		hue: Math.round(hue),
		lightness: Math.round(lightness),
		saturation: Math.round(saturation),
		red,
		green,
		blue,
	};
}

export interface CSSFormats {
	hex: HEX;
	hexa: HEXA;
	hsl: `hsl(${Hue}deg ${Saturation}% ${Lightness}%)`;
	hsla: `hsla(${Hue}deg ${Saturation}% ${Lightness}% / ${Alpha})`;
	lch: `lch(${Lightness}% ${Chroma}% ${Hue}deg)`;
	lcha: `lcha(${Lightness}% ${Chroma}% ${Hue}deg / ${Alpha})`;
	rgb: `rgb(${Red} ${Green} ${Blue})`;
	rgba: `rgba(${Red} ${Green} ${Blue} / ${Alpha})`;
}
