"use client";

import React, { useEffect, useState } from "react";

function Page() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Please select files first.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setUploadStatus(
          `Files uploaded successfully! URLs: ${result.urls.join(", ")}`
        );
      } else {
        setUploadStatus("File upload failed.");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      setUploadStatus("File upload failed.");
    }
  };

  return (
    <div>
      <h1>Upload Multiple Files</h1>
      <input type="file" onChange={handleFileChange} multiple />{" "}
      {/* Enable multiple file selection */}
      <button onClick={handleUpload}>Upload Files</button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
}

export default Page;
