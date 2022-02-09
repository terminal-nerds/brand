import {
	Blue,
	Cyan,
	Green,
	Magenta,
	Neutral,
	Red,
	Yellow,
} from "$palette/index";

/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const COLORS = {
	black: Neutral.swatches.get(900)!,
	brightBlack: Neutral.swatches.get(800)!,

	blue: Blue.swatches.get(500)!,
	brightBlue: Blue.swatches.get(400)!,

	cyan: Cyan.swatches.get(500)!,
	brightCyan: Cyan.swatches.get(400)!,

	green: Green.swatches.get(500)!,
	brightGreen: Green.swatches.get(400)!,

	magenta: Magenta.swatches.get(500)!,
	brightMagenta: Magenta.swatches.get(400)!,

	red: Red.swatches.get(500)!,
	brightRed: Red.swatches.get(400)!,

	yellow: Yellow.swatches.get(500)!,
	brightYellow: Yellow.swatches.get(400)!,

	white: Neutral.swatches.get(50)!,
	brightWhite: Neutral.swatches.get(100)!,
} as const;
/* eslint-enable @typescript-eslint/no-non-null-assertion */

export type ColorName = keyof typeof COLORS;

export const COLOR_NAMES = new Set<ColorName>(
	Object.keys(COLORS) as Array<ColorName>,
);
