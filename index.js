const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const db=require('./config/db');

app.use(cors());
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Backend Server Started At Port:- ${PORT}`);
});
