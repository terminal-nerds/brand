import fse from "fs-extra";

export function saveCSSOutputToFile(data: string, outputFile: string) {
	fse.outputFileSync(outputFile, data, { encoding: "utf-8" });
}
