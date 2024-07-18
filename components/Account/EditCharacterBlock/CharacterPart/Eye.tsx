import React, { useRef, useEffect, useState, useCallback } from "react";
import * as THREE from "three";
import { loadObjAsync, loadTextureAsync } from "expo-three";
import { resourceMappingEye } from "./ressourceMappingEye";

interface EyeProps {
  selectedItem8: keyof typeof resourceMappingEye;
  setIsLoaded?: () => void;
}

export default function Eye(props: EyeProps) {
  const { selectedItem8, setIsLoaded } = props;
  const mesh = useRef<THREE.Mesh | null>(null);
  const [obj, setObj] = useState<THREE.Object3D | null>(null);
  const [textureLoaded, setTextureLoaded] = useState<boolean>(false);
  const [textureChanging, setTextureChanging] = useState<boolean>(false);
  const { obj: objPath, texture } = resourceMappingEye[selectedItem8] || {};

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
        }
      });

      setTextureLoaded(true);
      setTextureChanging(false);
    } catch (error) {
      console.error("Error Loading Texture:", error);
    }
  }, [obj, texture]);

  useEffect(() => {
    const loadObjectAndTexture = async () => {
      const [objResult, textureResult] = await Promise.all([
        loadObjAsync({
          asset: objPath,
        }),
        loadTextureAsync({
          asset: texture,
        }),
      ]);

      setObj(objResult);
      objResult?.traverse((child: THREE.Object3D | null) => {
        if (child instanceof THREE.Mesh) {
          child.material.map = textureResult;
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
    if (obj && texture) {
      setTextureChanging(true);
      loadAndApplyTexture();
    }
  }, [selectedItem8]);

  if (!obj || (!textureLoaded && !textureChanging)) {
    return null;
  }

  return (
    <mesh ref={mesh} rotation={[0.2, 0, 0]} scale={1.8}>
      <primitive object={obj} />
    </mesh>
  );
}
