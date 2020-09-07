const {createAppointment, viewAppointmentById, viewPastAppointmentsPatient, viewPastAppointmentsDoctor, deleteAppointmentById, completeAppointment, editPrescription, viewUpcomingAppointmentsPatient, viewUpcomingAppointmentsDoctor} = require("../controllers/appointment")
const express = require('express')
const passport = require('../config/passport-strats')
const router = express.Router()

router.post("/viewAppointment", viewAppointmentById)
router.post("/createAppointment", passport.authenticate('jwtPat', {session: false}), createAppointment)
router.post("/viewPastAppointmentsPatient", passport.authenticate('jwtPat', {session: false}), viewPastAppointmentsPatient)
router.post("/viewPastAppointmentsDoctor", passport.authenticate('jwtDoc', {session: false}), viewPastAppointmentsDoctor)
router.post("/viewUpcomingAppointmentsPatient", viewUpcomingAppointmentsPatient)
router.post("/viewUpcomingAppointmentsDoctor", viewUpcomingAppointmentsDoctor)
router.post("/deleteAppointment", passport.authenticate('jwtPat', {session: false}), deleteAppointmentById)
router.post("/updatePrescription", passport.authenticate('jwtDoc', {session: false}), editPrescription)
router.post("/completeAppointment", passport.authenticate('jwtPat', {session: false}), completeAppointment)

module.exports = router
