// https://github.com/okonet/lint-staged

function groupByPackagePath(filenames) {
	const pattern = new RegExp("(?<=/)packages/.*?(?=/)");

	return [
		...new Set(filenames.map((filename) => filename.match(pattern)[0])),
	];
}

const config = {
	// Prettier
	"*": ["pretty-quick --check --staged"],

	// ESLint
	"*.{js,json,ts,yml,yaml}": ["eslint"],

	// markdownlint
	"*.md": [`markdownlint --ignore "./.changeset/*.md"`],

	// Stylelint
	"*.css": ["stylelint"],

	// syncpack
	"**/package.json": ["syncpack list-mismatches", "syncpack format"],

	// TypeScript types (in each module/package, because of different configs)
	"./helpers/**/*.ts": () => `tsc --project ./helpers/tsconfig.json --noEmit`,
	"./packages/*/source/**/*.ts": (filenames) =>
		groupByPackagePath(filenames).map(
			(packagePath) =>
				`tsc --project ./${packagePath}/tsconfig.json --noEmit`,
		),
};

export default config;
