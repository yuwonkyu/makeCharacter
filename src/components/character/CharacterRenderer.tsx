"use client";

import Image from "next/image";
import React, { useCallback, useMemo, useState, useEffect } from "react";
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

  // 파츠 라벨을 실제 파일 경로로 변환하는 함수
  const getPartImagePath = useCallback(
    (category: PartCategory, label: string): string => {
      const options = partOptions[category] || [];
      const option = options.find(
        (opt) => opt.label === label || opt.value === label
      );
      return option?.imagePath || `/img/parts/${category}/${label}.png`;
    },
    [partOptions]
  );

  // 각 파츠의 이미지 경로를 메모화
  const partPaths = useMemo(
    () => ({
      head:
        form["머리"] && form["머리"] !== "기본"
          ? getPartImagePath("head", form["머리"])
          : null,
      body:
        form["몸통"] && form["몸통"] !== "기본"
          ? getPartImagePath("body", form["몸통"])
          : null,
      legs:
        form["다리"] && form["다리"] !== "기본"
          ? getPartImagePath("legs", form["다리"])
          : null,
      shoes:
        form["신발"] && form["신발"] !== "기본"
          ? getPartImagePath("shoes", form["신발"])
          : null,
    }),
    [form, getPartImagePath]
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
          src={partPaths.head}
          alt="머리 파츠"
          width={width}
          height={height}
          className="absolute inset-0 object-contain"
          onError={(e) => {
            // 이미지 로드 실패 시 숨김
            e.currentTarget.style.display = "none";
          }}
        />
      )}

      {/* 몸통 파츠 */}
      {partPaths.body && (
        <Image
          src={partPaths.body}
          alt="몸통 파츠"
          width={width}
          height={height}
          className="absolute inset-0 object-contain"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      )}

      {/* 다리 파츠 */}
      {partPaths.legs && (
        <Image
          src={partPaths.legs}
          alt="다리 파츠"
          width={width}
          height={height}
          className="absolute inset-0 object-contain"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      )}

      {/* 신발 파츠 */}
      {partPaths.shoes && (
        <Image
          src={partPaths.shoes}
          alt="신발 파츠"
          width={width}
          height={height}
          className="absolute inset-0 object-contain"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      )}
    </div>
  );
});

export default CharacterRenderer;
