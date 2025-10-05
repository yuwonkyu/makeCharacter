import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const partsBaseDir = path.join(process.cwd(), "public", "img", "parts");

    // parts 폴더가 존재하는지 확인
    if (!fs.existsSync(partsBaseDir)) {
      return NextResponse.json(
        { error: "Parts directory not found" },
        { status: 404 }
      );
    }

    // 모든 카테고리 폴더 스캔
    const categories = fs.readdirSync(partsBaseDir).filter((item) => {
      const itemPath = path.join(partsBaseDir, item);
      return fs.statSync(itemPath).isDirectory();
    });

    const result: Record<string, string[]> = {};
    const imageExtensions = [".png", ".jpg", ".jpeg", ".gif", ".webp"];

    // 각 카테고리별로 이미지 파일 스캔
    for (const category of categories) {
      const categoryDir = path.join(partsBaseDir, category);
      const files = fs
        .readdirSync(categoryDir)
        .filter((file) => {
          const ext = path.extname(file).toLowerCase();
          return imageExtensions.includes(ext);
        })
        .sort(); // 파일명 순으로 정렬

      result[category] = files;
    }

    return NextResponse.json({
      parts: result,
      categories: categories.sort(),
      totalFiles: Object.values(result).reduce(
        (sum, files) => sum + files.length,
        0
      ),
    });
  } catch (error) {
    console.error("Error scanning all parts directories:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
