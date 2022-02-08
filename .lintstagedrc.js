// https://github.com/okonet/lint-staged

const config = {
	// Prettier
	"*": ["pretty-quick --check --staged"],

	// ESLint
	"*.{js,json,ts,yml,yaml}": ["eslint"],

	// syncpack
	"**/package.json": ["syncpack list-mismatches", "syncpack format"],

	// markdownlint
	"*.md": [`markdownlint --ignore "./.changeset/*.md"`],

	// TypeScript types (in each package, because of different configs)
	"./helpers/**/*.ts": () => `tsc --project ./helpers/tsconfig.json --noEmit`,
	// "./packages/logo/source/**/*.ts": () =>
	// 	`tsc --project ./packages/logo/tsconfig.json --noEmit`,
};

export default config;
