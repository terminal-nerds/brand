import Case from "case";

import { getColorSettings } from "$helpers/color-settings";
import type {
	ColorFunction,
	ColorSettings,
	HEX,
	HSL,
	LCH,
	RGB,
} from "$helpers/color-settings";
import {
	createCSSVariablesHEX,
	createCSSVariablesHSL,
	createCSSVariablesLCH,
	createCSSVariablesRGB,
	getCSS,
} from "$helpers/css";

export class ColorParameters implements ColorSettings {
	public alpha: ColorSettings["alpha"];
	public chroma: ColorSettings["chroma"];
	public hue: ColorSettings["hue"];
	public lightness: ColorSettings["lightness"];
	public saturation: ColorSettings["saturation"];

	public hex: HEX;

	public red: ColorSettings["red"];
	public green: ColorSettings["green"];
	public blue: ColorSettings["blue"];

	constructor(baseHex: HEX) {
		const settings = getColorSettings(baseHex);

		this.alpha = settings.alpha;
		this.chroma = settings.chroma;
		this.hue = settings.hue;
		this.lightness = settings.lightness;
		this.saturation = settings.saturation;

		this.hex = baseHex;

		this.red = settings.red;
		this.green = settings.green;
		this.blue = settings.blue;
	}

	get hsl(): HSL {
		return {
			hue: this.hue,
			saturation: this.saturation,
			lightness: this.lightness,
			alpha: this.alpha,
		};
	}

	get lch(): LCH {
		return {
			lightness: this.lightness,
			chroma: this.chroma,
			hue: this.hue,
			alpha: this.alpha,
		};
	}

	get rgb(): RGB {
		return {
			red: this.red,
			green: this.green,
			blue: this.blue,
			alpha: this.alpha,
		};
	}

	createCSSVariables(name: string, colorFunction: ColorFunction) {
		name = Case.kebab(name);

		switch (colorFunction) {
			case "hex": {
				return createCSSVariablesHEX(name, this.hex);
			}

			case "hsl": {
				return createCSSVariablesHSL(name, this.hsl);
			}

			case "lch": {
				return createCSSVariablesLCH(name, this.lch);
			}

			case "rgb": {
				return createCSSVariablesRGB(name, this.rgb);
			}
		}
	}

	getCSS(colorFunction: ColorFunction) {
		return getCSS(colorFunction, this);
	}

	toJSON() {
		const map = new Map();

		for (const key in this) {
			map.set(key, this[key]);
		}

		return JSON.stringify(Object.fromEntries(map));
	}
}
