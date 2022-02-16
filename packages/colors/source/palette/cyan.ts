import { ColorParameters } from "$utils/ColorParameters";
import { ColorPalette } from "$utils/ColorPalette";
import type { ColorSwatches } from "$utils/ColorPalette";

const CYAN_SWATCHES: ColorSwatches = new Map();

CYAN_SWATCHES.set(50, new ColorParameters("#F6FBFB"));
CYAN_SWATCHES.set(100, new ColorParameters("#E2F0F0"));
CYAN_SWATCHES.set(200, new ColorParameters("#B8DBDB"));
CYAN_SWATCHES.set(300, new ColorParameters("#8DC6C6"));
CYAN_SWATCHES.set(400, new ColorParameters("#5DB1B2"));
CYAN_SWATCHES.set(500, new ColorParameters("#009B9D"));
CYAN_SWATCHES.set(600, new ColorParameters("#137F80"));
CYAN_SWATCHES.set(700, new ColorParameters("#18696A"));
CYAN_SWATCHES.set(800, new ColorParameters("#195354"));
CYAN_SWATCHES.set(900, new ColorParameters("#184142"));

const Cyan = new ColorPalette("cyan", CYAN_SWATCHES);

export default Cyan;
