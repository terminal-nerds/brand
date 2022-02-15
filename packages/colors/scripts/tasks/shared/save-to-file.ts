import fse from "fs-extra";

/**
 * @description The purpose of this is to quiet Prettier warnings in the
 * created source files
 */
function appendNewLine(output: string) {
	return `${output}\n`;
}

export function saveOutputToFile(data: string, outputFile: string) {
	fse.outputFileSync(outputFile, appendNewLine(data), { encoding: "utf-8" });
}
