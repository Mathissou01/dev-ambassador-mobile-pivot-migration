const ASSET_PATH_PREFIX = "../../../../assets/models/OBJ/TONGUE/";
const SUBASSET_PATH_PREFIX = "../../../../assets/models/OBJ/HEAD/";

const resourceMappingTongue = {
  tongue1: {
    obj: require(`${ASSET_PATH_PREFIX}tongue1.obj`),
    texture: require(`${SUBASSET_PATH_PREFIX}Diffuse_face_light.xjpg`),
  },
  tongue8: {
    obj: require(`${ASSET_PATH_PREFIX}tongue8.obj`),
    texture: require(`${SUBASSET_PATH_PREFIX}Diffuse_face_light.xjpg`),
  },
  tongue11: {
    obj: require(`${ASSET_PATH_PREFIX}tongue11.obj`),
    texture: require(`${SUBASSET_PATH_PREFIX}Diffuse_face_light.xjpg`),
  },
};

export { resourceMappingTongue };
