import { NextResponse, NextRequest } from "next/server";
import { dbConnect } from "@/lib/db";
import Node from "@/models/node";
import mongoose from "mongoose";

export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const hushboxId = searchParams.get("id");

    if (!hushboxId || !mongoose.Types.ObjectId.isValid(hushboxId)) {
      return NextResponse.json("Invalid hushbox ID", { status: 400 });
    }

    const deletedHushbox = await Node.findByIdAndDelete(hushboxId);

    if (!deletedHushbox) {
      return NextResponse.json("Hushbox not found", { status: 404 });
    }

    return NextResponse.json("Hushbox deleted successfully", { status: 200 });
  } catch (error) {
    return NextResponse.json("Error deleting hushbox", { status: 500 });
  }
}