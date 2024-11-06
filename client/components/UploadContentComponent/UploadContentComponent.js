import { useRef, useState } from "react";
import "./UploadContentComponent.css";

export function UploadContentComponent(props) {
  const {} = props;
  const uploadFile = useRef(null);
  const uploads = useRef(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileSelection = () => {
    const files = uploadFile.current.files;
    const fileNames = Array.from(files).map(file => file.name);
    setUploadedFiles(fileNames);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUploadedFiles([]);
    e.target.reset();
    // loginUser(username, password).then(() => {
    //   e.target.reset();
    //   //rest the form, and make the visibility of the component invisibile
    // });
  };

  return (
    <div className="upload_container">
    <form id="login-form" onSubmit={handleSubmit}>
      <div className="form-title">Upload Project</div>
     <input type="file" name="directory" className="form-element" ref={uploadFile} required  webkitdirectory="true" multiple onChange={handleFileSelection}/>
      <button type="submit" className="form-element" id="submit">
        Submit
      </button>
    </form>
    <div id ="files-uploaded" ref={uploads}>
        {uploadedFiles.length > 0 ? (
            uploadedFiles.map((fileName, index) => (
              <div id="uploaded-files" key={index}>{fileName}</div>
            ))
        ) : null}
    </div>
    </div>
  );
}
