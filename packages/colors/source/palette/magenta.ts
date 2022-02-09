import { ColorParameters } from "$utils/ColorParameters";
import { ColorPalette } from "$utils/ColorPalette";
import type { ColorSwatches } from "$utils/ColorPalette";

const MAGENTA_SWATCHES: ColorSwatches = new Map();

MAGENTA_SWATCHES.set(50, new ColorParameters("#F8FBF6"));
MAGENTA_SWATCHES.set(100, new ColorParameters("#E8F0E0"));
MAGENTA_SWATCHES.set(200, new ColorParameters("#C6DBB3"));
MAGENTA_SWATCHES.set(300, new ColorParameters("#A4C688"));
MAGENTA_SWATCHES.set(400, new ColorParameters("#81B25D"));
MAGENTA_SWATCHES.set(500, new ColorParameters("#5A9B2E"));
MAGENTA_SWATCHES.set(600, new ColorParameters("#4C7F28"));
MAGENTA_SWATCHES.set(700, new ColorParameters("#406924"));
MAGENTA_SWATCHES.set(800, new ColorParameters("#34531E"));
MAGENTA_SWATCHES.set(900, new ColorParameters("#2B411A"));

const Magenta = new ColorPalette("magenta", MAGENTA_SWATCHES);

export default Magenta;
