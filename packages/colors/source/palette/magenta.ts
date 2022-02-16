import { ColorParameters } from "$utils/ColorParameters";
import { ColorPalette } from "$utils/ColorPalette";
import type { ColorSwatches } from "$utils/ColorPalette";

const MAGENTA_SWATCHES: ColorSwatches = new Map();

MAGENTA_SWATCHES.set(50, new ColorParameters("#FCF9FE"));
MAGENTA_SWATCHES.set(100, new ColorParameters("#F4EAFA"));
MAGENTA_SWATCHES.set(200, new ColorParameters("#E4CCF3"));
MAGENTA_SWATCHES.set(300, new ColorParameters("#D3AEEB"));
MAGENTA_SWATCHES.set(400, new ColorParameters("#C191E4"));
MAGENTA_SWATCHES.set(500, new ColorParameters("#AD71DB"));
MAGENTA_SWATCHES.set(600, new ColorParameters("#8D5DB2"));
MAGENTA_SWATCHES.set(700, new ColorParameters("#754E93"));
MAGENTA_SWATCHES.set(800, new ColorParameters("#5C3E72"));
MAGENTA_SWATCHES.set(900, new ColorParameters("#483259"));

const Magenta = new ColorPalette("magenta", MAGENTA_SWATCHES);

export default Magenta;
