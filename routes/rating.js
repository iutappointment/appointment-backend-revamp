const { getRatingsById, editRatingsById } = require("../controllers/rating")
const express = require('express')
const passport = require('../config/passport-strats')
const router = express.Router()

router.post("/getById", getRatingsById)
router.post("/updateById", passport.authenticate('jwtPat', {session: false}), editRatingsById)

module.exports = router