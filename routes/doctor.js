const { completeInfoDoctor } = require("../controllers/doctor")
const express = require('express')
const passport = require('../config/passport-strats')
const router = express.Router()

router.post("/finishReg", passport.authenticate('jwtDoc', {session: false}), completeInfoDoctor)

module.exports = router