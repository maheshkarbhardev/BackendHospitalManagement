const express=require('express');
const router=express.Router();
const doctorsController=require('../controllers/doctorsController');

router.post('/createDoctor',doctorsController.createDoctor);
router.get('/getAllDoctors',doctorsController.getAllDoctors);
router.get('/getDoctorById/:id',doctorsController.getDoctorById);
router.put('/updateDoctor/:id',doctorsController.updateDoctor);
router.delete('/deleteDoctor/;id',doctorsController.deleteDoctor);

module.exports=router;