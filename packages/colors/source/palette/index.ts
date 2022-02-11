import blue from "./blue";
import cyan from "./cyan";
import green from "./green";
import magenta from "./magenta";
import neutral from "./neutral";
import red from "./red";
import yellow from "./yellow";

export const COLORS_PALETTE = {
	blue,
	cyan,
	green,
	magenta,
	neutral,
	red,
	yellow,
};

export type ColorPaletteName = keyof typeof COLORS_PALETTE;

export const COLORS_PALETTE_NAMES = new Set<ColorPaletteName>(
	Object.keys(COLORS_PALETTE) as Array<ColorPaletteName>,
);
