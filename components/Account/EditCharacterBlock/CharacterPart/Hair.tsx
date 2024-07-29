import React, { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { loadObjAsync, loadTextureAsync } from "expo-three";
import { resourceMappingHair } from "./ressourceMappingHair";

interface HairProps {
  selectedItem: keyof typeof resourceMappingHair;
  setIsLoaded?: () => void;
}

export default function Hair(props: HairProps) {
  const { selectedItem, setIsLoaded } = props;
  const mesh = useRef<THREE.Mesh | null>(null);
  const [obj, setObj] = useState<THREE.Object3D | null>(null);
  const [textureLoaded, setTextureLoaded] = useState<boolean>(false);
  const [textureChanging, setTextureChanging] = useState<boolean>(false);
  const { obj: objPath, texture } = resourceMappingHair[selectedItem] || {};

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
    if (selectedItem === "hair0") {
      // Set obj to null to make the object disappear
      setObj(null);
      setTextureLoaded(false);
    } else if (obj && texture) {
      setTextureChanging(true);
      loadAndApplyTexture();
    }
  }, [selectedItem]);

  if (!obj || (!textureLoaded && !textureChanging)) {
    return null;
  }

  return (
    <mesh ref={mesh} rotation={[0.2, 0, 0]} scale={1.8} receiveShadow={true}>
      <primitive object={obj} />
    </mesh>
  );
}
