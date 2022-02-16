import fse from "fs-extra";
import prettier from "prettier";

export function formatOutput(output: string, parser: "css" | "json") {
	return prettier.format(output, { parser, useTabs: true });
}

export function saveOutputToFile(output: string, outputFile: string) {
	fse.outputFileSync(outputFile, output, { encoding: "utf-8" });
}
