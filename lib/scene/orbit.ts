import { uiChrome } from "@/lib/styleguide/tokens";

/** World-space point the camera always looks at (scene never moves for orbit). */
export const SCENE_TARGET = { x: 0, y: 0, z: 0 } as const;

/** Fixed orbit radius: camera moves on this sphere around {@link SCENE_TARGET}. */
export const CAMERA_DISTANCE = 10;

/** Camera-only orbit angles (degrees). Does not rotate scene meshes. */
export type CameraOrbit = {
  /** Pitch down toward the scene (0 = near top-down). */
  pitchDeg: number;
  /** Yaw around world Y through the target. */
  yawDeg: number;
  /** Roll around the camera view axis. */
  rollDeg: number;
};

export const DEFAULT_CAMERA_ORBIT: CameraOrbit = {
  pitchDeg: 0,
  yawDeg: 0,
  rollDeg: 0,
};

export const CAMERA_ORBIT_LIMITS = {
  pitch: { min: 0, max: 85 },
  yaw: { min: -180, max: 180 },
  roll: { min: -90, max: 90 },
} as const;

/** @deprecated Use {@link CameraOrbit} */
export type SceneOrbit = CameraOrbit;

/** @deprecated Use {@link DEFAULT_CAMERA_ORBIT} */
export const DEFAULT_ORBIT = DEFAULT_CAMERA_ORBIT;

/** @deprecated Use {@link CAMERA_ORBIT_LIMITS} */
export const ORBIT_LIMITS = {
  x: CAMERA_ORBIT_LIMITS.pitch,
  y: CAMERA_ORBIT_LIMITS.yaw,
  z: CAMERA_ORBIT_LIMITS.roll,
};

export function clampCameraOrbit(orbit: CameraOrbit): CameraOrbit {
  return {
    pitchDeg: Math.min(
      CAMERA_ORBIT_LIMITS.pitch.max,
      Math.max(CAMERA_ORBIT_LIMITS.pitch.min, orbit.pitchDeg),
    ),
    yawDeg: Math.min(
      CAMERA_ORBIT_LIMITS.yaw.max,
      Math.max(CAMERA_ORBIT_LIMITS.yaw.min, orbit.yawDeg),
    ),
    rollDeg: Math.min(
      CAMERA_ORBIT_LIMITS.roll.max,
      Math.max(CAMERA_ORBIT_LIMITS.roll.min, orbit.rollDeg),
    ),
  };
}

/** @deprecated Use {@link clampCameraOrbit} */
export const clampOrbit = clampCameraOrbit;

export const CAMERA_SLIDER_WIDTH_PX = uiChrome.zoomControlSliderWidthPx;
