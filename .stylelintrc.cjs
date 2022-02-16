/* eslint-disable unicorn/no-null */

// https://stylelint.io/user-guide/configure

/** @type {import("stylelint").Config} */
const config = {
	extends: "@terminal-nerds/stylelint-config",

	rules: {
		// NOTE: We don't need this one - we can easily preview groups, which
		// later on, will be minified and merged into one.
		"no-duplicate-selectors": null,
	},
};

module.exports = config;
