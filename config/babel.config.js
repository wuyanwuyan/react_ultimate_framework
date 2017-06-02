module.exports = {
    dev_client: {
        presets: ["es2015", "stage-0", "react","react-hmre"],
        "plugins": ["transform-decorators-legacy", "transform-runtime"],
        cacheDirectory: true
    },

    pro_client: {
        presets: ["es2015", "stage-0", "react"],
        "plugins": ["transform-decorators-legacy", "transform-runtime"]
    },

    dev_server: {
        presets: ["react"],
        "plugins": ["transform-decorators-legacy", "transform-runtime"],
        cacheDirectory: true
    }
}
