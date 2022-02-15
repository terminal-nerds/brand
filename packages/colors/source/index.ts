import type { ColorFunction } from "$helpers/color-settings";
import Blue from "$palette/blue";
import Cyan from "$palette/cyan";
import Gray from "$palette/gray";
import Green from "$palette/green";
import Magenta from "$palette/magenta";
import Red from "$palette/red";
import Yellow from "$palette/yellow";

/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const PRIMARY_COLORS = {
	black: Gray.swatches.get(900)!,
	brightBlack: Gray.swatches.get(800)!,

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

	white: Gray.swatches.get(50)!,
	brightWhite: Gray.swatches.get(100)!,
} as const;
/* eslint-enable @typescript-eslint/no-non-null-assertion */

export type PrimaryColorName = keyof typeof PRIMARY_COLORS;
export type PrimaryColorFunction = `${PrimaryColorName}-${ColorFunction}`;

export const PRIMARY_COLOR_NAMES = new Set<PrimaryColorName>(
	Object.keys(PRIMARY_COLORS) as Array<PrimaryColorName>,
);
