"use client";

import BgImage from "@/components/common/BgImage";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCharacterStore } from "@/store/characterStore";
import BlueSpinner from "@/components/lodding/BlueSpinner";
import CustomizePanel from "@/components/customize/CustomizePanel";

export default function CustomizePage() {
  const { language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const { resetForm } = useCharacterStore();
  const router = useRouter();

  // 저장/리셋 핸들러 (다국어)
  const TEXT = {
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
  };

  const handleSave = () => {
    alert(TEXT.saved[language]);
  };
  const handleReset = () => {
    if (window.confirm(TEXT.confirmReset[language])) {
      resetForm();
    }
  };
  const handleClose = () => {
    router.push("/main");
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div>
        <BgImage src="/img/bg-summer.png" overlay="full" />
        <BlueSpinner text={TEXT.loading[language]} />
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-blue-2 overflow-hidden">
      <BgImage src="/img/bg-summer.png" overlay="full" />
      <CustomizePanel
        onClose={handleClose}
        onSave={handleSave}
        onReset={handleReset}
      />
    </div>
  );
}
