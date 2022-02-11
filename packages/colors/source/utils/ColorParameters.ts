import { getColorSettings } from "../color-settings";
import type {
	ColorSettings,
	CSSFormats,
	HEX,
	HEXA,
	HSL,
	HSLA,
	LCH,
	LCHA,
	RGB,
	RGBA,
} from "../color-settings";

export class ColorParameters implements ColorSettings {
	public hex: HEX;
	public red: ColorSettings["red"];
	public green: ColorSettings["green"];
	public blue: ColorSettings["blue"];
	public alpha: ColorSettings["alpha"];
	public hue: ColorSettings["hue"];
	public saturation: ColorSettings["saturation"];
	public lightness: ColorSettings["lightness"];
	public chroma: ColorSettings["chroma"];

	constructor(baseHex: HEX) {
		this.hex = baseHex;

		const settings = getColorSettings(baseHex);

		this.red = settings.red;
		this.green = settings.green;
		this.blue = settings.blue;
		this.alpha = settings.alpha;
		this.chroma = settings.chroma;
		this.hue = settings.hue;
		this.lightness = settings.lightness;
		this.saturation = settings.saturation;
	}

	get hexa(): HEXA {
		return `${this.hex}00`;
	}

	get hsl(): HSL {
		return {
			hue: this.hue,
			saturation: this.saturation,
			lightness: this.lightness,
		};
	}

	get hsla(): HSLA {
		return { ...this.hsl, alpha: this.alpha };
	}

	get lch(): LCH {
		return {
			lightness: this.lightness,
			chroma: this.chroma,
			hue: this.hue,
		};
	}

	get lcha(): LCHA {
		return { ...this.lch, alpha: this.alpha };
	}

	get rgb(): RGB {
		return {
			red: this.red,
			green: this.green,
			blue: this.blue,
		};
	}

	get rgba(): RGBA {
		return { ...this.rgba, alpha: this.alpha };
	}

	getCSS<K extends keyof CSSFormats>(colorFunction: K): CSSFormats[K] {
		switch (colorFunction) {
			case "hex":
				// @ts-ignore FIXME: I don't know how to fix it
				return this.hex;
			case "hexa":
				// @ts-ignore FIXME: I don't know how to fix it
				return this.hexa;

			case "hsl": {
				// @ts-ignore FIXME: I don't know how to fix it
				return `hsl(${this.hue}deg ${this.saturation}% ${this.lightness}%)`;
			}
			case "hsla": {
				// @ts-ignore FIXME: I don't know how to fix it
				return `hsla(${this.hue}deg ${this.saturation}% ${this.lightness}% / ${this.alpha})`;
			}

			case "lch": {
				// @ts-ignore FIXME: I don't know how to fix it
				return `lch(${this.lightness}% ${this.chroma}% ${this.hue}deg)`;
			}
			case "lcha": {
				// @ts-ignore FIXME: I don't know how to fix it
				return `lcha(${this.lightness}% ${this.chroma}% ${this.hue}deg / ${this.alpha})`;
			}

			case "rgb": {
				// @ts-ignore FIXME: I don't know how to fix it
				return `rgb(${this.red} ${this.green} ${this.blue})`;
			}
			case "rgba": {
				// @ts-ignore FIXME: I don't know how to fix it
				return `rgba(${this.red} ${this.green} ${this.blue} / ${this.alpha})`;
			}

			default: {
				throw new Error(
					`Unrecognized color function: "${colorFunction}"!`,
				);
			}
		}
	}

	toJSON() {
		const map = new Map();

		for (const key in this) {
			map.set(key, this[key]);
		}

		return JSON.stringify(Object.fromEntries(map));
	}
}
