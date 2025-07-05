const db = require("../config/db");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const jwt = require("jsonwebtoken");

//configure multer for image uploading

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/"); //stored uploaded file in uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); //use the original file name
  },
});
 
const upload = multer({ storage }).single("image");

//user Register API

exports.registerUser = (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      console.log("Multer Error:-", err);
      return res.status(400).json({ message: "Image Upload Failed." });
    }

    const { firstName, lastName, email, password, confirmPassword, role } =
      req.body;
    const image_path = req.file ? req.file.path : "";

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password Do Not Match." });
    }

    try {
      const [existing] = await db.query("SELECT * FROM users WHERE email=?", [
        email,
      ]);
      if (existing.length > 0) {
        return res.status(400).json({ message: "Email Allready Registered." });
      }

      const hashPassword = await bcrypt.hash(password, 10);

      await db.query(
        "INSERT INTO users(firstName, lastName, email, password,role,image_path) VALUES (?,?,?,?,?,?)",
        [firstName, lastName, email, hashPassword, role, image_path]
      );

      res.status(200).json({ message: "User Registered Successfully." });
    } catch (error) {
      console.log("Signup Error:- ", error);
      res.status(500).json({ message: "Server Error" });
    }
  });
};

//login api

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email=?", [email]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User Not Found." });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials." });
    }

    const token = jwt.sign(
      {
        user_id: user.user_id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login Successfully.",
      token,
      role: user.role,
      user: {
        user_id: user.user_id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        image_path: user.image_path,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};