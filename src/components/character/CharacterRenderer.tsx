"use client";

import Image from "next/image";
import React, { useMemo, useState, useEffect } from "react";
import { useCharacterStore } from "@/store/characterStore";
import {
  getAllPartOptions,
  getDefaultPartOptions,
  type PartCategory,
  type PartItem,
} from "@/utils/partUtils";

interface CharacterRendererProps {
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  showBase?: boolean; // 베이스 캐릭터 표시 여부
}

// 파츠 옵션을 관리하는 커스텀 훅
function usePartOptions() {
  const [partOptions, setPartOptions] = useState<
    Record<PartCategory, PartItem[]>
  >({
    head: getDefaultPartOptions("head"),
    body: getDefaultPartOptions("body"),
    legs: getDefaultPartOptions("legs"),
    shoes: getDefaultPartOptions("shoes"),
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadPartOptions = async () => {
      try {
        const options = await getAllPartOptions();
        if (isMounted) {
          setPartOptions(options);
        }
      } catch (error) {
        console.error("Failed to load part options:", error);
        // 폴백 옵션은 이미 state에 설정되어 있음
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadPartOptions();

    return () => {
      isMounted = false;
    };
  }, []);

  return { partOptions, loading };
}

const CharacterRenderer = React.memo(function CharacterRenderer({
  width = 64,
  height = 64,
  className = "",
  priority = false,
  showBase = true,
}: CharacterRendererProps) {
  const { form } = useCharacterStore();
  const { partOptions } = usePartOptions();

  // 각 파츠의 이미지 경로와 조정 정보를 메모화
  const partPaths = useMemo(
    () => ({
      head:
        form["머리"] && form["머리"] !== "기본"
          ? partOptions.head.find((opt) => opt.label === form["머리"])
          : null,
      body:
        form["몸통"] && form["몸통"] !== "기본"
          ? partOptions.body.find((opt) => opt.label === form["몸통"])
          : null,
      legs:
        form["다리"] && form["다리"] !== "기본"
          ? partOptions.legs.find((opt) => opt.label === form["다리"])
          : null,
      shoes:
        form["신발"] && form["신발"] !== "기본"
          ? partOptions.shoes.find((opt) => opt.label === form["신발"])
          : null,
    }),
    [form, partOptions]
  );

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

      {/* 머리 파츠 */}
      {partPaths.head && (
        <Image
          src={partPaths.head.imagePath}
          alt="머리 파츠"
          width={width}
          height={height}
          className="absolute inset-0 object-contain z-10"
          style={{
            transform: `translate(${partPaths.head.offsetX || 0}px, ${
              partPaths.head.offsetY || 0
            }px) scale(${partPaths.head.scale || 1})`,
          }}
          onError={(e) => {
            // 이미지 로드 실패 시 숨김
            e.currentTarget.style.display = "none";
          }}
        />
      )}

      {/* 몸통 파츠 */}
      {partPaths.body && (
        <Image
          src={partPaths.body.imagePath}
          alt="몸통 파츠"
          width={width}
          height={height}
          className="absolute inset-0 object-contain"
          style={{
            transform: `translate(${partPaths.body.offsetX || 0}px, ${
              partPaths.body.offsetY || 0
            }px) scale(${partPaths.body.scale || 1})`,
          }}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      )}

      {/* 다리 파츠 */}
      {partPaths.legs && (
        <Image
          src={partPaths.legs.imagePath}
          alt="다리 파츠"
          width={width}
          height={height}
          className="absolute inset-0 object-contain"
          style={{
            transform: `translate(${partPaths.legs.offsetX || 0}px, ${
              partPaths.legs.offsetY || 0
            }px) scale(${partPaths.legs.scale || 1})`,
          }}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      )}

      {/* 신발 파츠 */}
      {partPaths.shoes && (
        <Image
          src={partPaths.shoes.imagePath}
          alt="신발 파츠"
          width={width}
          height={height}
          className="absolute inset-0 object-contain"
          style={{
            transform: `translate(${partPaths.shoes.offsetX || 0}px, ${
              partPaths.shoes.offsetY || 0
            }px) scale(${partPaths.shoes.scale || 1})`,
          }}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      )}
    </div>
  );
});

export default CharacterRenderer;
