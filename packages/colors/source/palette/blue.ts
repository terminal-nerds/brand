import { ColorParameters } from "$utils/ColorParameters";
import { ColorPalette } from "$utils/ColorPalette";
import type { ColorSwatches } from "$utils/ColorPalette";

const BLUE_SWATCHES: ColorSwatches = new Map();

BLUE_SWATCHES.set(50, new ColorParameters("#F8FAFF"));
BLUE_SWATCHES.set(100, new ColorParameters("#E7EDFF"));
BLUE_SWATCHES.set(200, new ColorParameters("#C3D4FE"));
BLUE_SWATCHES.set(300, new ColorParameters("#9CBCFD"));
BLUE_SWATCHES.set(400, new ColorParameters("#6EA5FB"));
BLUE_SWATCHES.set(500, new ColorParameters("#018DF8"));
BLUE_SWATCHES.set(600, new ColorParameters("#1B73CA"));
BLUE_SWATCHES.set(700, new ColorParameters("#2060A6"));
BLUE_SWATCHES.set(800, new ColorParameters("#214C81"));
BLUE_SWATCHES.set(900, new ColorParameters("#1F3C64"));

const Blue = new ColorPalette("blue", BLUE_SWATCHES);

export default Blue;
