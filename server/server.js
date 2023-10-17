const express = require("express");
const app = express();
const db = require("./db")
app.use(express.json());

app.get("/", (req, res) => {
    res.send("server is working");
});

const port = process.env.PORT || 8000;

app.listen(port, () => console.log('Server is running on port number', port));
