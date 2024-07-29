import React, { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { loadObjAsync, loadTextureAsync } from "expo-three";
import { resourceMappingEar } from "./ressourceMappingEar";
import { type resourceMappingSkin } from "./ressourceMappingSkin";

interface EarProps {
  selectedItem9: keyof typeof resourceMappingEar;
  selectedItem12: keyof typeof resourceMappingSkin;
  setIsLoaded?: () => void;
}

export default function Ear(props: EarProps) {
  const { selectedItem9, selectedItem12, setIsLoaded } = props;
  const mesh = useRef<THREE.Mesh | null>(null);
  const [obj, setObj] = useState<THREE.Object3D | null>(null);
  const [textureLoaded, setTextureLoaded] = useState<boolean>(false);
  const [textureChanging, setTextureChanging] = useState<boolean>(false);
  const {
    obj: objPath,
    texture,
    texture1,
    texture2,
    texture3,
  } = resourceMappingEar[selectedItem9] || {};

  const loadAndApplyTexture = useCallback(
    async (selectedTexture: string) => {
      try {
        if (!texture) {
          console.warn("Texture asset is null.");
          return;
        }
        const textureResult = await loadTextureAsync({
          asset: selectedTexture,
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
    },
    [obj, texture]
  );

  useEffect(() => {
    const loadObjectAndTexture = async () => {
      const [objResult, textureResult] = await Promise.all([
        loadObjAsync({
          asset: objPath,
        }),
        loadTextureAsync({
          asset: selectedItem9 === "texture1" ? texture1 : texture,
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
    if (obj) {
      setTextureChanging(true);

      let selectedTexture;
      switch (selectedItem12) {
        case "skin1":
          selectedTexture = texture;
          break;
        case "skin2":
          selectedTexture = texture1;
          break;
        case "skin3":
          selectedTexture = texture2;
          break;
        case "skin4":
          selectedTexture = texture3; // Ajout de la logique pour skin4
          break;
        default:
          selectedTexture = texture; // Par défaut, utilisez la texture
          break;
      }

      loadAndApplyTexture(selectedTexture);
    }
  }, [selectedItem9, selectedItem12, obj]);

  if (!obj || (!textureLoaded && !textureChanging)) {
    return null;
  }

  return (
    <mesh ref={mesh} rotation={[0.2, 0, 0]} scale={1.8}>
      <primitive object={obj} />
    </mesh>
  );
}
