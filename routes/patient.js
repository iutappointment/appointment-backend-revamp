const { completeInfoPatient } = require("../controllers/patient")
const express = require('express')
const passport = require('../config/passport-strats')
const router = express.Router()

router.post("/finishReg", passport.authenticate('jwtPat', {session: false}), completeInfoPatient)

module.exports = router