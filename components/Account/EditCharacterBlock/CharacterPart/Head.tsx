import React, { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { loadObjAsync, loadTextureAsync } from "expo-three";
import { resourceMappingHead } from "./ressourceMappingHead";
import { type resourceMappingSkin } from "./ressourceMappingSkin";

interface HeadProps {
  selectedItem2: keyof typeof resourceMappingHead;
  selectedItem12: keyof typeof resourceMappingSkin;
  setIsLoaded?: () => void;
}

export default function Head(props: HeadProps) {
  const { selectedItem2, selectedItem12, setIsLoaded } = props;
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
  } = resourceMappingHead[selectedItem2] || {};

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
            child.material.roughness = 0.1; // Try different values for a metallic look
          }
        });

        setTextureLoaded(true);
        setTextureChanging(false);
      } catch (error) {
        console.error("Error Loading Texture:", error);
      }
    },
    [obj]
  );

  useEffect(() => {
    const loadObjectAndTexture = async () => {
      const [objResult, textureResult] = await Promise.all([
        loadObjAsync({
          asset: objPath,
        }),
        loadTextureAsync({
          asset: selectedItem2 === "texture1" ? texture1 : texture, // Utilisez selectedItem2 pour choisir la texture
        }),
      ]);

      setObj(objResult);
      objResult?.traverse((child: THREE.Object3D | null) => {
        if (child instanceof THREE.Mesh) {
          child.material.map = textureResult;
          child.material.roughness = 0.1; // Try different values for a metallic look
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
  }, [selectedItem2, selectedItem12, obj]);

  if (!obj || (!textureLoaded && !textureChanging)) {
    return null;
  }

  return (
    <mesh ref={mesh} rotation={[0.2, 0, 0]} scale={1.8} receiveShadow={true}>
      <primitive object={obj} />
    </mesh>
  );
}
