module.exports = {
    "globals": {
        "locale": "readonly"
    },
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "@ecomfe/eslint-config/vue",
        "@ecomfe/eslint-config/typescript/strict",
        "./.eslintrc-auto-import.json"
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [],
    "rules": {
        'semi': ['error', 'always'], //不得省略语句结束的分号
        'no-trailing-spaces': 'error',
        "@typescript-eslint/no-explicit-any": 'error' // 禁止显式定义any
    }
};
