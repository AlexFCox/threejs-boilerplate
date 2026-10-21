"use client";

import { useMemo } from "react";
import * as THREE from "three";

type BorderedGroundPlaneProps = {
  size: number;
  fillColor: string;
  borderColor: string;
};

export function BorderedGroundPlane({
  size,
  fillColor,
  borderColor,
}: BorderedGroundPlaneProps) {
  const borderGeometry = useMemo(() => {
    const half = size / 2;
    const y = 0.002;
    const points = [
      new THREE.Vector3(-half, y, -half),
      new THREE.Vector3(half, y, -half),
      new THREE.Vector3(half, y, half),
      new THREE.Vector3(-half, y, half),
    ];
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [size]);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[size, size]} />
        <meshStandardMaterial color={fillColor} roughness={0.9} metalness={0} />
      </mesh>
      <lineLoop geometry={borderGeometry}>
        <lineBasicMaterial color={borderColor} linewidth={1} />
      </lineLoop>
    </group>
  );
}
