import { ColorParameters } from "$utils/ColorParameters";
import { ColorPalette } from "$utils/ColorPalette";
import type { ColorSwatches } from "$utils/ColorPalette";

const RED_SWATCHES: ColorSwatches = new Map();

RED_SWATCHES.set(50, new ColorParameters("#FFF9F7"));
RED_SWATCHES.set(100, new ColorParameters("#FFE9E5"));
RED_SWATCHES.set(200, new ColorParameters("#FFC7BE"));
RED_SWATCHES.set(300, new ColorParameters("#FBA69A"));
RED_SWATCHES.set(400, new ColorParameters("#F38577"));
RED_SWATCHES.set(500, new ColorParameters("#E85E52"));
RED_SWATCHES.set(600, new ColorParameters("#BD4F44"));
RED_SWATCHES.set(700, new ColorParameters("#9C433A"));
RED_SWATCHES.set(800, new ColorParameters("#7A362F"));
RED_SWATCHES.set(900, new ColorParameters("#5F2C26"));

const Red = new ColorPalette("red", RED_SWATCHES);

export default Red;
