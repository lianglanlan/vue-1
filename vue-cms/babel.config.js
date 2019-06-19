module.exports = function (api) {
    api.cache(true)
    const presets = ["@babel/preset-env"]
    const plugins = [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-transform-runtime",
        "transform-remove-strict-mode",
        ["component",
            {
                "libraryName": "mint-ui",
                "style": true
            }
        ]
    ]

    return {
        presets,
        plugins
    }
}