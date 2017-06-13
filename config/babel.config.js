module.exports = {
    dev_client: {
        // presets: ["es2015", "stage-0", "react", "react-hmre"],
        presets: ["es2015", "stage-0", "react"],
        "plugins": ["transform-decorators-legacy", "transform-runtime"],
        cacheDirectory: true
    },

    pro_client: {
        presets: ["es2015", "stage-0", "react"],
        "plugins": ["transform-decorators-legacy", "transform-runtime"]
    },

    dev_server: {
        presets: [
            ["env", {
                "targets": {"node": "current"}
            }],
            ["stage-0"],
            ["react"]
        ],
        "plugins": ["transform-decorators-legacy", "transform-runtime"],
        cacheDirectory: true
    }
}
