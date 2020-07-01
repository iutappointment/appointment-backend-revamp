const { createSlot, getSlotById } = require("../controllers/slot")
const passport = require('../config/passport-strats')
const router = require("express").Router()

router.post("/create", passport.authenticate('jwtDoc', {session: false}), createSlot)
router.post("/getSlotByID", getSlotById)

module.exports = router