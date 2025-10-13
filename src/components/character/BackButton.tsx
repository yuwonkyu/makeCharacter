/**
 * 백 버튼 컴포넌트
 */

import React from "react";
import Image from "next/image";

interface BackButtonProps {
  onClick: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        absolute top-4 left-4 z-30 
        w-12 h-12 
        bg-gradient-blue-custom
        hover:bg-blue-1
        rounded-full 
        flex items-center justify-center 
        transition-all duration-200 
        text-gray-1 font-bold border border-gray-1 cursor-pointer shadow-md
        hover:shadow-lg
        transform hover:scale-105
      "
      aria-label="뒤로가기"
    >
      <Image
        src="/icon/back.svg"
        alt="뒤로가기"
        width={20}
        height={20}
        className="filter brightness-0 saturate-100"
        style={{
          filter:
            "invert(26%) sepia(16%) saturate(1003%) hue-rotate(173deg) brightness(93%) contrast(86%)",
        }}
      />
    </button>
  );
};
