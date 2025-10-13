"use client";

import React from "react";
import Image from "next/image";
import { usePartOptions } from "@/hooks/usePartOptions";
import { useCharacterPartPaths } from "@/hooks/useCharacterPartPaths";
import { PartImage } from "./PartImage";

interface CharacterRendererProps {
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  showBase?: boolean;
}

const DEFAULT_SIZE = 64;

const CharacterRenderer = React.memo(function CharacterRenderer({
  width = DEFAULT_SIZE,
  height = DEFAULT_SIZE,
  className = "",
  priority = false,
  showBase = true,
}: CharacterRendererProps) {
  const { partOptions } = usePartOptions();
  const partPaths = useCharacterPartPaths(partOptions);

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {/* 베이스 캐릭터 */}
      {showBase && (
        <Image
          src="/img/base.png"
          alt="베이스 캐릭터"
          width={width}
          height={height}
          className="absolute inset-0 object-contain"
          priority={priority}
        />
      )}

      {/* 파츠 렌더링 */}
      <PartImage
        part={partPaths.head}
        width={width}
        height={height}
        alt="머리 파츠"
        zIndex="z-10"
      />

      <PartImage
        part={partPaths.body}
        width={width}
        height={height}
        alt="몸통 파츠"
        zIndex="z-9"
      />

      <PartImage
        part={partPaths.legs}
        width={width}
        height={height}
        alt="다리 파츠"
        zIndex="z-8"
      />

      <PartImage
        part={partPaths.shoes}
        width={width}
        height={height}
        alt="신발 파츠"
        zIndex="z-7"
      />
    </div>
  );
});

export default CharacterRenderer;
