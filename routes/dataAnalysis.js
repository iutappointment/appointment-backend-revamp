const { patientAgeDist, patientAddressDist, patientGenderDist, doctorAddressDist, doctorSpecialtyDist, doctorRatingDist, triggerDisp, patientBloodDist, doctorBloodDist, doctorGenderDist, appointmentCompletion } = require("../controllers/dataAnalysis")
const express = require('express')
const router = express.Router()

router.get("/patientAgeDist", patientAgeDist)
router.get("/patientAddressDist", patientAddressDist)
router.get("/patientGenderDist", patientGenderDist)
router.get("/doctorGenderDist", doctorGenderDist)
router.get("/doctorAddressDist", doctorAddressDist)
router.get("/doctorSpecialtyDist", doctorSpecialtyDist)
router.get("/doctorRatingDist", doctorRatingDist)
router.get("/triggerDisp", triggerDisp)
router.get("/doctorBloodDist", doctorBloodDist)
router.get("/patientBloodDist", patientBloodDist)
router.get("/appointmentCompletion", appointmentCompletion)

module.exports = router