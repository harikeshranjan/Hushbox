import mongoose, { Schema } from "mongoose";

const fileVersionSchema = new Schema({
    nodeId: {
      type: Schema.Types.ObjectId,
      ref: "Node",
      required: true,
    },
    content: String,
    size: Number,
  },
  { timestamps: true }
);

export default mongoose.models.FileVersion ||
  mongoose.model("FileVersion", fileVersionSchema);