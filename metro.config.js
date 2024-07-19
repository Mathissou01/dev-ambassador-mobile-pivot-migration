// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Ajouter les extensions de fichiers source personnalisées
config.resolver.sourceExts.push("sass", "scss", "xjpg", "mjs");

// Ajouter les extensions d'assets personnalisées
config.resolver.assetExts.push(
    "png",
    "jpg",
    "jpeg",
    "xpng",
    "xjpeg",
    "xjpg",
    "ttf",
    "otf",
    "db",
    "glb",
    "gltf",
    "obj",
    "mtl",
    "wav",
    "mp3",
    "mp4",
    "mjs"
);

// Configurer le transformateur
config.transformer = {
    ...config.transformer,
    getTransformOptions: async () => ({
        transform: {
            experimentalImportSupport: false,
            inlineRequires: true,
        },
    }),
};

module.exports = config;
