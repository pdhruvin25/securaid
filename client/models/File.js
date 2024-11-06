// models/File.js
import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  s3Url: { type: String, required: true },
  filename: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  uploadDate: { type: Date, default: Date.now },
  fileType: { type: String },
  size: { type: Number },
  tags: [String],
});

const File = mongoose.model("File", fileSchema);
export default File;
