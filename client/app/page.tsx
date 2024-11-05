import React, { useEffect, useState } from 'react'

function page() {

  const [message, setMessage] = useState("Loading")

  useEffect(() => {
    fetch("http://localhost:3000/api/home").then(response => response.json()).then(data => {
      console.log(data);
      setMessage(data.message);
    })
  }, [])

  return (
    <div>Hello World</div>
  )
}

export default page