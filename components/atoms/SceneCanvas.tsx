"use client";

import { Canvas, type CanvasProps } from "@react-three/fiber";
import type { ReactNode } from "react";

type SceneCanvasProps = {
  children: ReactNode;
  backgroundColor: string;
  orthographic?: boolean;
} & Pick<CanvasProps, "camera" | "gl">;

export function SceneCanvas({
  children,
  backgroundColor,
  orthographic = false,
  camera,
  gl,
}: SceneCanvasProps) {
  return (
    <Canvas
      className="h-full w-full"
      orthographic={orthographic}
      camera={camera}
      gl={gl}
      onCreated={({ gl: renderer }) => {
        renderer.setClearColor(backgroundColor);
        renderer.shadowMap.enabled = true;
      }}
      shadows="basic"
      dpr={[1, 2]}
    >
      <color attach="background" args={[backgroundColor]} />
      {children}
    </Canvas>
  );
}
