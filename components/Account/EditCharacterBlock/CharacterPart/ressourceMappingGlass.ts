const ASSET_PATH_PREFIX = "../../../../assets/models/OBJ/GLASS/";
const SUBASSET_PATH_PREFIX = "../../../../assets/models/OBJ/EARINGS/";


const resourceMappingGlass = {
  glass0: {
    obj: null,
    texture: null,
    textureAlpha: null,
  },
  glass1: {
    obj: require(`${ASSET_PATH_PREFIX}glass1.obj`),
    texture: require(`${ASSET_PATH_PREFIX}Diffuse_sunglasses_001.xjpg`),
    textureAlpha: require(`${ASSET_PATH_PREFIX}Diffuse_glass_001-alpha_glass.xpng`),
  },
  glass2: {
    obj: require(`${ASSET_PATH_PREFIX}glass2.obj`),
    texture: require(`${ASSET_PATH_PREFIX}Diffuse_sunglasses_002.xjpg`),
    textureAlpha: require(`${ASSET_PATH_PREFIX}Diffuse_glass_002-alpha_glass.xpng`),
  },
  glass3: {
    obj: require(`${ASSET_PATH_PREFIX}glass3.obj`),
    texture: require(`${ASSET_PATH_PREFIX}Diffuse_sunglasses_003.xjpg`),
    textureAlpha: require(`${ASSET_PATH_PREFIX}Diffuse_glass_004-alpha_glass.xpng`),
  },
  glass4: {
    obj: require(`${ASSET_PATH_PREFIX}glass4.obj`),
    texture: require(`${ASSET_PATH_PREFIX}Diffuse_sunglasses_004.xjpg`),
    textureAlpha: require(`${ASSET_PATH_PREFIX}Diffuse_glass_004-alpha_glass.xpng`),
  },
  glass5: {
    obj: require(`${ASSET_PATH_PREFIX}glass5.obj`),
    texture: require(`${ASSET_PATH_PREFIX}Diffuse_sunglasses_005.xjpg`),
    textureAlpha: require(`${ASSET_PATH_PREFIX}Diffuse_glass_007-alpha_glass.xpng`),
  },
  glass6: {
    obj: require(`${ASSET_PATH_PREFIX}glass6.obj`),
    texture: require(`${ASSET_PATH_PREFIX}Diffuse_sunglasses_006.xjpg`),
    textureAlpha: require(`${ASSET_PATH_PREFIX}Diffuse_glass_007-alpha_glass.xpng`),
  },
  glass7: {
    obj: require(`${ASSET_PATH_PREFIX}glass7.obj`),
    texture: require(`${ASSET_PATH_PREFIX}Diffuse_sunglasses_007.xjpg`),
    textureAlpha: require(`${ASSET_PATH_PREFIX}Diffuse_glass_007-alpha_glass.xpng`),
  },
  glass8: {
    obj: require(`${ASSET_PATH_PREFIX}glass8.obj`),
    texture: require(`${ASSET_PATH_PREFIX}Diffuse_sunglasses_008.xjpg`),
    textureAlpha: require(`${ASSET_PATH_PREFIX}Diffuse_glass_008-alpha_glass.xpng`),
  },
  glass9: {
    obj: require(`${ASSET_PATH_PREFIX}glass9.obj`),
    texture: require(`${SUBASSET_PATH_PREFIX}Diffuse_earrings_001.xjpg`),
    textureAlpha: require(`${ASSET_PATH_PREFIX}Diffuse_glass_008-alpha_glass.xpng`),
  },
  glass10: {
    obj: require(`${ASSET_PATH_PREFIX}glass10.obj`),
    texture: require(`${ASSET_PATH_PREFIX}Diffuse_sunglasses_010.xjpg`),
    textureAlpha: require(`${ASSET_PATH_PREFIX}Diffuse_glass_010-alpha_glass.xpng`),
  },
  glass11: {
    obj: require(`${ASSET_PATH_PREFIX}glass11.obj`),
    texture: require(`${ASSET_PATH_PREFIX}Diffuse_sunglasses_011.xjpg`),
    textureAlpha: require(`${ASSET_PATH_PREFIX}Diffuse_glass_010-alpha_glass.xpng`),
  },
  glass12: {
    obj: require(`${ASSET_PATH_PREFIX}glass12.obj`),
    texture: require(`${ASSET_PATH_PREFIX}Diffuse_sunglasses_012.xjpg`),
  },
};

export { resourceMappingGlass };
