import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "[LOGOUT]: No token provided" },
        { status: 400 }
      );
    }

    const response = NextResponse.json(
      { message: "[LOGOUT]: User logged out successfully" },
      { status: 200 }
    );
    response.cookies.delete("token");
    return response;
  } catch (error) {
    return NextResponse.json("[LOGOUT]: Internal Server Error", { status: 500 });
  }
}