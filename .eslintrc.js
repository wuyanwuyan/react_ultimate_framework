module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    "globals": {
        "__DEV__": true,
        "__CLIENT__": true,
        __SERVER__: true,
        __PRODUCTION__: true,
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "no-unused-vars":"off",
        "no-console":"off",
        "react/prop-types": "off",
        "react/display-name": "off"
    }
};