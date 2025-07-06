"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BlueSpinner from "@/components/lodding/BlueSpinner";
import BgImage from "@/components/common/BgImage";
import OptionPanel from "@/components/settings/OptionPanel";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const { language, setLanguage } = useLanguage();
  const [color, setColor] = useState("sky");

  // 임시 상태
  const [tempLanguage, setTempLanguage] = useState(language); // language의 기본값은 "en"
  const [tempColor, setTempColor] = useState(color); // color의 기본값은 "sky"

  const router = useRouter();

  // 다국어 텍스트
  const TEXT = {
    saved: {
      en: "Saved",
      ko: "저장되었습니다",
      jp: "保存されました",
    },
    resetConfirm: {
      en: "Are you sure you want to reset?",
      ko: "정말로 초기화하시겠습니까?",
      jp: "本当にリセットしますか？",
    },
    loading: {
      en: "Loading settings...",
      ko: "환경설정 불러오는 중...",
      jp: "設定を読み込んでいます...",
    },
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // 저장
  const handleSave = () => {
    setLanguage(tempLanguage);
    setColor(tempColor);
    alert(TEXT.saved[tempLanguage]);
  };

  // 리셋
  const handleReset = () => {
    if (window.confirm(TEXT.resetConfirm[tempLanguage])) {
      setTempLanguage("en"); // 언어 초기화
      setTempColor("sky"); // 색상 초기화
    }
  };

  // 닫기(x)
  const handleClose = () => {
    router.push("/main");
  };

  if (loading) {
    return (
      <div>
        <BgImage src="/img/bg-summer.png" overlay="full" />
        <BlueSpinner text={TEXT.loading[tempLanguage]} />
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[var(--blue-2)] overflow-hidden">
      {/* 배경 이미지 */}
      <BgImage src="/img/bg-summer.png" overlay="full" />
      {/* 설정 패널 */}
      <OptionPanel
        language={tempLanguage}
        setLanguage={setTempLanguage}
        color={tempColor}
        setColor={setTempColor}
        onSave={handleSave}
        onReset={handleReset}
        onClose={handleClose}
      />
    </div>
  );
}
