import { dbConnect } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { authenticated: false, message: "[AUTH_CHECK]: No token provided" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { authenticated: true, message: "[AUTH_CHECK]: User is authenticated" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json("[AUTH_CHECK]: Internal Server Error", { status: 500 });
  }
}