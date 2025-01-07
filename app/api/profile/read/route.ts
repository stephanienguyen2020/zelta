import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  try {
    // Create profiles directory in project root
    const rootDir = process.cwd();
    const profilesDir = path.join(rootDir, "data", "profiles");

    if (!fs.existsSync(profilesDir)) {
      return NextResponse.json(
        { success: false, error: "No such directory existed" },
        { status: 500 }
      );
    }

    const files = fs.readdirSync(profilesDir);

    if (files.length === 0) {
      return NextResponse.json(
        { success: false, error: "No files found in directory" },
        { status: 404 }
      );
    }

    const filePath = path.join(profilesDir, files[0]);
    const content = fs.readFileSync(filePath, "utf-8"); // Read file content

    return NextResponse.json({ success: true, content });
  } catch (error) {
    console.error("Error saving profile:", error);
    return NextResponse.json(
      { success: false, error: "Failed to read profile" },
      { status: 500 }
    );
  }
}
