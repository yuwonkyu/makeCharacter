/**
 * 캐릭터 파츠 렌더링 컴포넌트
 */

import React from "react";
import Image from "next/image";
import type { PartItem } from "@/types/parts";

interface PartImageProps {
  part: PartItem | null;
  width: number;
  height: number;
  alt: string;
  zIndex: string;
}

export const PartImage: React.FC<PartImageProps> = React.memo(
  ({ part, width, height, alt, zIndex }) => {
    if (!part) return null;

    return (
      <Image
        src={part.imagePath}
        alt={alt}
        width={width}
        height={height}
        className={`absolute inset-0 object-contain ${zIndex}`}
        style={{
          transform: `translate(${part.offsetX || 0}px, ${
            part.offsetY || 0
          }px) scale(${part.scale || 1})`,
        }}
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    );
  }
);

PartImage.displayName = "PartImage";
