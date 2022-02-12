import blue from "./blue";
import cyan from "./cyan";
import gray from "./gray";
import green from "./green";
import magenta from "./magenta";
import red from "./red";
import yellow from "./yellow";

export const COLORS_PALETTE = {
	blue,
	cyan,
	gray,
	green,
	magenta,
	red,
	yellow,
} as const;

export type ColorPaletteName = keyof typeof COLORS_PALETTE;

export const COLORS_PALETTE_NAMES = new Set<ColorPaletteName>(
	Object.keys(COLORS_PALETTE) as Array<ColorPaletteName>,
);

export type ColorName = keyof typeof COLORS_PALETTE;
