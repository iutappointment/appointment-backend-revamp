const { patientAgeDist } = require("../controllers/dataAnalysis")
const express = require('express')
const router = express.Router()

router.get("/patientAgeDist", patientAgeDist)

module.exports = router