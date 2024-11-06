import { useRef, useState } from "react";
import "./UploadContentComponent.css";

export function UploadContentComponent(props) {
  const uploadFile = useRef(null);
  const uploads = useRef(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileSelection = () => {
    const files = uploadFile.current.files;
    const fileNames = Array.from(files).map((file) => file.name);
    setUploadedFiles(fileNames);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const files = uploadFile.current.files;
    if (files.length === 0) return;

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const result = await response.json();
        console.log("Files uploaded successfully:", result);
        setUploadedFiles([]); // Clear the uploaded files list
      } else {
        console.error("File upload failed");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }

    e.target.reset();
  };

  return (
    <div className="upload_container">
      <form id="login-form" onSubmit={handleSubmit}>
        <div className="form-title">Upload Project</div>
        <input
          type="file"
          name="directory"
          className="form-element"
          ref={uploadFile}
          required
          webkitdirectory="true"
          multiple
          onChange={handleFileSelection}
        />
        <button type="submit" className="form-element" id="submit">
          Submit
        </button>
      </form>
      <div id="files-uploaded" ref={uploads}>
        {uploadedFiles.length > 0
          ? uploadedFiles.map((fileName, index) => (
              <div id="uploaded-files" key={index}>
                {fileName}
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
