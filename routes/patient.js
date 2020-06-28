const { completeInfoPatient, getSinglePatient } = require("../controllers/patient")
const express = require('express')
const passport = require('../config/passport-strats')
const router = express.Router()

router.post("/finishReg", passport.authenticate('jwtPat', {session: false}), completeInfoPatient)
router.post("/findById", getSinglePatient)

module.exports = router