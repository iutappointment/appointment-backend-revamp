const doc = require("../models/Doctor")
const pat = require("../models/Patient")
const JWT = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const uuid = require('uuid')

//signup
exports.registerDoctorBasic = async (req, res) =>
{
    try {
        const name = req.body.name
        const email = req.body.email
        const pass = genPassword(req.body.pass)

        const user = await doc.create({ id: uuid.v4(), name: name, email: email, pass: pass })

        if ( !user )
        {
            res.status(500).json({message: "Unable to create doctor"})
        }
        else
        {
            const userObj = user.toJSON()
            delete userObj.pass
            res.status(200).json({message: "Doctor created successfully", userObj})
        }
    }
    catch (e) {
        res.status(500).json({message: "Internal server error"})
    }
}

exports.registerPatientBasic = async (req, res) =>
{
    try {
        const name = req.body.name
        const email = req.body.email
        const pass = genPassword(req.body.pass)

        const user = await pat.create({ id: uuid.v4(), name: name, email: email, pass: pass })

        if ( !user )
        {
            res.status(500).json({message: "Unable to create patient"})
        }
        else
        {
            const userObj = user.toJSON()
            delete userObj.pass
            res.status(200).json({message: "Patient created successfully", userObj})
        }
    }
    catch (e) {
        res.status(500).json({message: "Internal server error"})
    }
}


//login
exports.login = (req, res) => {
    if ( req.user )
    {
        const jwt = JWT.sign({iss: "AppOintment", sub: req.user.id, iat: new Date().getTime()}, process.env.JWT_SECRET)
        const user = req.user.toJSON()
        delete user.pass
        res.status(200).json({jwt, user})
    }
    else
    {
        res.status(500).json({message: "Internal server error"})
    }
}

//hashing function
function genPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}