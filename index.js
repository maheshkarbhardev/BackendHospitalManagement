const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const db=require('./config/db');
const authRouter=require('./routes/authRoutes');
const patientRoute=require('./routes/patientRoutes');

app.use(cors());
app.use(express.json());
dotenv.config();

app.use("/api/auth",authRouter);
app.use("/api/patient",patientRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Backend Server Started At Port:- ${PORT}`);
});
