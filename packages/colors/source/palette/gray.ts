import { ColorParameters } from "$utils/ColorParameters";
import { ColorPalette } from "$utils/ColorPalette";
import type { ColorSwatches } from "$utils/ColorPalette";

const GRAY_SWATCHES: ColorSwatches = new Map();

GRAY_SWATCHES.set(50, new ColorParameters("#FAFAFA"));
GRAY_SWATCHES.set(100, new ColorParameters("#EDEDED"));
GRAY_SWATCHES.set(200, new ColorParameters("#D4D4D4"));
GRAY_SWATCHES.set(300, new ColorParameters("#BCBCBC"));
GRAY_SWATCHES.set(400, new ColorParameters("#A4A4A4"));
GRAY_SWATCHES.set(500, new ColorParameters("#8B8B8B"));
GRAY_SWATCHES.set(600, new ColorParameters("#727272"));
GRAY_SWATCHES.set(700, new ColorParameters("#5F5F5F"));
GRAY_SWATCHES.set(800, new ColorParameters("#4B4B4B"));
GRAY_SWATCHES.set(900, new ColorParameters("#3B3B3B"));

const Gray = new ColorPalette("neutral", GRAY_SWATCHES);

export default Gray;
