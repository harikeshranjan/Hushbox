import { NextRequest, NextResponse } from "next/server";
import Node from "@/models/node";
import { dbConnect } from "@/lib/db";

export async function GET(
	_req: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	await dbConnect();
	const { id } = await params;
	const hush = await Node.findById(id);
	if (!hush)
		return NextResponse.json({ message: "Not found" }, { status: 404 });
	return NextResponse.json(hush);
}

export async function PATCH(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	await dbConnect();
	const { id } = await params;
	const { content } = await req.json();

	const hush = await Node.findByIdAndUpdate(id, { content }, { new: true });

	if (!hush)
		return NextResponse.json({ message: "Not found" }, { status: 404 });
	return NextResponse.json(hush);
}
