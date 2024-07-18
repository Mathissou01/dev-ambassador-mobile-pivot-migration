import React, { useEffect, useCallback, useRef, useState } from "react";
import * as THREE from "three";
import { loadObjAsync, loadTextureAsync } from "expo-three";
import { resourceMappingEarings } from "./ressourceMappingEarings";

interface EaringsProps {
  selectedItem4: keyof typeof resourceMappingEarings;
  setIsLoaded?: () => void;
}

export default function Earings(props: EaringsProps) {
  const { selectedItem4, setIsLoaded } = props;
  const mesh = useRef<THREE.Mesh | null>(null);
  const [obj, setObj] = useState<THREE.Object3D | null>(null);
  const [textureLoaded, setTextureLoaded] = useState<boolean>(false);
  const [textureChanging, setTextureChanging] = useState<boolean>(false);
  const { obj: objPath, texture, textureMetallic } = resourceMappingEarings[selectedItem4] || {};

  const loadAndApplyTexture = useCallback(async () => {
    try {
      if (!texture) {
        console.warn("Texture asset is null.");
        return;
      }
      const textureResult = await loadTextureAsync({
        asset: texture,
      });

      obj?.traverse((child: THREE.Object3D | null) => {
        if (child instanceof THREE.Mesh) {
          child.material.map = textureResult;
          child.material.roughness = 0.2;
          child.material.flatShading = true;
          if (textureMetallic) {
            child.material.metalness = textureMetallic;
          }
        }
      });

      setTextureLoaded(true);
      setTextureChanging(false);
    } catch (error) {
      console.error("Error Loading Texture:", error);
    }
  }, [obj, texture, textureMetallic]);

  useEffect(() => {
    const loadObjectAndTexture = async () => {
      const [objResult, textureResult, textureMetallic] = await Promise.all([
        loadObjAsync({
          asset: objPath,
        }),
        loadTextureAsync({
          asset: texture,
        }),
        textureMetallic
          ? loadTextureAsync({
              asset: textureMetallic, // Load the alpha texture if it exists
            })
          : null,
      ]);

      setObj(objResult);
      objResult?.traverse((child: THREE.Object3D | null) => {
        if (child instanceof THREE.Mesh) {
          child.material.map = textureResult;
          child.material.roughness = 0.2;
          child.material.flatShading = true;
          if (textureMetallic) {
            child.material.metalness = textureMetallic;
          }
        }
      });
      if (setIsLoaded != null) {
        setIsLoaded();
      }
      setTextureLoaded(true);
    };

    loadObjectAndTexture();
  }, [objPath, texture]);

  useEffect(() => {
    if (selectedItem4 === "earings0") {
      // Set obj to null to make the object disappear
      setObj(null);
      setTextureLoaded(false);
    } else if (obj && texture) {
      setTextureChanging(true);
      loadAndApplyTexture();
    }
  }, [selectedItem4]);

  if (!obj || (!textureLoaded && !textureChanging)) {
    return null;
  }

  return (
    <mesh ref={mesh} rotation={[0.2, 0, 0]} scale={1.8}>
      <primitive object={obj} />
    </mesh>
  );
}
