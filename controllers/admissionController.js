const db=require('../config/db');

//api for create admissions
exports.createAdmission=async(req,res)=>{
    const{patient_id, admission_date, discharge_date, diagnosis, attending_doctor_id}=req.body;

    const query=`INSERT INTO admissions (patient_id, admission_date, discharge_date, diagnosis, attending_doctor_id) VALUES (?,?,?,?,?)`;

    try{
        const [result]=await db.query(query,[patient_id, admission_date, discharge_date, diagnosis, attending_doctor_id]);

        res.status(200).json({
            id:result.insertId,patient_id, admission_date, discharge_date, diagnosis, attending_doctor_id
        })
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}

//api for get all admissions
exports.getAllAdmissions=async(req,res)=>{
    const query="SELECT * FROM admissions";

    try {
        const [result]=await db.query(query);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};

//api for get admission by id
exports.getAdmissionById=async(req,res)=>{
    const id=req.params.id;
    const query="SELECT * FROM admissions WHERE admission_id=?";

    try {
        const [result]=await db.query(query,[id]);
        if(result.length === 0){
            return res.status(404).json({message:"Admission Details Not Found."})
        }
        res.status(200).json(result[0]);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};

//api for update admission details.
exports.updateAdmission=async(req,res)=>{
    const id=req.params.id;
    const {patient_id, admission_date, discharge_date, diagnosis, attending_doctor_id}=req.body;

    const query = `UPDATE admissions SET patient_id=?, admission_date=?, discharge_date=?, diagnosis=?, attending_doctor_id=? WHERE admission_id=?`;

    try {
        await db.query(query,[patient_id, admission_date, discharge_date, diagnosis, attending_doctor_id,id]);
        res.status(200).json({
            admission_id:id,patient_id, admission_date, discharge_date, diagnosis, attending_doctor_id            
        })
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

//api for delete admission
exports.deleteAdmission=async(req,res)=>{
    const id=req.params.id;

    const query="DELETE FROM admissions WHERE admission_id=?";

    try {
        await db.query(query,[id]);
        res.status(200).json({message:"Doctor Deleted Successfully.",id})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}