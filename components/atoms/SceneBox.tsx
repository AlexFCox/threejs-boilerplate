"use client";

type SceneBoxProps = {
  size: number;
  color: string;
  position?: [number, number, number];
};

export function SceneBox({
  size,
  color,
  position = [0, 0, 0],
}: SceneBoxProps) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={color} roughness={0.45} metalness={0.05} />
    </mesh>
  );
}
