const express = require("express");
const app = express();
const PORT = process.env.PROT || 3000;

app.get('/', (req, res) => {
	res.send("HELLO WORLD")
});

app.listen(PORT);