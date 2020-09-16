const { patientAgeDist, patientAddressDist, patientGenderDist, doctorAddressDist, doctorSpecialtyDist, doctorRatingDist, triggerDisp } = require("../controllers/dataAnalysis")
const express = require('express')
const router = express.Router()

router.get("/patientAgeDist", patientAgeDist)
router.get("/patientAddressDist", patientAddressDist)
router.get("/patientGenderDist", patientGenderDist)
router.get("/doctorAddressDist", doctorAddressDist)
router.get("/doctorSpecialtyDist", doctorSpecialtyDist)
router.get("/doctorRatingDist", doctorRatingDist)
router.get("/triggerDisp", triggerDisp)

module.exports = router