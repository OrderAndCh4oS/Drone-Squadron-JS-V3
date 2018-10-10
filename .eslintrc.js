module.exports = {
    'env': {
        'browser': true,
        'es6': true,
    },
    'parser': 'babel-eslint',
    'extends': ['eslint:recommended', 'plugin:react/recommended'],
    'parserOptions': {
        'ecmaFeatures': {
            'experimentalObjectRestSpread': true,
            'jsx': true,
            'ecmaVersion': 6,
        },
        'sourceType': 'module',
    },
    'plugins': [
        'react',
    ],
    'rules': {
        'no-class-assign': 'warn',
        'no-unused-vars': 'warn',
        'react/forbid-prop-types': 'off',
        'react/prop-types': 'off',
        'react/no-unescaped-entities': 'off',
        'indent': [
            'warn',
            4,
            {
                'SwitchCase': 1,
                'FunctionDeclaration': {'body': 1, 'parameters': 2},
                'ignoredNodes': ['JSXAttribute', 'JSXSpreadAttribute'],
            },
        ],
        'linebreak-style': [
            'error',
            'unix',
        ],
        'quotes': [
            'error',
            'single',
        ],
        'semi': [
            'error',
            'always',
        ],
        'no-console': 0,
    },
};
