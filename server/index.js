const express = require('express');
const app = express();
const PORT = 4000;

app.get("/api/home", (req, res) => {
res.json({message: "hello world"});
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})