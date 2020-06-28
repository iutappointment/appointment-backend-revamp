const express = require('express')
require('dotenv').config()

const port = process.env.PORT || 6996
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoute = require("./routes/auth")
const docRoute = require("./routes/doctor")
const patRoute = require("./routes/patient")
const slotRoute = require("./routes/slot")

app.use("/auth", authRoute)
app.use("/doctor", docRoute)
app.use("/patient", patRoute)
app.use("/slot", slotRoute)

app.listen(port, () => {
    console.log(`Server up and running on ${port}`)
})