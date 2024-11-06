import { useRef } from "react";
import "./LoginComponent.css";

export function LoginComponent(props) {
  const { loginUser } = props;

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    loginUser(username, password).then(() => {
      e.target.reset();
      //rest the form, and make the visibility of the component invisibile
    });
  };

  return (
    <form className="complex-form" onSubmit={handleSubmit}>
      <div className="form-title">Login</div>
      <input
        type="text"
        id="form-username"
        className="form-element"
        placeholder="Enter your username"
        name="username"
        required
        ref={usernameRef}
      />
     <input
        type="password"
        id="form-password"
        className="form-element"
        placeholder="Enter your password"
        name="password"
        required
        ref={passwordRef}
      />
      <button type="submit" className="form-element" id="submit">
        Submit
      </button>
    </form>
  );
}
