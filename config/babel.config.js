module.exports = {
    dev_client: {
        // presets: ["es2015", "stage-0", "react", "react-hmre"],
        presets: ["es2015", "stage-0", "react"],
        "plugins": [
            ["transform-decorators-legacy"],
            ["transform-runtime"],
            ["import", {
                "libraryName": "antd",
                "style": "css"
            }]
        ],
        cacheDirectory: true,
        babelrc:false
    },

    pro_client: {
        presets: ["es2015", "stage-0", "react"],
        "plugins": [
            ["transform-decorators-legacy"],
            ["transform-runtime"],
            ["import", {
                "libraryName": "antd",
                "style": "css"
            }]
        ],
        babelrc:false
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
            ["transform-decorators-legacy"],
            ["transform-runtime"],
            ["import", {
                "libraryName": "antd"
            }]
        ],
        cacheDirectory: true,
        babelrc:false
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
            ["transform-decorators-legacy"],
            ["transform-runtime"],
            ["import", {
                "libraryName": "antd"
            }]
        ],
        babelrc:false
    }
}
