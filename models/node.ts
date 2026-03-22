import mongoose, { Schema, Types } from "mongoose";

export type NodeType = "hush" | "hushbox";

export interface INode {
  name: string;
  type: NodeType;
  parentId: Types.ObjectId | null;
  mimeType?: string;
  size?: number;
  content?: string;
  createdAt: Date;
  updatedAt: Date;
}

const nodeSchema = new Schema<INode>({
  name: { type: String, required: true, trim: true},
  type: { type: String, required: true, enum: ["hush", "hushbox"] },
  parentId: { type: Schema.Types.ObjectId, ref: "Node", default: null },
  mimeType: { type: String },
  size: { type: Number },
  content: { type: String },
}, { timestamps: true });

nodeSchema.index(
  { parentId: 1, name: 1, type: 1 },
  { unique: true }
);

export const Node = mongoose.models.Node || mongoose.model<INode>("Node", nodeSchema);

export default Node;