const ASSET_PATH_PREFIX = "../../../../assets/models/OBJ/NOOSE/";
const SUBASSET_PATH_PREFIX = "../../../../assets/models/OBJ/HEAD/";

const resourceMappingNoose = {
  noose1: {
    obj: require(`${ASSET_PATH_PREFIX}noose.obj`),
    texture: require(`${SUBASSET_PATH_PREFIX}Diffuse_face_light.xjpg`),
    texture1: require(`${SUBASSET_PATH_PREFIX}Diffuse_face_dark.xjpg`),
    texture2: require(`${SUBASSET_PATH_PREFIX}Diffuse_face_dark_dark.xjpg`),
    texture3: require(`${SUBASSET_PATH_PREFIX}Diffuse_face_light_yellow.xjpg`),
  },
  // Ajoutez d'autres actifs ici...
};

export { resourceMappingNoose };
