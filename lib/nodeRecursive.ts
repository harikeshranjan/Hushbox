import Node from "@/models/node";
import mongoose from "mongoose";

export async function createNodeRecursive(
  data: any,
  parentId: mongoose.Types.ObjectId | null
) {
  const node = await Node.create({
    name: data.name,
    type: data.type,
    parentId,
    mimeType: data.mimeType,
    content: data.content ?? "",
    size: data.content?.length ?? 0,
  });

  if (Array.isArray(data.children)) {
    for (const child of data.children) {
      await createNodeRecursive(child, node._id);
    }
  }

  return node;
}

export async function deleteNodeRecursive(nodeId: string) {
  const children = await Node.find({ parentId: nodeId });

  for (const child of children) {
    await deleteNodeRecursive(child._id.toString());
  }

  await Node.findByIdAndDelete(nodeId);
}
