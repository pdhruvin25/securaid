import { useRef } from "react";
import "./UploadContentComponent.css";

export function UploadContentComponent(props) {
  const {} = props;

  const uploadFile = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const uploadFileName = uploadFile.current.value;
    console.log(uploadFileName);
    // loginUser(username, password).then(() => {
    //   e.target.reset();
    //   //rest the form, and make the visibility of the component invisibile
    // });
  };

  return (
    <form className="complex-form" id="login-form" onSubmit={handleSubmit}>
      <div className="form-title">Upload</div>
     <input type="file" name="directory" className="form-element" ref={uploadFile} required webkitdirectory/>
      <button type="submit" className="form-element">
        Submit
      </button>
    </form>
  );
}
