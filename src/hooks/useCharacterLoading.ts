/**
 * 캐릭터 로딩 관리 커스텀 훅
 */

import { useState, useEffect } from "react";
import { useCharacterStore } from "@/store/characterStore";
import { CHARACTER_CONFIG } from "@/constants/character";

export function useCharacterLoading() {
  const [loading, setLoading] = useState(true);
  const { loadFromStorage } = useCharacterStore();

  useEffect(() => {
    const initializeCharacter = async () => {
      // 저장된 캐릭터 데이터 불러오기
      loadFromStorage();

      // 로딩 지연
      const timer = setTimeout(() => {
        setLoading(false);
      }, CHARACTER_CONFIG.LOADING_DELAY);

      return () => clearTimeout(timer);
    };

    initializeCharacter();
  }, [loadFromStorage]);

  return { loading };
}
