import formidable from "formidable";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import mongoose from "mongoose";
import File from "../../../models/File"; // Adjust the path if needed

// Initialize the S3 client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Disable Next.js's built-in body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper function to convert req to a Node.js readable stream
function convertReqToReadable(req) {
  const body = req.body;
  const readable = new ReadableStream({
    start(controller) {
      controller.enqueue(new Uint8Array(body));
      controller.close();
    },
  });
  return readable;
}

export async function POST(req) {
  const readableReq = convertReqToReadable(req);
  const form = formidable({ multiples: true });

  return new Promise((resolve, reject) => {
    form.parse(readableReq, async (err, fields, files) => {
      if (err) {
        reject({ status: 500, message: "File parsing error" });
        return;
      }

      const uploadedFiles = Array.isArray(files.file)
        ? files.file
        : [files.file];
      const uploadPromises = uploadedFiles.map((file) => {
        const fileStream = fs.createReadStream(file.filepath);

        const uploadParams = {
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: `uploads/${file.originalFilename}`,
          Body: fileStream,
        };

        return s3.send(new PutObjectCommand(uploadParams));
      });

      try {
        const uploadResults = await Promise.all(uploadPromises);
        const urls = uploadResults.map(
          (result, index) =>
            `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/uploads/${uploadedFiles[index].originalFilename}`
        );

        const newFiles = urls.map((url, index) => ({
          s3Url: url,
          filename: uploadedFiles[index].originalFilename,
          fileType: uploadedFiles[index].mimetype,
          size: uploadedFiles[index].size,
          userId: fields.userId,
          uploadDate: new Date(),
        }));

        await File.insertMany(newFiles);

        resolve({
          status: 200,
          message: "Files uploaded successfully",
          urls,
        });
      } catch (error) {
        console.error("S3 upload error:", error);
        reject({ status: 500, message: "Error uploading files to S3" });
      }
    });
  });
}
