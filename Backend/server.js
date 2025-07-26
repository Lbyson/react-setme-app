const express = require("express");
const path = require("path")

const app = express();
const port = 80;

const distPath = path.resolve(__dirname, "../frontend/dist");

app.use(express.static(distPath));

app.listen(port, () => {
	console.log("Server has been started on port 80");
})