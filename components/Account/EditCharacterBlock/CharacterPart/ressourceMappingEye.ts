const ASSET_PATH_PREFIX = "../../../../assets/models/OBJ/EYE/";
const SUBASSET_PATH_PREFIX = "../../../../assets/models/OBJ/HEAD/";

const resourceMappingEye = {
  eye1: {
    obj: require(`${ASSET_PATH_PREFIX}eye.obj`),
    texture: require(`${SUBASSET_PATH_PREFIX}Diffuse_face_light.xjpg`),
  },
  // Ajoutez d'autres actifs ici...
};

export { resourceMappingEye };
