"use client"
import { useEffect, useState } from 'react';
import { LoginComponent } from "../components/LoginComponent/LoginComponent";
import { ContentComponent } from "../components/ContentComponent/ContentComponent";
function page() {

  const [login, setLogin] = useState("Loading");

  useEffect(() => {
    // Get the cookie information and set the state of Login accordingly
    setLogin("Logged In");
  }, [])
  return (
    <>
      <div id="container">
          <div id="auth-buttons">
            <button className="auth-button" id="Login">Login</button>
            <button className="auth-button" id="signup">Sign Up</button>
          </div>
          <h1 id="homepage_title">Securaid</h1>
        <h4 id="homepage_slogan">A secure place for everyone</h4>
        <div id="loginComponent">
        <LoginComponent />
        </div>
      </div>
      <ContentComponent />
    </>
  )
}

export default page