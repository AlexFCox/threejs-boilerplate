import * as THREE from "three";
import {
  CAMERA_DISTANCE,
  CAMERA_ORBIT_LIMITS,
  SCENE_TARGET,
  type CameraOrbit,
} from "@/lib/scene/orbit";

/**
 * Baseline canvas height (px) for UI zoom = 100%.
 * @see https://threejs.org/docs/#api/en/cameras/PerspectiveCamera
 */
export const REFERENCE_VIEWPORT_HEIGHT_PX = 800;

export const BASE_FOV = 42;

export const ORBIT_WORLD_UP = new THREE.Vector3(0, 1, 0);

const PHI_MIN = THREE.MathUtils.degToRad(0.4);
const PHI_MAX = THREE.MathUtils.degToRad(89);

const _offset = new THREE.Vector3();
const _forward = new THREE.Vector3();
const _right = new THREE.Vector3();
const _up = new THREE.Vector3();
const _lookMatrix = new THREE.Matrix4();
const _rollQuat = new THREE.Quaternion();
const _localZ = new THREE.Vector3(0, 0, 1);

export function pitchDegToPhi(pitchDeg: number): number {
  const t = THREE.MathUtils.clamp(
    pitchDeg / CAMERA_ORBIT_LIMITS.pitch.max,
    0,
    1,
  );
  return THREE.MathUtils.lerp(PHI_MIN, PHI_MAX, t);
}

export function getEffectiveZoomScale(
  userZoom: number,
  viewportHeightPx: number,
): number {
  const referenceScale = viewportHeightPx / REFERENCE_VIEWPORT_HEIGHT_PX;
  return userZoom * referenceScale;
}

export function getPerspectiveFov(
  userZoom: number,
  viewportHeightPx: number,
): number {
  const zoomScale = Math.max(
    getEffectiveZoomScale(userZoom, viewportHeightPx),
    0.05,
  );
  return BASE_FOV / zoomScale;
}

function computeCameraUp(
  eye: THREE.Vector3,
  target: THREE.Vector3,
  yawRad: number,
): THREE.Vector3 {
  _forward.subVectors(target, eye).normalize();
  _right.crossVectors(ORBIT_WORLD_UP, _forward);

  if (_right.lengthSq() < 1e-8) {
    _right.set(Math.cos(yawRad), 0, -Math.sin(yawRad));
  } else {
    _right.normalize();
  }

  return _up.crossVectors(_forward, _right).normalize();
}

/**
 * Moves and rotates the **camera only**. Scene meshes stay in world space at the origin.
 */
export function applyCameraOrbit(
  camera: THREE.PerspectiveCamera,
  target: THREE.Vector3,
  orbit: CameraOrbit,
): void {
  const phi = pitchDegToPhi(orbit.pitchDeg);
  const theta = THREE.MathUtils.degToRad(orbit.yawDeg);
  const roll = THREE.MathUtils.degToRad(orbit.rollDeg);

  _offset.setFromSpherical(
    new THREE.Spherical(CAMERA_DISTANCE, phi, theta),
  );
  camera.position.copy(target).add(_offset);

  const up = computeCameraUp(camera.position, target, theta);
  _lookMatrix.lookAt(camera.position, target, up);
  camera.quaternion.setFromRotationMatrix(_lookMatrix);

  if (roll !== 0) {
    _rollQuat.setFromAxisAngle(_localZ, roll);
    camera.quaternion.multiply(_rollQuat);
  }

  camera.up.copy(up);
}

/** @deprecated Use {@link applyCameraOrbit} */
export const applyOrbitToCamera = applyCameraOrbit;
