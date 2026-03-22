import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { createNodeRecursive } from "@/lib/nodeRecursive";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const { name, parentId } = await request.json();

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { message: "Invalid name provided" },
        { status: 400 }
      );
    }

    const hushbox = await createNodeRecursive({
      name,
      type: "hushbox",
      children: [],
    }, parentId || null);

    return NextResponse.json(hushbox, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "A hushbox with this name already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create hushbox" },
      { status: 500 }
    );
  }
}