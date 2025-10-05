import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    if (!category) {
      return NextResponse.json(
        { error: "Category parameter is required" },
        { status: 400 }
      );
    }

    // parts 폴더 경로
    const partsDir = path.join(
      process.cwd(),
      "public",
      "img",
      "parts",
      category
    );

    // 폴더가 존재하는지 확인
    if (!fs.existsSync(partsDir)) {
      return NextResponse.json(
        { error: `Category '${category}' not found` },
        { status: 404 }
      );
    }

    // 이미지 파일만 필터링 (png, jpg, jpeg, gif, webp)
    const imageExtensions = [".png", ".jpg", ".jpeg", ".gif", ".webp"];
    const files = fs
      .readdirSync(partsDir)
      .filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return imageExtensions.includes(ext);
      })
      .sort(); // 파일명 순으로 정렬

    return NextResponse.json({
      category,
      files,
      count: files.length,
    });
  } catch (error) {
    console.error("Error scanning parts directory:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
