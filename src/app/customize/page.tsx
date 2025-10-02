"use client";

import BgImage from "@/components/common/BgImage";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCharacterStore } from "@/store/characterStore";
import BlueSpinner from "@/components/lodding/BlueSpinner";
import dynamic from "next/dynamic";

// Dynamic import for better code splitting
const CustomizePanel = dynamic(
  () => import("@/components/customize/CustomizePanel"),
  {
    loading: () => <BlueSpinner text="Loading..." />,
  }
);

export default function CustomizePage() {
  const { language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const { resetForm } = useCharacterStore();
  const router = useRouter();

  // Memoized TEXT object to prevent recreation on every render
  const TEXT = useMemo(
    () => ({
      saved: {
        en: "Saved!",
        ko: "저장되었습니다!",
        jp: "保存されました！",
      },
      confirmReset: {
        en: "Are you sure you want to reset?",
        ko: "정말로 초기화하시겠습니까?",
        jp: "本当にリセットしますか？",
      },
      loading: {
        en: "Loading custom info...",
        ko: "커스텀 정보 불러오는 중...",
        jp: "カスタム情報を読み込み中...",
      },
    }),
    []
  );

  const handleSave = useCallback(() => {
    alert(TEXT.saved[language]);
  }, [TEXT.saved, language]);

  const handleReset = useCallback(() => {
    if (window.confirm(TEXT.confirmReset[language])) {
      resetForm();
    }
  }, [TEXT.confirmReset, language, resetForm]);

  const handleClose = useCallback(() => {
    router.push("/main");
  }, [router]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div>
        <BgImage
          src="/img/bg-summer.png"
          overlay="full"
          priority={false}
          sizes="100vw"
        />
        <BlueSpinner text={TEXT.loading[language]} />
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-blue-2 overflow-hidden">
      <BgImage
        src="/img/bg-summer.png"
        overlay="full"
        priority={false}
        sizes="100vw"
      />
      <CustomizePanel
        onClose={handleClose}
        onSave={handleSave}
        onReset={handleReset}
      />
    </div>
  );
}
