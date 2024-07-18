// Learn more https://docs.expo.io/guides/customizing-metro
const {getDefaultConfig} = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// config.resolver.assetExts.push(
//     // Adds support for `.db` files for SQLite databases
//     "png",
//     "jpg",
//     "jpeg",
//     "xpng",
//     "xjpeg",
//     "xjpg",
//     "ttf",
//     "otf",
//     "db",
//     "glb",
//     "gltf",
//     "obj",
//     "mtl",
//     "wav",
//     "mp3",
//     "mp4",
//     "mjs",
// );

module.exports = config;
