export function stringifyJSONWithTabs(
	data: object | Array<[key: string, value: unknown]>,
) {
	let output = data;

	if (Array.isArray(data)) {
		output = Object.fromEntries(data);
	}

	return JSON.stringify(output, undefined, "\t");
}

export function minifyJSON(output: string) {
	return JSON.stringify(JSON.parse(output));
}
