import {
	getHSLAParameters,
	getLCHAParameters,
	getRGBAParameters,
} from "$helpers/color-parameters";
import type {
	CSSFormats,
	HEX,
	HEXA,
	HSL,
	HSLA,
	LCH,
	LCHA,
	RGB,
	RGBA,
} from "$helpers/color-parameters";

export class ColorParameters {
	public hex: HEX;
	public hsla: HSLA;
	public lcha: LCHA;
	public rgba: RGBA;

	constructor(baseHex: HEX) {
		this.hex = baseHex;
		this.hsla = getHSLAParameters(baseHex);
		this.lcha = getLCHAParameters(baseHex);
		this.rgba = getRGBAParameters(baseHex);
	}

	get hexa(): HEXA {
		return `${this.hex}00`;
	}

	get hsl(): HSL {
		const { hue, saturation, lightness } = getHSLAParameters(this.hex);

		return { hue, saturation, lightness };
	}

	get lch(): LCH {
		const { lightness, chroma, hue } = getLCHAParameters(this.hex);

		return { lightness, chroma, hue };
	}

	get rgb(): RGB {
		const { red, green, blue } = getRGBAParameters(this.hex);

		return { red, green, blue };
	}

	getCSS<K extends keyof CSSFormats>(model: K): CSSFormats[K] {
		switch (model) {
			case "hex":
				// @ts-ignore FIXME: I don't know how to fix it
				return this.hex;
			case "hexa":
				// @ts-ignore FIXME: I don't know how to fix it
				return this.hexa;

			case "hsl": {
				const { hue, saturation, lightness } = this.hsl;

				// @ts-ignore FIXME: I don't know how to fix it
				return `hsl(${hue}deg ${saturation}% ${lightness}%)`;
			}
			case "hsla": {
				const { hue, saturation, lightness, alpha } = this.hsla;

				// @ts-ignore FIXME: I don't know how to fix it
				return `hsla(${hue}deg ${saturation}% ${lightness}% / ${alpha})`;
			}

			case "lch": {
				const { hue, chroma, lightness } = this.lch;

				// @ts-ignore FIXME: I don't know how to fix it
				return `lch(${lightness}% ${chroma}% ${hue}deg)`;
			}
			case "lcha": {
				const { lightness, chroma, hue, alpha } = this.lcha;

				// @ts-ignore FIXME: I don't know how to fix it
				return `lcha(${lightness}% ${chroma}% ${hue}deg / ${alpha})`;
			}

			case "rgb": {
				const { red, green, blue } = this.rgb;

				// @ts-ignore FIXME: I don't know how to fix it
				return `rgb(${red} ${green} ${blue})`;
			}
			case "rgba": {
				const { red, green, blue, alpha } = this.rgba;

				// @ts-ignore FIXME: I don't know how to fix it
				return `rgba(${red} ${green} ${blue} / ${alpha})`;
			}

			default: {
				throw new Error(`Unrecognized color model: "${model}"!`);
			}
		}
	}
}
