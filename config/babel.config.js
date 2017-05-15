module.exports = {
    dev_client: {
        presets: ["es2015", "stage-0", "react"],
        "plugins": ["transform-decorators-legacy", "transform-runtime"],
        cacheDirectory: true
    },

    dev_server: {
        "plugins": ["transform-decorators-legacy", "transform-runtime"],
        cacheDirectory: true
    }
}
