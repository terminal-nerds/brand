import type {
	Alpha,
	Blue,
	Chroma,
	ColorFunction,
	ColorSettings,
	Green,
	HEX,
	HEXA,
	HSL,
	HSLA,
	Hue,
	LCH,
	LCHA,
	Lightness,
	Red,
	RGB,
	RGBA,
	Saturation,
} from "./color-settings";

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

export function getCSS<K extends keyof CSSFormats>(
	colorFunction: K,
	settings: ColorSettings,
): CSSFormats[K] {
	switch (colorFunction) {
		case "hex":
			// @ts-ignore FIXME: I don't know how to fix it
			return settings.hex;
		case "hexa":
			// @ts-ignore FIXME: I don't know how to fix it
			return settings.hexa;

		case "hsl": {
			// @ts-ignore FIXME: I don't know how to fix it
			return `hsl(${settings.hue}deg ${settings.saturation}% ${settings.lightness}%)`;
		}
		case "hsla": {
			// @ts-ignore FIXME: I don't know how to fix it
			return `hsla(${settings.hue}deg ${settings.saturation}% ${settings.lightness}% / ${settings.alpha})`;
		}

		case "lch": {
			// @ts-ignore FIXME: I don't know how to fix it
			return `lch(${settings.lightness}% ${settings.chroma}% ${settings.hue}deg)`;
		}
		case "lcha": {
			// @ts-ignore FIXME: I don't know how to fix it
			return `lcha(${settings.lightness}% ${settings.chroma}% ${settings.hue}deg / ${settings.alpha})`;
		}

		case "rgb": {
			// @ts-ignore FIXME: I don't know how to fix it
			return `rgb(${settings.red} ${settings.green} ${settings.blue})`;
		}
		case "rgba": {
			// @ts-ignore FIXME: I don't know how to fix it
			return `rgba(${settings.red} ${settings.green} ${settings.blue} / ${settings.alpha})`;
		}

		default: {
			throw new Error(`Unrecognized color function: "${colorFunction}"!`);
		}
	}
}

function setVariable(
	name: string,
	key: keyof ColorSettings | string,
	value: number | string,
	unit?: string,
) {
	let customProperty = name;

	if (key) {
		customProperty = `${customProperty}_${key}`;
	}

	return `${customProperty}: ${value}${unit ?? ""}`;
}

function setColorFunctionVariable(
	name: string,
	colorFunction: Extract<ColorFunction, "hsl" | "lch" | "rgb">,
) {
	let value = "";

	switch (colorFunction) {
		case "hsl": {
			value = `var(--${name}_hue) var(--${name}_saturation) var(--${name}_lightness)`;
			break;
		}

		case "lch": {
			value = `var(--${name}_lightness) var(--${name}_chroma) var(--${name}_hue)`;
			break;
		}

		case "rgb": {
			value = `var(--${name}_red) var(--${name}_green) var(--${name}_blue)`;
			break;
		}
	}

	return setVariable(name, colorFunction, value);
}

function setColorFunctionVariableWithAlpha(
	name: string,
	colorFormat: Extract<ColorFunction, "hsla" | "lcha" | "rgba">,
) {
	return setVariable(
		name,
		colorFormat,
		`var(--${name}_${colorFormat.slice(0, -1)}) var(--${name}_alpha)`,
	);
}

function setFinalColorVariable(name: string, colorFunction: ColorFunction) {
	return setVariable(
		name,
		"",
		`${colorFunction}(var(--${name}_${colorFunction}))`,
	);
}

function wrapVariables(variables: Set<string>) {
	const output = [...variables]
		.map((variable) => `\t--${variable};`)
		.join("\n");

	return `:root {\n${output}\n}`;
}

export function createCSSVariablesHEX(name: string, value: HEX | HEXA) {
	return wrapVariables(new Set([setVariable(name, "", value)]));
}

export function createCSSVariablesHSL(
	name: string,
	settings: HSL | HSLA,
	alpha = false,
) {
	const variables = new Set<string>();
	const colorFunction = alpha ? "hsla" : "hsl";

	variables.add(setVariable(name, "hue", settings.hue, "deg"));
	// prettier-ignore
	variables.add(setVariable(name, "saturation", settings.saturation, "%"));
	variables.add(setVariable(name, "lightness", settings.lightness, "%"));

	if (alpha && "alpha" in settings) {
		variables.add(setVariable(name, "alpha", settings.alpha));
	}

	variables.add(setColorFunctionVariable(name, "hsl"));

	if (alpha) {
		variables.add(setColorFunctionVariableWithAlpha(name, "hsla"));
	}

	variables.add(setFinalColorVariable(name, colorFunction));

	return wrapVariables(variables);
}

export function createCSSVariablesLCH(
	name: string,
	settings: LCH | LCHA,
	alpha = false,
) {
	const variables = new Set<string>();
	const colorFunction = alpha ? "lcha" : "lch";

	variables.add(setVariable(name, "lightness", settings.lightness, "%"));
	variables.add(setVariable(name, "chroma", settings.chroma, "%"));
	variables.add(setVariable(name, "hue", settings.hue, "deg"));

	if (alpha && "alpha" in settings) {
		variables.add(setVariable(name, "alpha", settings.alpha));
	}

	variables.add(setColorFunctionVariable(name, "lch"));

	if (alpha) {
		variables.add(setColorFunctionVariableWithAlpha(name, "lcha"));
	}

	variables.add(setFinalColorVariable(name, colorFunction));

	return wrapVariables(variables);
}

export function createCSSVariablesRGB(
	name: string,
	settings: RGB | RGBA,
	alpha = false,
) {
	const variables = new Set<string>();
	const colorFunction = alpha ? "rgba" : "rgb";

	variables.add(setVariable(name, "red", settings.red));
	variables.add(setVariable(name, "green", settings.green));
	variables.add(setVariable(name, "blue", settings.blue));

	if (alpha && "alpha" in settings) {
		variables.add(setVariable(name, "alpha", settings.alpha));
	}

	variables.add(setColorFunctionVariable(name, "rgb"));

	if (alpha) {
		variables.add(setColorFunctionVariableWithAlpha(name, "rgba"));
	}

	variables.add(setFinalColorVariable(name, colorFunction));

	return wrapVariables(variables);
}
