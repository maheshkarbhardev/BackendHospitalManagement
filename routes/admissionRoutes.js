const express=require('express');
const router=express.Router();
const admissionController=require('../controllers/admissionController');

router.post('/createAdmission',admissionController.createAdmission);
router.get('/getAllAdmissions',admissionController.getAllAdmissions);
router.get('/getAdmissionById/:id',admissionController.getAdmissionById);
router.put('/updateAdmission/:id',admissionController.updateAdmission);
router.delete('/deleteAdmission/:id',admissionController.deleteAdmission);

module.exports=router;