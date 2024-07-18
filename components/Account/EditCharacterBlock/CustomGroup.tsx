import React, { forwardRef, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SensorType, useAnimatedSensor } from "react-native-reanimated";

interface CustomGroupProps {
  children: React.ReactNode;
  setGyroscopeActive: boolean;
}

const CustomGroup = forwardRef<THREE.Group, CustomGroupProps>((props, ref) => {
  const groupRef = useRef<THREE.Group | null>(null);

  // Sensor properties
  const animatedSensor = useAnimatedSensor(SensorType.GYROSCOPE, {
    interval: 100,
  });

  // State to track recentring
  const [recentring, setRecentring] = useState(false);
  const recentringSpeed = 0.03; // Augmentez cette valeur pour une sensibilité accrue

  useFrame(() => {
    if (props.setGyroscopeActive && groupRef.current && animatedSensor) {
      const { x, y } = animatedSensor.sensor.value;
      const maxRotationX = Math.PI / 9;
      const minRotationX = -Math.PI / 9;
      const maxRotationY = Math.PI / 7;
      const minRotationY = -Math.PI / 7;

      const rotationSpeedX = 0.01;
      const rotationSpeedY = 0.01;

      if (recentring) {
        // Apply rotation to recentre
        const targetRotationX = 0;
        const targetRotationY = 0;

        groupRef.current.rotation.x +=
          (targetRotationX - groupRef.current.rotation.x) * recentringSpeed;
        groupRef.current.rotation.y +=
          (targetRotationY - groupRef.current.rotation.y) * recentringSpeed;

        // Check if we are close enough to stop recentring
        const epsilon = 0.01;
        if (
          Math.abs(targetRotationX - groupRef.current.rotation.x) < epsilon &&
          Math.abs(targetRotationY - groupRef.current.rotation.y) < epsilon
        ) {
          setRecentring(false);
        }
      } else {
        // Normal rotation
        groupRef.current.rotation.x = THREE.MathUtils.clamp(
          groupRef.current.rotation.x + x * rotationSpeedX,
          minRotationX,
          maxRotationX
        );

        groupRef.current.rotation.y = THREE.MathUtils.clamp(
          groupRef.current.rotation.y + y * rotationSpeedY,
          minRotationY,
          maxRotationY
        );

        // Check if we should start recentring
        const recentringThreshold = 0.5; // Augmentez cette valeur pour une sensibilité accrue
        if (
          Math.abs(groupRef.current.rotation.x) > recentringThreshold ||
          Math.abs(groupRef.current.rotation.y) > recentringThreshold
        ) {
          setRecentring(true);
        }
      }
    }
  });

  return (
    <group
      {...props}
      ref={(group) => {
        groupRef.current = group;
        ref.current = group;
      }}
    >
      {props.children}
    </group>
  );
});

export default CustomGroup;
