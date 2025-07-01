const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const db=require('./config/db');
const authRouter=require('./routes/authRoutes');
const patientRoute=require('./routes/patientRoutes');
const doctorRoute=require('./routes/doctorRoutes');
const admissionRoute=require('./routes/admissionRoutes');
const appointmentRoute=require('./routes/appointmentRoutes');

app.use(cors());
app.use(express.json());
dotenv.config();

app.use("/api/auth",authRouter);
app.use("/api/patient",patientRoute);
app.use('/api/doctor',doctorRoute);
app.use('/api/admission',admissionRoute);
app.use('/api/appointment',appointmentRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Backend Server Started At Port:- ${PORT}`);
});
