const doc = require("../models/Doctor")
const rat = require("../models/Rating")
const Sequelize = require('sequelize')


exports.completeInfoDoctor = async (req, res) => {
    try {
        const id = req.body.id
        let updOpt = req.body
        delete updOpt.id
        console.log(updOpt)
        const rows = await doc.update(updOpt, {where: {id: id}})
        if ( rows[0] === 0 )
            res.status(404).json({message: "No such doctor found"})
        else
            res.status(200).json({message: "Doctor updated successfully"})
    }
    catch (e) {
        res.status(500).json({message: "Internal server error"})
    }

}

exports.getSingleDoctorById = async (req, res) => {
    try
    {
        const { doctorId } = req.body
        const user = await doc.findByPk(doctorId)
        if ( !user )
        {
            res.status(404).json({message: "Doctor not found"})
        }
        else
        {
            const userObj = user.toJSON()
            delete userObj.pass
            res.status(200).json({message: "Doctor found successfully", userObj})
        }
    }
    catch (e) {
        res.status(500).json({message: "Internal server error"})
    }
}

exports.deleteDoctorById = async (req, res) => {
    try{
        const { doctorId } = req.body
        const delUser = await doc.destroy({where: {id: doctorId}})
        if ( delUser )
            res.status(200).json({message: "Doctor deleted successfully"})
        else
            res.status(404).json({message: "Doctor not found"})
    }
    catch (e) {
        res.status(500).json({message: "Internal server error"})
    }
}

exports.findDoctor = async (req, res) => {
    try
    {
        const criteria = req.body
        const limit = req.body.limit
        delete criteria.limit
        const user = await doc.findAll({where: criteria, limit})
        if ( user )
            res.status(200).json({message: "Doctor found", user})
        else
            res.status(404).json({message: "Doctor not found"})
    }
    catch (e) {
        res.status(500).json({message: "Internal server error"})
    }
}

exports.findTopDoctors = async (req, res) => {
    try
    {
        const criteria = req.body
        const limit = req.body.limit
        delete criteria.limit
        const users = await doc.findAll({include: [{model: rat, required: true}], where: criteria, order: [Sequelize.literal("rating.average DESC")], limit})
        if ( users )
            res.status(200).json({message: "Doctors found", users})
        else
            res.status(404).json({message: "Doctor not found"})
    }
    catch (e) {
        console.log(e)
        res.status(500).json({message: "Internal server error"})
    }
}