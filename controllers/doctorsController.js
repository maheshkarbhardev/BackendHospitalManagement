const db=require('../config/db');

//api for createDoctor
exports.createDoctor=(req,res)=>{
    const {dr_first_name, dr_last_name, dr_mobile, dr_email, dr_specialty}=req.body;

    const query="INSERT INTO doctors (dr_first_name, dr_last_name, dr_mobile, dr_email, dr_specialty) VALUES(?,?,?,?,?)";

    db.query(query,[dr_first_name, dr_last_name, dr_mobile, dr_email, dr_specialty],(err,result)=>{
        if(err){
            return res.status(400).json({error:err})
        }
        res.status(200).json({message:"Doctor Created Successfully."})
    })
};

//api for get all doctors.
exports.getAllDoctors=(req,res)=>{
    const query="SELECT * FROM doctors ORDER BY created_at DESC";

    db.query(query,(err,result)=>{
        if(err){
            return res.status(400).json({error:err})
        }
        res.status(200).json(result);
    })
};

//api for get doctor by id
exports.getDoctorById=(req,res)=>{
    const id=req.params.id;

    const query="SELECT * FROM doctors WHERE id=?";

    db.query(query,[id],(err,result)=>{
        if(err){
            return res.status(400).json({error:err})
        }
        if(result.length===0){
            return res.status(404).json({error:"Doctor Not Found."})
        }
        res.status(200).json(result[0])
    })
};

//api for update doctor
exports.updateDoctor=(req,res)=>{
    const id=req.params.id;
    const {dr_first_name, dr_last_name, dr_mobile, dr_email, dr_specialty}=req.body;

    const query="UPDATE doctors SET dr_first_name=? , dr_last_name=? , dr_mobile=? ,dr_email=? ,dr_specialty=? WHERE id=?";

    db.query(query,[dr_first_name, dr_last_name, dr_mobile, dr_email, dr_specialty,id],(err,result)=>{
        if(err){
            return res.status(400).json({error:err})
        }
        res.status(200).json({message:"Doctor Updated Successfully."})
    })
}

//api for delete doctor
exports.deleteDoctor=(req,res)=>{
    const id=req.params.id;

    const query="DELETE FROM doctors WHERE id=?";

    db.query(query,[id],(err,result)=>{
        if(err){
            res.status(400).json({error:err})
        }
        res.status(200).json({message:"Doctor Deleted Successfully."})
    })
}

