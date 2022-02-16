import { ColorParameters } from "$utils/ColorParameters";
import { ColorPalette } from "$utils/ColorPalette";
import type { ColorSwatches } from "$utils/ColorPalette";

const YELLOW_SWATCHES: ColorSwatches = new Map();

YELLOW_SWATCHES.set(50, new ColorParameters("#FDF9F5"));
YELLOW_SWATCHES.set(100, new ColorParameters("#F8ECDC"));
YELLOW_SWATCHES.set(200, new ColorParameters("#EAD1AA"));
YELLOW_SWATCHES.set(300, new ColorParameters("#DBB77A"));
YELLOW_SWATCHES.set(400, new ColorParameters("#C89E4A"));
YELLOW_SWATCHES.set(500, new ColorParameters("#B28306"));
YELLOW_SWATCHES.set(600, new ColorParameters("#926C0E"));
YELLOW_SWATCHES.set(700, new ColorParameters("#795A11"));
YELLOW_SWATCHES.set(800, new ColorParameters("#5F4712"));
YELLOW_SWATCHES.set(900, new ColorParameters("#4B3811"));

const Yellow = new ColorPalette("yellow", YELLOW_SWATCHES);

export default Yellow;
