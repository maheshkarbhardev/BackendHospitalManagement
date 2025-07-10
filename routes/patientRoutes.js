const express=require('express');
const router=express.Router();
const patientController=require('../controllers/patientsController');
const { protect } = require('../middleware/authMiddleware');

router.post('/createPatient',protect,patientController.createPatient);
router.get('/getAllPatients',protect,patientController.getAllPatients);
router.get('/getPatientById/:id',protect,patientController.getPatientById);
router.put('/updatePatient/:id',protect,patientController.updatePatient);
router.delete('/deletePatient/:id',protect,patientController.deletePatient);

module.exports=router;