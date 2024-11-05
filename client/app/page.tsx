"use client"
import { useEffect, useState } from 'react';
import { LoginComponent } from "../components/LoginComponent/LoginComponent";
import {ContentComponent} from "../components/ContentComponent/ContentComponent";
function page() {

  const [login, setLogin] = useState("Loading");

  useEffect(() => {
    // Get the cookie information and set the state of Login accordingly
    setLogin("Logged In");
  }, [])
  return (
    <>
    <div id = "container">
      <h1 id = "homepage_title">Securaid</h1>
      <h4 id = "homepage_slogan">A secure place for everyone</h4>
      <LoginComponent/>
      <ContentComponent/>
    </div>
    </>
  )
}

export default page