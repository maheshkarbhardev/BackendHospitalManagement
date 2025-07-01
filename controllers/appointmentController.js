const db = require("../config/db");

//api for createAppointment
exports.createAppointment = (req, res) => {
  const { patient_id, doctor_id, appointment_date, status, reason } = req.body;
  const query =
    "INSERT INTO appointments (patient_id, doctor_id, appointment_date, status, reason) VALUE (?,?,?,?,?)";

  db.query(
    query,
    [patient_id, doctor_id, appointment_date, status, reason],
    (err, result) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      res.status(200).json({ message: "Appointment Created Successfully." });
    }
  );
};

//api for get all appointments
exports.getAllAppointments = (req, res) => {
  const query = `SELECT 
        a.*, 
        p.firstName AS patient_first_name, 
        p.lastName AS patient_last_name,
        d.dr_first_name, 
        d.dr_last_name, 
        d.dr_specialty
      FROM appointments a
      JOIN patients p ON a.patient_id = p.patient_id
      JOIN doctors d ON a.doctor_id = d.doctor_id
      ORDER BY a.appointment_date DESC`;

      db.query(query,(err,result)=>{
        if(err){
            return res.status(400).json({error:err})
        }
        res.status(200).json(result)
      })
};

//api for get appointment by using id
exports.getAppointmentById=(req,res)=>{
    const id=req.params.id;

    const query="SELECT * FROM appointments WHERE id=?";

    db.query(query,[id],(err,result)=>{
        if(err){
            return res.status(400).json({error:err})
        }
        if(result.length === 0){
            return res.status(404).json({error:"Appointment Not Found."})
        }
        res.status(200).json(result[0])
    })
}

//api for update appointment details
exports.updateAppointment=(req,res)=>{
    const id=req.params.id;
    const {patient_id, doctor_id, appointment_date, status, reason}=req.body;

    const query="UPDATE appointments SET patient_id=?, doctor_id=? , appointment_date=?, status=? ,reason=? WHERE id=?";

    db.query(query,[patient_id, doctor_id, appointment_date, status, reason,id],(err,result)=>{
        if(err){
            return res.status(400).json({error:err})
        }
        res.status(200).json({message:"Appointment Updated Successfully."})
    })
};

//api for delete appointment
exports.deleteAppointment=(req,res)=>{
    const id=req.params.id;

    const query="DELETE FROM appointments WHERE id=?";

    db.query(query,[id],(err,result)=>{
        if(err){
            return res.status(400).json({error:err})
        }
        res.status(200).json({message:"Appointment Deleted Successfully."})
    })
}
