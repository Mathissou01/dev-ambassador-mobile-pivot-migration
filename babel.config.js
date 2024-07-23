module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: [
            "react-native-classname-to-dynamic-style",
            "react-native-worklets-core/plugin",
            "react-native-reanimated/plugin",
        ],
    };
};
