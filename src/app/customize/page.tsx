"use client";

import Image from "next/image";
import BgImage from "@/components/common/BgImage";
import { useState, useEffect } from "react";
import Input from "@/components/common/Input";
import BlueSpinner from "@/components/lodding/BlueSpinner";

const CustomSelect = ({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
}) => (
  <div className="relative w-full">
    <select
      className="w-full rounded border border-blue-3 bg-blue-4 text-gray-1 px-2 py-1 text-center font-semibold focus:outline-none appearance-none pr-8 inset-dropdown transition-colors"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="" disabled>
        {placeholder || "선택"}
      </option>
      {options.map((opt) => (
        <option key={opt} value={opt} className="text-center">
          {opt}
        </option>
      ))}
    </select>
    <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
      <Image src="/icon/dropdown.svg" alt="드롭다운" width={20} height={18} />
    </span>
  </div>
);

const categoryList = [
  { label: "머리", type: "select", options: ["기본"] },
  { label: "몸통", type: "select", options: ["기본"] },
  { label: "다리", type: "select", options: ["기본"] },
  { label: "신발", type: "select", options: ["기본"] },
  { label: "체력", type: "input", placeholder: "1~100중에 적어주세요." },
  { label: "마력", type: "input", placeholder: "1~100중에 적어주세요." },
  { label: "무게", type: "input", placeholder: "몸무게를 입력해주세요." },
  { label: "키", type: "input", placeholder: "키를 입력해주세요." },
  { label: "IQ", type: "input", placeholder: "IQ를 입력해주세요." },
  {
    label: "MBTI",
    type: "select",
    options: [
      "INTJ",
      "INTP",
      "ENTJ",
      "ENTP",
      "INFJ",
      "INFP",
      "ENFJ",
      "ENFP",
      "ISTJ",
      "ISFJ",
      "ESTJ",
      "ESFJ",
      "ISTP",
      "ISFP",
      "ESTP",
      "ESFP",
    ],
  },
];

export default function CustomizePage() {
  // 로딩 상태
  const [loading, setLoading] = useState(true);
  // 각 항목별 상태
  const [form, setForm] = useState<{ [key: string]: string }>({
    머리: "기본",
    몸통: "기본",
    다리: "기본",
    신발: "기본",
    체력: "",
    마력: "",
    무게: "",
    키: "",
    IQ: "",
    MBTI: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (key: string, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  // 저장/리셋 핸들러 (임시)
  const handleSave = () => {
    alert("저장되었습니다!");
  };
  const handleReset = () => {
    if (window.confirm("정말로 초기화하시겠습니까?")) {
      setForm({
        머리: "기본",
        몸통: "기본",
        다리: "기본",
        신발: "기본",
        체력: "",
        마력: "",
        무게: "",
        키: "",
        IQ: "",
        MBTI: "",
      });
    }
  };

  if (loading) {
    return (
      <div>
        <BgImage src="/img/bg-summer.png" overlay="full" />
        <BlueSpinner text="커스텀 정보 불러오는 중..." />
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-blue-2 overflow-hidden">
      {/* 배경 이미지 */}
      <BgImage src="/img/bg-summer.png" overlay="full" />
      {/* 커스텀 패널 */}
      <div className="relative z-10 w-[1000px] max-w-full rounded-xl border border-blue-3 shadow-2xl mx-auto flex flex-col bg-gradient-blue-custom">
        {/* 헤더 */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-blue-3 rounded-t-xl bg-gradient-blue-custom">
          <span className="text-xl font-bold text-gray-1">Customizing</span>
        </div>
        {/* 본문 */}
        <div className="flex flex-row w-full h-[480px] bg-white py-70">
          {/* 왼쪽: 아바타 */}
          <div className="flex-1 flex items-center justify-center">
            <Image
              src="/img/npc1.png"
              alt="아바타"
              width={220}
              height={220}
              className="object-contain"
              priority
            />
          </div>
          {/* 오른쪽: 카테고리/입력 */}
          <div className="flex-1 flex flex-col justify-center gap-3 px-8 py-6">
            {categoryList.map((cat) => (
              <div key={cat.label} className="flex items-center gap-3 mb-1">
                <span className="w-20 text-gray-1 text-base font-semibold text-right mr-2">
                  {cat.label}
                </span>
                {cat.type === "select" ? (
                  <CustomSelect
                    value={form[cat.label]}
                    onChange={(v) => handleChange(cat.label, v)}
                    options={cat.options || []}
                    placeholder={cat.placeholder}
                  />
                ) : (
                  <Input
                    value={form[cat.label]}
                    onChange={(v) => handleChange(cat.label, v)}
                    placeholder={cat.placeholder}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        {/* 하단 버튼 */}
        <div className="flex justify-center gap-6 px-8 py-4 rounded-b-xl border-t border-blue-3 bg-gradient-blue-custom">
          <button
            className="w-32 py-2 rounded bg-gradient-blue-custom text-gray-1 font-bold border border-blue-3 shadow"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="w-32 py-2 rounded bg-gradient-blue-custom text-gray-1 font-bold border border-blue-3 shadow"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
