const db = require("../config/db");

//api for createDoctor
exports.createDoctor = async (req, res) => {
  const { dr_first_name, dr_last_name, dr_mobile, dr_email, dr_specialty } =
    req.body;

  const query = `INSERT INTO doctors (dr_first_name, dr_last_name, dr_mobile, dr_email, dr_specialty) VALUES(?,?,?,?,?)`;

  try {
    const [result] = await db.query(query, [
      dr_first_name,
      dr_last_name,
      dr_mobile,
      dr_email,
      dr_specialty,
    ]);

    res.status(200).json({
      id: result.insertId,
      dr_first_name,
      dr_last_name,
      dr_mobile,
      dr_email,
      dr_specialty,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  // db.query(query,[dr_first_name, dr_last_name, dr_mobile, dr_email, dr_specialty],(err,result)=>{
  //     if(err){
  //         return res.status(400).json({error:err})
  //     }
  //     res.status(200).json({message:"Doctor Created Successfully."})
  // })
};

//api for get all doctors.
exports.getAllDoctors = async (req, res) => {
  const query = "SELECT * FROM doctors";

  try {
    const [result] = await db.query(query);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  //   db.query(query, (err, result) => {
  //     if (err) {
  //       return res.status(400).json({ error: err });
  //     }
  //     res.status(200).json(result);
  //   });
};

//api for get doctor by id
exports.getDoctorById = async (req, res) => {
  const id = req.params.id;

  const query = "SELECT * FROM doctors WHERE doctor_id=?";

  try {
    const [result] = await db.query(query, [id]);
    if (result.length === 0) {
      return res.status(404).json({ message: "Doctor Not Found." });
    }

    res.status(200).json(result[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  //   db.query(query, [id], (err, result) => {
  //     if (err) {
  //       return res.status(400).json({ error: err });
  //     }
  //     if (result.length === 0) {
  //       return res.status(404).json({ error: "Doctor Not Found." });
  //     }
  //     res.status(200).json(result[0]);
  //   });
};

//api for update doctor
exports.updateDoctor = async (req, res) => {
  const id = req.params.id;
  const { dr_first_name, dr_last_name, dr_mobile, dr_email, dr_specialty } =
    req.body;

  const query = `UPDATE doctors SET dr_first_name=? , dr_last_name=? , dr_mobile=? ,dr_email=? ,dr_specialty=? WHERE doctor_id=?`;

  try {
    await db.query(query, [
      dr_first_name,
      dr_last_name,
      dr_mobile,
      dr_email,
      dr_specialty,
      id,
    ]);
    res.status(200).json({
      doctor_id: id,
      dr_first_name,
      dr_last_name,
      dr_mobile,
      dr_email,
      dr_specialty,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  //   db.query(
  //     query,
  //     [dr_first_name, dr_last_name, dr_mobile, dr_email, dr_specialty, id],
  //     (err, result) => {
  //       if (err) {
  //         return res.status(400).json({ error: err });
  //       }
  //       res.status(200).json({ message: "Doctor Updated Successfully." });
  //     }
  //   );
};

//api for delete doctor
exports.deleteDoctor = async (req, res) => {
  const id = req.params.id;

  const query = "DELETE FROM doctors WHERE doctor_id=?";

  try {
    await db.query(query, [id]);
    res.status(200).json({ message: "Doctor Deleted Successfully.", id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  //   db.query(query, [id], (err, result) => {
  //     if (err) {
  //       res.status(400).json({ error: err });
  //     }
  //     res.status(200).json({ message: "Doctor Deleted Successfully." });
  //   });
};
