import { ColorParameters } from "$utils/ColorParameters";
import { ColorPalette } from "$utils/ColorPalette";
import type { ColorSwatches } from "$utils/ColorPalette";

const GREEN_SWATCHES: ColorSwatches = new Map();

GREEN_SWATCHES.set(50, new ColorParameters("#F8FBF6"));
GREEN_SWATCHES.set(100, new ColorParameters("#E8F0E0"));
GREEN_SWATCHES.set(200, new ColorParameters("#C6DBB3"));
GREEN_SWATCHES.set(300, new ColorParameters("#A4C688"));
GREEN_SWATCHES.set(400, new ColorParameters("#81B25D"));
GREEN_SWATCHES.set(500, new ColorParameters("#5A9B2E"));
GREEN_SWATCHES.set(600, new ColorParameters("#4C7F28"));
GREEN_SWATCHES.set(700, new ColorParameters("#406924"));
GREEN_SWATCHES.set(800, new ColorParameters("#34531E"));
GREEN_SWATCHES.set(900, new ColorParameters("#2B411A"));

const Green = new ColorPalette("green", GREEN_SWATCHES);

export default Green;
