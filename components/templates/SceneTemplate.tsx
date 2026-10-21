"use client";

import { SceneShell } from "@/components/organisms/SceneShell";
import { sceneTokens } from "@/lib/tokens/scene";

type SceneTemplateProps = {
  backgroundColor?: string;
  planeColor?: string;
};

export function SceneTemplate({
  backgroundColor = sceneTokens.background,
  planeColor = sceneTokens.plane,
}: SceneTemplateProps) {
  return (
    <SceneShell
      backgroundColor={backgroundColor}
      planeColor={planeColor}
    />
  );
}
