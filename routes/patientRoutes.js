const express=require('express');
const router=express.Router();
const patientController=require('../controllers/patientsController');

router.post('/createPatient',patientController.createPatient);
router.get('/getAllPatients',patientController.getAllPatients);
router.get('/getPatientById/:id',patientController.getPatientById);
router.put('/updatePatient/:id',patientController.updatePatient);
router.delete('/deletePatient/:id',patientController.deletePatient);

module.exports=router;