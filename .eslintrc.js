module.exports = {
	root: true,
	// parser: 'babel-eslint',
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
		ecmaFeatures: {
			legacyDecorators: true
		}
	},
	plugins: ['json', 'babel', 'ember', '@typescript-eslint'],
	extends: [
		'eslint:recommended',
		'plugin:ember/recommended',
		'plugin:json/recommended-with-comments',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/eslint-recommended'
	],
	env: {
		browser: true
	},
	rules: {
		'no-var': 'error',
		'no-console': 'error',
		'no-empty': ['error'],
		'no-debugger': 'error',
		'dot-notation': 'error',
		'prefer-const': 'error',
		'prefer-spread': 'error',
		'no-delete-var': 'error',
		'prefer-reflect': 'error',
		'max-len': ['error', 140],
		'space-infix-ops': 'error',
		'prefer-template': 'error',
		'indent': ['error', 'tab'],
		'no-extra-parens': 'error',
		'no-return-await': 'error',
		'no-useless-call': 'error',
		'semi': ['error', 'always'],
		'func-call-spacing': 'error',
		'no-useless-concat': 'error',
		'no-useless-rename': 'error',
		'no-trailing-spaces': 'error',
		'default-param-last': 'error',
		'prefer-destructuring': 'error',
		'eol-last': ['error', 'always'],
		'comma-style': ['error', 'last'],
		'comma-dangle': ['error', 'never'],
		'arrow-parens': ['error', 'always'],
		'space-in-parens': ['error', 'never'],
		'spaced-comment': ['error', 'always'],
		'dot-location': ['error', 'property'],
		'no-cond-assign': ['error', 'always'],
		'no-template-curly-in-string': 'error',
		'object-shorthand': ['error', 'always'],
		'operator-linebreak': ['error', 'before'],
		'space-before-blocks': ['error', 'always'],
		'object-curly-spacing': ['error', 'always'],
		'array-bracket-spacing': ['error', 'never'],
		'space-before-function-paren': ['error', 'never'],
		'no-multiple-empty-lines': ['error', { max: 1 }],
		'camelcase': ['error', { properties: 'always' }],
		'quotes': ['error', 'single', { avoidEscape: true }],
		'prefer-arrow-callback': [
			'error',
			{
				allowUnboundThis: false
			}
		],
		'one-var': [
			'error',
			{
				uninitialized: 'always',
				initialized: 'never'
			}
		],
		'new-cap': [
			'error',
			{
				capIsNewExceptions: ['A']
			}
		],
		'key-spacing': [
			'error',
			{
				beforeColon: false,
				afterColon: true
			}
		],
		'semi-spacing': [
			'error',
			{
				before: false,
				after: true
			}
		],
		'comma-spacing': [
			'error',
			{
				before: false,
				after: true
			}
		],
		'keyword-spacing': [
			'error',
			{
				overrides: {
					catch: {
						after: false
					}
				}
			}
		],
		'space-unary-ops': [
			'error',
			{
				words: false,
				nonwords: false
			}
		],
		'no-constant-condition': [
			'error',
			{
				checkLoops: false
			}
		],
		'generator-star-spacing': [
			'error',
			{
				before: false,
				after: true
			}
		],
		'max-statements-per-line': [
			'error',
			{
				max: 2
			}
		],
		'brace-style': [
			'error',
			'1tbs',
			{
				allowSingleLine: true
			}
		],

		'ember/avoid-leaking-state-in-ember-objects': 0,
		'ember/new-module-imports': 2,
		'ember/no-side-effects': 0,
		'@typescript-eslint/no-var-requires': 0,
		'@typescript-eslint/explicit-function-return-type': 0
	},
	overrides: [
		// node files
		{
			files: [
				'.huskyrc.js',
				'.eslintrc.js',
				'.ember-cli.js',
				'babel.config.js',
				'postcss.config.js',
				'.template-lintrc.js',
				'stylelint.config.js',
				'ember-cli-build.js',
				'testem.js',
				'testem-electron.js',
				'blueprints/*/index.js',
				'config/**/*.js',
				'lib/*/index.js',
				'server/**/*.js',
				'functions/**/*.js',
				'app/tailwind/*.js'
			],
			parserOptions: {
				sourceType: 'script',
				ecmaVersion: 2015
			},
			env: {
				browser: false,
				node: true
			},
			plugins: ['node'],
			rules: Object.assign(
				{},
				require('eslint-plugin-node').configs.recommended.rules,
				{
					// add your custom rules and overrides for node files here

					// this can be removed once the following is fixed
					// https://github.com/mysticatea/eslint-plugin-node/issues/77
					'node/no-unpublished-require': 'off',
					'node/no-extraneous-require': 'off'
				}
			)
		}
	]
};
