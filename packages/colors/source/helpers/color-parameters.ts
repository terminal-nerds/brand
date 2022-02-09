import chroma from "chroma-js";

export type HEX = string;
export type HEXA = `${string}00`;

export type Hue = number;
export type Saturation = number;
export type Lightness = number;
export type Alpha = number;
export type Chroma = number;
export type Red = number;
export type Green = number;
export type Blue = number;

export interface HSLA {
	hue: Hue;
	saturation: Saturation;
	lightness: Lightness;
	alpha: Alpha;
}
export type HSL = Omit<HSLA, "alpha">;

export function getHSLAParameters(hex: HEX): HSLA {
	const [hue, saturation, lightness] = chroma(hex).hsl();

	return {
		hue: Math.round(hue),
		saturation: Math.round(saturation),
		lightness: Math.round(lightness),
		alpha: 1,
	};
}

export interface LCHA {
	lightness: Lightness;
	chroma: Chroma;
	hue: Hue;
	alpha: Alpha;
}
export type LCH = Omit<LCHA, "alpha">;

export function getLCHAParameters(hex: HEX): LCHA {
	const [lightness, chromaValue, hue] = chroma(hex).lch();

	return {
		lightness: Math.round(lightness),
		chroma: Math.round(chromaValue),
		hue: Math.round(hue),
		alpha: 1,
	};
}

export interface RGBA {
	red: Red;
	green: Green;
	blue: Blue;
	alpha: Alpha;
}
export type RGB = Omit<RGBA, "alpha">;

export function getRGBAParameters(hex: HEX): RGBA {
	const [red, green, blue, alpha] = chroma(hex).rgba();

	return { red, green, blue, alpha };
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
