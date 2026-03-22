import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import MasterPassword from "@/models/master-password";

export async function POST(req: Request) {
  try {
    const { password, setupSecret } = await req.json();

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    // Protect the setup route
    if (setupSecret !== process.env.SETUP_SECRET) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await dbConnect();

    // Ensure only ONE master password exists
    const existing = await MasterPassword.findOne();
    if (existing) {
      return NextResponse.json(
        { error: "Master password already set" },
        { status: 409 }
      );
    }

    // Create master password 
    await MasterPassword.create({ password });

    return NextResponse.json(
      { success: true, message: "Master password created" },
      { status: 201 }
    );
  } catch (error) {
    console.error("[SETUP_ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}