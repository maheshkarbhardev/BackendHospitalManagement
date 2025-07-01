const express=require('express');
const router=express.Router();
const appointmentController=require('../controllers/appointmentController');

router.post('/createAppointment',appointmentController.createAppointment);
router.get('/getAllAppointments',appointmentController.getAllAppointments);
router.get('/getAppointmentById/:id',appointmentController.getAppointmentById);
router.put('/updateAppointment/:id',appointmentController.updateAppointment);
router.delete('/deleteAppointment/:id',appointmentController.deleteAppointment);

module.exports=router;