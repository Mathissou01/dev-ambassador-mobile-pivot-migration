import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { loadObjAsync, loadTextureAsync } from "expo-three";
import { resourceMappingTeeth } from "./ressourceMappingTeeth";

interface TeethProps {
  selectedTeeth: keyof typeof resourceMappingTeeth;
  setIsLoaded?: () => void;
}

export default function Teeth(props: TeethProps) {
  const { selectedTeeth, setIsLoaded } = props;
  const mesh = useRef<THREE.Mesh | null>(null);
  const [obj, setObj] = useState<THREE.Object3D | null>(null);
  const [textureLoaded, setTextureLoaded] = useState<boolean>(false);
  const [textureChanging, setTextureChanging] = useState<boolean>(false);
  const { obj: objPath, texture } = resourceMappingTeeth[selectedTeeth] || {};

  const loadAndApplyTexture = useMemo(
    () => async () => {
      try {
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
    },
    [obj, texture]
  );

  useEffect(() => {
    const loadObjectAndTexture = async () => {
      await resourceMappingTeeth;

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

      if (setIsLoaded) {
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
  }, [selectedTeeth]);

  if (!obj || (!textureLoaded && !textureChanging)) {
    return null;
  }

  return (
    <mesh ref={mesh} rotation={[0.2, 0, 0]} scale={1.8}>
      <primitive object={obj} />
    </mesh>
  );
}
