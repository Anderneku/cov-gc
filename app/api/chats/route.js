import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "lib", "chats.json");

export async function POST(request) {
  const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });
  const chats = fileContent ? JSON.parse(fileContent) : ""; // ✅ Convert string → JS array/object

  const data = await request.json();
  const strung_together = [...chats, data];
  console.log(filePath);
  fs.writeFileSync(filePath, JSON.stringify(strung_together));

  return NextResponse.json({ success: true });
}

export async function GET() {
  const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });
  const chats = fileContent ? JSON.parse(fileContent) : ""; // ✅ Convert string → JS array/object
  return NextResponse.json(chats);
}
