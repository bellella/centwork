// app/api/upload/route.ts
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const buffer = await file.arrayBuffer();
  const filename = Date.now() + "_" + file.name.replace(/\s+/g, "_");

  try {
    await writeFile(
      path.join(process.cwd(), "public/images/products/" + filename),
      Buffer.from(buffer)
    );
    return NextResponse.json(
      { filePath: `/images/products/${filename}` }, // Public URL path
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save file" },
      { status: 500 }
    );
  }
}