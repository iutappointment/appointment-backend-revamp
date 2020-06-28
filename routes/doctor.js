const { completeInfoDoctor, getSingleDoctor } = require("../controllers/doctor")
const express = require('express')
const passport = require('../config/passport-strats')
const router = express.Router()

router.post("/finishReg", passport.authenticate('jwtDoc', {session: false}), completeInfoDoctor)
router.post("/findById", getSingleDoctor)


module.exports = router