module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		"plugin:vue/vue3-essential",
		"eslint:recommended",
		"@vue/typescript/recommended",
		"plugin:prettier/recommended",
	],
	plugins: ["prettier"],
	parserOptions: {
		ecmaVersion: 2020,
	},
	rules: {
		"prettier/prettier": "error",
		"arrow-body-style": "off",
		"prefer-arrow-callback": "off",
		"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
		semi: [1, "never"],
	},
}
