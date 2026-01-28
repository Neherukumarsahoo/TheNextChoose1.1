import { NextResponse } from "next/server";
import { readdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function GET() {
  try {
    const uploadDir = join(process.cwd(), "public/uploads");
    
    if (!existsSync(uploadDir)) {
        return NextResponse.json({ files: [] });
    }

    const files = await readdir(uploadDir);
    
    // Filter for images and create full paths
    const imageFiles = files
        .filter(file => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file))
        .map(file => `/uploads/${file}`);

    return NextResponse.json({ files: imageFiles });
  } catch (error) {
    console.error("Failed to list media:", error);
    return NextResponse.json({ error: "Failed to list media" }, { status: 500 });
  }
}
