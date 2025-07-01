const db=require('../config/db');

//api for createPatients
exports.createPatient=(req,res)=>{
    const {firstName, lastName, mobile, email, gender, birthDate, address, city, state, country, disease, height, weight}=req.body;

    const query="INSERT INTO patients (firstName, lastName, mobile, email, gender, birthDate, address, city, state, country, disease, height, weight) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";

    db.query(query,[firstName, lastName, mobile, email, gender, birthDate, address, city, state, country, disease, height, weight],(err,result)=>{
        if(err){
           return res.status(400).json({error:err})            
        }
        res.status(200).json({message:"Patients Created Successfully.",id:result.insertId})
    })
}

//api for getAllPatients data
exports.getAllPatients=(req,res)=>{
    const query="SELECT * FROM patients ORDER BY created_at DESC";

    db.query(query,(err,result)=>{
        if(err){
            return res.status(400).json({error:err})
        }
        res.status(200).json(result)
    })
};

//api for getPatients by Id
exports.getPatientById=(req,res)=>{
    const id=req.params.id;
    const query="SELECT * FROM patients WHERE id=?";

    db.query(query,[id],(err,result)=>{
        if(err){
            return res.status(400).json({error:err})
        }

        if(result.length===0){
            return res.status(404).json({message:"Patient Not Found."})
        }
        res.status(200).json(result[0])
    })
};

//api for update patient.
exports.updatePatient=(req,res)=>{
    const id=req.params.id;
    const {firstName, lastName, mobile, email, gender, birthDate, address, city, state, country, disease, height, weight}=req.body;

    const query="UPDATE patients SET firstName=? ,lastName=?,mobile=?,email=?,gender=?,birthDate=?,address=?,city=?,state=?,country=?,disease=?,height=?,weight=? WHERE id=?";

    db.query(query,[firstName, lastName, mobile, email, gender, birthDate, address, city, state, country, disease, height, weight,id],(err,result)=>{
        if(err){
            return res.status(400).json({error:err})
        }
        res.status(200).json({message:"Patient Updated Successfully."})
    })
};

//api for delete patient.
exports.deletePatient=(req,res)=>{
    const id=req.params.id;

    const query="DELETE FROM patients WHERE id=?";

    db.query(query,[id],(err,result)=>{
        if(err){
            return res.status(400).json({error:err})
        }
        res.status(200).json({message:"Patient Deleted Successfully."})
    })
}
