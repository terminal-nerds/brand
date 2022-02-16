import prettier from "prettier";

import type {
	Alpha,
	Blue,
	Chroma,
	ColorFunction,
	ColorSettings,
	Green,
	HEX,
	HSL,
	Hue,
	LCH,
	Lightness,
	Red,
	RGB,
	Saturation,
} from "./color-settings";

export interface CSSFormats {
	hex: HEX;
	hsl: `hsla(${Hue}deg ${Saturation}% ${Lightness}% / ${Alpha})`;
	lch: `lcha(${Lightness}% ${Chroma}% ${Hue}deg / ${Alpha})`;
	rgb: `rgba(${Red} ${Green} ${Blue} / ${Alpha})`;
}

export function getCSS<K extends keyof CSSFormats>(
	colorFunction: K,
	settings: ColorSettings,
): CSSFormats[K] {
	switch (colorFunction) {
		case "hex":
			// @ts-ignore FIXME: I don't know how to fix it
			return settings.hex;

		case "hsl": {
			// @ts-ignore FIXME: I don't know how to fix it
			return `hsla(${settings.hue}deg ${settings.saturation}% ${settings.lightness}% / ${settings.alpha})`;
		}

		case "lch": {
			// @ts-ignore FIXME: I don't know how to fix it
			return `lcha(${settings.lightness}% ${settings.chroma}% ${settings.hue}deg / ${settings.alpha})`;
		}

		case "rgb": {
			// @ts-ignore FIXME: I don't know how to fix it
			return `rgba(${settings.red} ${settings.green} ${settings.blue} / ${settings.alpha})`;
		}

		default: {
			throw new Error(`Unrecognized color function: "${colorFunction}"!`);
		}
	}
}

function createVariable(name: string): `var(--${string})` {
	return `var(--${name})`;
}

function setCustomProperty(
	name: string,
	key: keyof ColorSettings | string,
	value: number | string,
	options?: {
		unit?: string;
		prefix?: string;
		suffix?: string;
	},
) {
	let customProperty = `--${name}`;

	if (key) {
		customProperty += `_${key}`;
	}

	// prettier-ignore
	return `${options?.prefix ?? ""}${customProperty}: ${value}${options?.unit ?? ""}${options?.suffix ?? ""}`;
}

function setColorFunctionVariable(
	name: string,
	colorFunction: Extract<ColorFunction, "hsl" | "lch" | "rgb">,
) {
	const values = new Set<string>();

	switch (colorFunction) {
		case "hsl": {
			values.add(createVariable(`${name}_lightness`));
			values.add(createVariable(`${name}_hue`));
			values.add(createVariable(`${name}_saturation`));
			break;
		}

		case "lch": {
			values.add(createVariable(`${name}_lightness`));
			values.add(createVariable(`${name}_chroma`));
			values.add(createVariable(`${name}_hue`));
			break;
		}

		case "rgb": {
			values.add(createVariable(`${name}_red`));
			values.add(createVariable(`${name}_green`));
			values.add(createVariable(`${name}_blue`));
			break;
		}
	}

	return setCustomProperty(name, colorFunction, [...values].join(" "), {
		// Prettify the output and to ignore Stylelint warning about empty line
		// before comment
		prefix: "\n\n\t/* prettier-ignore */\n",
	});
}

function setFinalColorVariable(name: string, colorFunction: ColorFunction) {
	return setCustomProperty(
		name,
		"",
		`${colorFunction}(var(--${name}_${colorFunction}) var(--${name}_alpha))`,
	);
}

function wrapVariablesInRoot(variables: Set<string>) {
	const output = [...variables].join(";");

	return formatCSSOutput(`:root {${output}}`);
}

export function createCSSVariablesHEX(name: string, value: HEX) {
	return wrapVariablesInRoot(new Set([setCustomProperty(name, "", value)]));
}

export function createCSSVariablesHSL(name: string, settings: HSL) {
	const variables = new Set<string>();

	// prettier-ignore
	variables.add(setCustomProperty(name, "hue", settings.hue, { unit: "deg" }));
	// prettier-ignore
	variables.add(setCustomProperty(name, "saturation", settings.saturation, { unit: "%" }));
	// prettier-ignore
	variables.add(setCustomProperty(name, "lightness", settings.lightness, { unit: "%" }));
	variables.add(setCustomProperty(name, "alpha", settings.alpha));

	variables.add(setColorFunctionVariable(name, "hsl"));
	variables.add(setFinalColorVariable(name, "hsl"));

	return wrapVariablesInRoot(variables);
}

export function createCSSVariablesLCH(name: string, settings: LCH) {
	const variables = new Set<string>();

	// prettier-ignore
	variables.add(setCustomProperty(name, "lightness", settings.lightness, { unit: "%" }));
	// prettier-ignore
	variables.add(setCustomProperty(name, "chroma", settings.chroma, { unit: "%" }));
	// prettier-ignore
	variables.add(setCustomProperty(name, "hue", settings.hue, { unit: "deg" }));
	variables.add(setCustomProperty(name, "alpha", settings.alpha));

	variables.add(setColorFunctionVariable(name, "lch"));
	variables.add(setFinalColorVariable(name, "lch"));

	return wrapVariablesInRoot(variables);
}

export function createCSSVariablesRGB(name: string, settings: RGB) {
	const variables = new Set<string>();

	variables.add(setCustomProperty(name, "red", settings.red));
	variables.add(setCustomProperty(name, "green", settings.green));
	variables.add(setCustomProperty(name, "blue", settings.blue));
	variables.add(setCustomProperty(name, "alpha", settings.alpha));

	variables.add(setColorFunctionVariable(name, "rgb"));
	variables.add(setFinalColorVariable(name, "rgb"));

	return wrapVariablesInRoot(variables);
}

function formatCSSOutput(output: string): string {
	return prettier.format(output, { parser: "css", useTabs: true });
}
