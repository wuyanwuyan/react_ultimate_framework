module.exports = {
    dev_client: {
        // presets: ["es2015", "stage-0", "react", "react-hmre"],
        presets: ["es2015", "stage-0", "react"],
        "plugins": ["transform-decorators-legacy", "transform-runtime"],
        babelrc: false,
        // cacheDirectory: true,
    },
    pro_client: {
        presets: ["es2015", "stage-0", "react"],
        "plugins": ["transform-decorators-legacy", "transform-runtime"],
        babelrc: false
    },
    dev_server: {
        presets: [
            ["env", {
                "targets": {"node": "current"}
            }],
            ["stage-0"],
            ["react"]
        ],
        "plugins": [
            [
                "css-modules-transform", {
                // "preprocessCss": "./loaders/sass-loader.js",
                "devMode": true,
                "generateScopedName": "[name]_[local]-[hash:3]",
                "extensions": [".pcss",".css"],
            }
            ],
            ["transform-decorators-legacy"],
            ["transform-runtime"]
        ],
        babelrc: false,
        // cacheDirectory: true
    },
    pro_server: {
        presets: [
            ["env", {
                "targets": {"node": "current"}
            }],
            ["stage-0"],
            ["react"]
        ],
        "plugins": [
            [
                "css-modules-transform", {
                // "preprocessCss": "./loaders/sass-loader.js",
                "generateScopedName": "[name]_[local]-[hash:base64:4]",
                "extensions": [".pcss",".css"],
            }
            ],
            ["transform-decorators-legacy"],
            ["transform-runtime"]
        ],
        babelrc: false
    }
}
