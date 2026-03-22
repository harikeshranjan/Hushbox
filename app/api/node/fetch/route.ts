import { dbConnect } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Node from "@/models/node";
import mongoose from "mongoose";

export async function GET(request: NextRequest) {
	try {
		await dbConnect();

		const { searchParams } = new URL(request.url);

		const parentIdParam = searchParams.get("parentId");
		const type = searchParams.get("type");

		const query: Record<string, string | null | undefined> = {};

		if (parentIdParam === null || parentIdParam === "null") {
			query.parentId = null;
		} else if (mongoose.Types.ObjectId.isValid(parentIdParam)) {
			query.parentId = parentIdParam;
		} else {
			return NextResponse.json(
				{ error: "Invalid parentId" },
				{ status: 400 },
			);
		}

		if (type) {
			query.type = type;
		}

		const nodes = await Node.find(query).sort({ createdAt: -1 });

		return NextResponse.json(nodes, { status: 200 });
	} catch (error) {
		console.error("Error fetching nodes:", error);
		return NextResponse.json(
			{ error: "Error fetching nodes" },
			{ status: 500 },
		);
	}
}
