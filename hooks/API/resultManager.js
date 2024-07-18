import objectTypes from "./ObjectTypes/index.ts";

export default function resultManager(objType, result) {
    if (Array.isArray(result)) {
        if (result.length === 0)
            return [];
        const objReturn = [];
        for (let row = 0; row < result.length; row++) {
            objReturn.push(new objectTypes[objType](result[row]));
        }
        return objReturn;
    }
    return new objectTypes[objType](result);
}

export const emptyObjectType = (objType) => {
    return new objectTypes[objType]();
}