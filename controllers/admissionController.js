const db=require('../config/db');

//api for create admissions
exports.createAdmission=(req,res)=>{
    const {patient_id, admission_date, discharge_date, diagnosis, attending_doctor_id}=req.body;

    const query="INSERT INTO admissions (patient_id, admission_date, discharge_date, diagnosis, attending_doctor_id) VALUES (?,?,?,?,?)";

    db.query(query,[patient_id, admission_date, discharge_date, diagnosis, attending_doctor_id],(err,result)=>{
        if(err){
            return res.status(400).json({error:err})
        }
        res.status(200).json({message:"Admission Created Successfully."})
    })
}

//api for get all admissions
exports.getAllAdmissions=(req,res)=>{
    const query="SELECT * FROM admissions ORDER BY admission_date DESC";

    db.query(query,(err,result)=>{
        if(err){
            return res.status(400).json({error:err})
        }
        res.status(200).json(result)
    })
};

//api for get admission by id
exports.getAdmissionById=(req,res)=>{
    const id=req.params.id;
    const query="SELECT * FROM admissions WHERE id=?";

    db.query(query,[id],(err,result)=>{
        if(err){
            return res.status(400).json({error:err})
        }
        if(result.length===0){
            return res.status(404).json({error:"Admission Details Not Found."})
        }
        res.status(200).json(result[0])
    })
};

//api for update admission details.
exports.updateAdmission=(req,res)=>{
    const id=req.params.id;
    const {patient_id, admission_date, discharge_date, diagnosis, attending_doctor_id}=req.body;

    const query="UPDATE admissions SET patient_id=? , admission_date=? , discharge_date=? ,diagnosis=? , attending_doctor_id=? WHERE id=?";

    db.query(query,[patient_id, admission_date, discharge_date, diagnosis, attending_doctor_id,id],(err,result)=>{
        if(err){
            return res.status(400).json({error:err})
        }
        res.status(200).json({message:"Admission Details Updated Successfully."})
    })
}

//api for delete admission
exports.deleteAdmission=(req,res)=>{
    const id=req.params.id;

    const query="DELETE FROM admissions WHERE id=?";

    db.query(query,[id],(err,result)=>{
        if(err){
            return res.status(400).json({error:err})
        }
        res.status(200).json({message:"Admission Details Deleted Successfully."})
    })
}