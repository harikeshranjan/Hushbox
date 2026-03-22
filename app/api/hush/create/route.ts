import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { createNodeRecursive } from "@/lib/nodeRecursive";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const { name, parentId, hushType } = await request.json();

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { message: "Invalid name provided" },
        { status: 400 }
      );
    }

    if (!hushType || typeof hushType !== "string") {
      return NextResponse.json(
        { message: "Invalid hushType provided" },
        { status: 400 }
      );
    }

    const hush = await createNodeRecursive({
      name,
      type: "hush",
      mimeType: hushType,
      content: "",
    },
      parentId || null,
    )

    return NextResponse.json(hush, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create hush" },
      { status: 500 }
    )
  }
}