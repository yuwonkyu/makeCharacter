"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BlueSpinner from "@/components/lodding/BlueSpinner";
import BgImage from "@/components/common/BgImage";
import OptionPanel from "@/components/settings/OptionPanel";
import { useLanguage } from "@/contexts/LanguageContext"; // 추가

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const { language, setLanguage } = useLanguage(); // 전역 언어 사용
  const [color, setColor] = useState("sky");
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // 저장
  const handleSave = () => {
    alert(language === "ko" ? "저장되었습니다" : "Saved");
  };

  // 리셋
  const handleReset = () => {
    if (
      window.confirm(
        language === "ko"
          ? "정말로 초기화하시겠습니까?"
          : "Are you sure you want to reset?"
      )
    ) {
      setLanguage("ko");
      setColor("sky");
    }
  };

  // 닫기(x)
  const handleClose = () => {
    router.push("/");
  };

  if (loading) return <BlueSpinner text="Loading settings..." />;

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[var(--blue-2)] overflow-hidden">
      {/* 배경 이미지 */}
      <BgImage src="/img/bg-summer.png" overlay="full" />
      {/* 설정 패널 */}
      <OptionPanel
        language={language}
        setLanguage={setLanguage}
        color={color}
        setColor={setColor}
        onSave={handleSave}
        onReset={handleReset}
        onClose={handleClose}
      />
    </div>
  );
}
