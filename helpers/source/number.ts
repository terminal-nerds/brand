export function roundNumber(number: number, decimalPlaces: number): number {
	const rounded = Math.round(Number(`${number}e${decimalPlaces}`));

	return Number(`${rounded}e-${decimalPlaces}`);
}
