import { NextResponse, NextRequest } from "next/server";
import { dbConnect } from "@/lib/db";
import Node from "@/models/node";
import mongoose from "mongoose";

export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const hushId = searchParams.get("id");

    if (!hushId || !mongoose.Types.ObjectId.isValid(hushId)) {
      return NextResponse.json("Invalid hush ID", { status: 400 });
    }

    const deletedHush = await Node.findByIdAndDelete(hushId);

    if (!deletedHush) {
      return NextResponse.json("Hush not found", { status: 404 });
    }

    return NextResponse.json("Hush deleted successfully", { status: 200 });
  } catch (error) {
    return NextResponse.json("Error deleting hush", { status: 500 });
  }
}