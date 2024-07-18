import React, { useRef, useEffect, useState, useCallback } from "react";
import * as THREE from "three";
import { loadObjAsync, loadTextureAsync } from "expo-three";
import { resourceMappingGlass } from "./ressourceMappingGlass";

interface GlassProps {
  selectedItem5: keyof typeof resourceMappingGlass;
  setIsLoaded?: () => void;
}

export default function Glass(props: GlassProps) {
  const { selectedItem5, setIsLoaded } = props;
  const mesh = useRef<THREE.Mesh | null>(null);
  const [obj, setObj] = useState<THREE.Object3D | null>(null);
  const [textureLoaded, setTextureLoaded] = useState<boolean>(false);
  const [textureChanging, setTextureChanging] = useState<boolean>(false);
  const { obj: objPath, texture, textureAlpha } = resourceMappingGlass[selectedItem5] || {};

  const loadAndApplyTexture = useCallback(async () => {
    try {
      if (!texture) {
        console.warn("Texture asset is null.");
        return;
      }
      const [textureResult, alphaTextureResult] = await Promise.all([
        loadTextureAsync({
          asset: texture,
        }),
        textureAlpha
          ? loadTextureAsync({
              asset: textureAlpha, // Load the alpha texture if it exists
            })
          : null,
      ]);

      obj?.traverse((child: THREE.Object3D | null) => {
        if (child instanceof THREE.Mesh) {
          // Utilisez le nom du mesh pour cibler spécifiquement le mesh "glass" ou "frame"
          if (child.name.startsWith("glass.")) {
            // Définir le mode de mélange sur NormalBlending
            child.material.blending = THREE.NormalBlending;
            child.material.opacity = 0.8;
            if (alphaTextureResult) {
              child.material.map = alphaTextureResult;
              child.material.transparent = true; // Activer la transparence
            }
          } else if (child.name.startsWith("frame.")) {
            // Appliquer la texture map au mesh "frame.001" ou "frame.002", etc.
            child.material.map = textureResult;
          }
        }
      });

      setTextureLoaded(true);
      setTextureChanging(false);
    } catch (error) {
      console.error("Error Loading Texture:", error);
    }
  }, [obj, texture, textureAlpha]);

  useEffect(() => {
    const loadObjectAndTexture = async () => {
      const [objResult, textureResult, alphaTextureResult] = await Promise.all([
        loadObjAsync({
          asset: objPath,
        }),
        loadTextureAsync({
          asset: texture,
        }),
        textureAlpha
          ? loadTextureAsync({
              asset: textureAlpha, // Load the alpha texture if it exists
            })
          : null,
      ]);

      setObj(objResult);
      objResult?.traverse((child: THREE.Object3D | null) => {
        if (child instanceof THREE.Mesh) {
          // Utilisez le nom du mesh pour cibler spécifiquement le mesh "glass" ou "frame"
          if (child.name.startsWith("glass.")) {
            // Définir le mode de mélange sur NormalBlending
            child.material.blending = THREE.NormalBlending;
            child.material.opacity = 0.8;
            if (alphaTextureResult) {
              child.material.map = alphaTextureResult;
              child.material.transparent = true; // Activer la transparence
            }
          } else if (child.name.startsWith("frame.")) {
            // Appliquer la texture map au mesh "frame.001" ou "frame.002", etc.
            child.material.map = textureResult;
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
    if (selectedItem5 === "glass0") {
      // Set obj to null to make the object disappear
      setObj(null);
      setTextureLoaded(false);
    } else if (obj && texture) {
      // Check if textureAlpha exists and needs to be loaded
      if (textureAlpha) {
        setTextureChanging(true);
        loadAndApplyTexture();
      } else {
        // No textureAlpha, so no need to load it
        setTextureLoaded(true);
      }
    }
  }, [selectedItem5]);

  if (!obj || (!textureLoaded && !textureChanging)) {
    return null;
  }

  return (
    <mesh ref={mesh} rotation={[0.2, 0, 0]} scale={1.8}>
      <primitive object={obj} />
    </mesh>
  );
}
