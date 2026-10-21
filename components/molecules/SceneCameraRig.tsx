"use client";

import { useThree } from "@react-three/fiber";
import { useLayoutEffect } from "react";
import * as THREE from "three";
import {
  applyCameraOrbit,
  getPerspectiveFov,
} from "@/lib/scene/camera";
import { SCENE_TARGET, type CameraOrbit } from "@/lib/scene/orbit";

type SceneCameraRigProps = {
  zoom: number;
  cameraOrbit: CameraOrbit;
};

/** Updates only the R3F camera — scene geometry is not transformed. */
export function SceneCameraRig({
  zoom,
  cameraOrbit,
}: SceneCameraRigProps) {
  const { camera, size } = useThree();

  useLayoutEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) {
      return;
    }

    const target = new THREE.Vector3(
      SCENE_TARGET.x,
      SCENE_TARGET.y,
      SCENE_TARGET.z,
    );

    applyCameraOrbit(camera, target, cameraOrbit);

    const aspect = size.width / Math.max(size.height, 1);
    camera.fov = THREE.MathUtils.clamp(
      getPerspectiveFov(zoom, size.height),
      8,
      75,
    );
    camera.aspect = aspect;
    camera.near = 0.1;
    camera.far = 200;
    camera.updateProjectionMatrix();
  }, [
    camera,
    cameraOrbit.pitchDeg,
    cameraOrbit.yawDeg,
    cameraOrbit.rollDeg,
    size.height,
    size.width,
    zoom,
  ]);

  return null;
}
