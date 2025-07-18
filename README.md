# 🕹️ MakeCharacter: Pixel RPG Character Creator

A pixel-style RPG character customization demo built with **Next.js**, **TailwindCSS**, and **TypeScript**.  
Inspired by classic RPGs like *Tree of Savior* and *Octopath Traveler*, this project explores character creation, animation, and UI/UX systems for browser-based games.

![preview](./public/preview.gif)

---

## 📦 Tech Stack

| 기술            | 설명 |
|----------------|------|
| **Next.js 15** | App Router 기반의 구조 (SSR/CSR 혼합) |
| **TypeScript** | 정적 타입 체크 및 개발자 경험 향상 |
| **TailwindCSS** | 유틸리티 기반 CSS 설계로 빠른 스타일링 |
| **Zustand**     | 전역 상태 관리 (커스터마이징 및 환경 설정 등) |
| **Vercel**      | 빠른 배포 및 미리보기 환경 제공 |

---

## 🎮 주요 기능

- ✅ **캐릭터 커스터마이징 UI**
  - 머리색, 복장 등 커스텀 선택
  - 선택한 값 상태 저장
- ✅ **픽셀 캐릭터 이동**
  - 배경 내 자동 이동 애니메이션
  - 향후 키보드 조작 예정
- ✅ **환경설정 시스템**
  - 인터페이스 크기 조절
  - 테마 색상, 언어 설정 등 반영

---

## 📐 프로젝트 구조

```bash
src/
├─ app/
│  ├─ character/    # 캐릭터 화면
│  ├─ customize/    # 커스터마이징
│  ├─ settings/     # 인터페이스 설정
│  └─ layout.tsx    # 공통 레이아웃
├─ components/       # 공통 UI 컴포넌트
├─ types/            # 전역 타입 정의
public/              # 이미지 및 리소스
