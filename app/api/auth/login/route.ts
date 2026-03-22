import { NextResponse, NextRequest } from "next/server";
import { dbConnect } from "@/lib/db";
import MasterPassword from "@/models/master-password";
import jwt, { SignOptions } from "jsonwebtoken";

export async function POST(req: NextRequest) {
	try {
		const { masterPassword } = await req.json();

		if (!masterPassword) {
			return NextResponse.json("[Login]: Master password is required", {
				status: 400,
			});
		}

		await dbConnect();

		const storedMasterPassword = await MasterPassword.findOne();
		if (!storedMasterPassword) {
			return NextResponse.json("[Login]: Master password not set", {
				status: 400,
			});
		}

		const isMatch =
			await storedMasterPassword.comparePassword(masterPassword);
		if (!isMatch) {
			return NextResponse.json("[Login]: Invalid master password", {
				status: 401,
			});
		}

		const signInOptions: SignOptions = {
			expiresIn: "1h",
		};

		const token = jwt.sign(
			{ _id: storedMasterPassword._id },
			process.env.JWT_SECRET as string,
			signInOptions,
		);

		const response = NextResponse.json(
			{ message: "[Login]: Login successful", token },
			{ status: 200 },
		);

		response.cookies.set("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
			maxAge: 60 * 60,
		});

		return response;
	} catch (error: unknown) {
		console.error(error);
		return NextResponse.json("[Login]: Internal Server Error", {
			status: 500,
		});
	}
}
