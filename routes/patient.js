const {completeInfoPatient, getSinglePatient, deletePatientById} = require("../controllers/patient")
const express = require('express')
const passport = require('../config/passport-strats')
const router = express.Router()

router.post("/findById", getSinglePatient)
router.post("/updateProfile", passport.authenticate('jwtPat', {session: false}), completeInfoPatient)
router.post("/deleteById", passport.authenticate('jwtPat', {session: false}), deletePatientById)

module.exports = router