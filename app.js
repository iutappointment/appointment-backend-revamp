const express = require('express')
require('dotenv').config()

const port = process.env.PORT || 6996
const app = express()

const sequelize = require('./config/db')

sequelize.authenticate()
    .then(()=>
    {
        console.log("Up and running")
    })
    .catch((err)=>
    {
        console.log(`Error: ${err}`)
    })

app.listen(port, () => {
    console.log(`Server up and running on ${port}`)
})