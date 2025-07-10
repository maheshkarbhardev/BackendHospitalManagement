const db = require("../config/db");

//api for createPatients
exports.createPatient = async (req, res) => {
  const {
    firstName,
    lastName,
    mobile,
    email,
    gender,
    birthDate,
    address,
    city,
    state,
    country,
    disease,
    height,
    weight,
  } = req.body;

  const query = `
    INSERT INTO patients 
    (firstName, lastName, mobile, email, gender, birthDate, address, city, state, country, disease, height, weight) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    const [result] = await db.query(query, [
      firstName,
      lastName,
      mobile,
      email,
      gender,
      birthDate,
      address,
      city,
      state,
      country,
      disease,
      height,
      weight,
    ]);

    res.status(200).json({
      id: result.insertId,
      firstName,
      lastName,
      mobile,
      email,
      gender,
      birthDate,
      address,
      city,
      state,
      country,
      disease,
      height,
      weight,
    });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

//api for getAllPatients data
exports.getAllPatients = async (req, res) => {
  const query = "SELECT * FROM patients";

  try {
    const [result] = await db.query(query);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};


//api for getPatients by Id
exports.getPatientById = async (req, res) => {
  const id = req.params.id;
  const query = "SELECT * FROM patients WHERE patient_id = ?";

  try {
    const [result] = await db.query(query, [id]);

    if (result.length === 0) {
      return res.status(404).json({ message: "Patient Not Found." });
    }

    res.status(200).json(result[0]);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

//api for update patient.
exports.updatePatient = async (req, res) => {
  const id = req.params.id;
  const {
    firstName,
    lastName,
    mobile,
    email,
    gender,
    birthDate,
    address,
    city,
    state,
    country,
    disease,
    height,
    weight,
  } = req.body;

  const query = `
    UPDATE patients SET 
      firstName=?, lastName=?, mobile=?, email=?, gender=?, birthDate=?, 
      address=?, city=?, state=?, country=?, disease=?, height=?, weight=? 
    WHERE patient_id=?
  `;

  try {
    await db.query(query, [
      firstName,
      lastName,
      mobile,
      email,
      gender,
      birthDate,
      address,
      city,
      state,
      country,
      disease,
      height,
      weight,
      id,
    ]);

    res.status(200).json({
      patient_id: Number(id),
      firstName,
      lastName,
      mobile,
      email,
      gender,
      birthDate,
      address,
      city,
      state,
      country,
      disease,
      height,
      weight,
    });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};


//api for delete patient.
exports.deletePatient = async (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM patients WHERE patient_id=?";

  try {
    await db.query(query, [id]);
    res.status(200).json({ message: "Patient Deleted Successfully.", id: Number(id) });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
