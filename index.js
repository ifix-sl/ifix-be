const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

app.listen(3000, () => {
	console.log(`Server Started at ${3000}`);
});
