module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/prop-types": "warn",
        "no-undef": "error",
        "no-unused-vars": "error",
        "import/no-unresolved": "error"
        /* "import/named": "error",
        "import/default": "error",
        "import/namespace": "error",
        "import/no-named-as-default-member": "error",
        "import/no-unused-modules": "error" */
    },
    "globals": {
        "ndpv": "readonly",
        "wage": "readonly",
        "jQuery": "readonly"
    }
}
