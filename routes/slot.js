const {createSlot, getSlotById, deleteSlotsByDoctorId, deleteSlotById, viewAllSlotsByDoctor} = require("../controllers/slot")
const passport = require('../config/passport-strats')
const router = require("express").Router()

router.post("/create", passport.authenticate('jwtDoc', {session: false}), createSlot)
router.post("/getSlotByID", getSlotById)
router.post("/viewAllSlotsByDoctor", viewAllSlotsByDoctor)
router.post("/deleteSlotByDoctorId", passport.authenticate('jwtDoc', {session: false}), deleteSlotsByDoctorId)
router.post("/deleteSlotId", passport.authenticate('jwtDoc', {session: false}), deleteSlotById)

module.exports = router