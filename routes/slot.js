const {createSlot, getSlotById, deleteSlotsByDoctorId, deleteSlotById, viewAllSlotsByDoctor} = require("../controllers/slot")
const passport = require('../config/passport-strats')
const router = require("express").Router()

router.post("/getSlotById", getSlotById)
router.post("/viewAllSlotsByDoctorId", viewAllSlotsByDoctor)
router.post("/create", passport.authenticate('jwtDoc', {session: false}), createSlot)
router.post("/deleteSlotId", passport.authenticate('jwtDoc', {session: false}), deleteSlotById)
router.post("/deleteSlotByDoctorId", passport.authenticate('jwtDoc', {session: false}), deleteSlotsByDoctorId)

module.exports = router