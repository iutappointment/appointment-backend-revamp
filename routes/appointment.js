const {createAppointment, viewAppointmentById, deleteAppointmentById, completeAppointment, editPrescription} = require("../controllers/appointment")
const express = require('express')
const passport = require('../config/passport-strats')
const router = express.Router()

router.post("/createAppointment", passport.authenticate('jwtPat', {session: false}), createAppointment)
router.post("/viewAppointment", viewAppointmentById)
router.post("/deleteAppointment", passport.authenticate('jwtPat', {session: false}), deleteAppointmentById)
router.post("/completeAppointment", passport.authenticate('jwtPat', {session: false}), completeAppointment)
router.post("/updatePrescription", passport.authenticate('jwtDoc', {session: false}), editPrescription)

module.exports = router
