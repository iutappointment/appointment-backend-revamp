const pat = require("../models/Patient")

exports.completeInfoPatient = async (req, res) => {
    try {
        const id = req.body.id
        let updOpt = req.body
        delete updOpt.id
        console.log(updOpt)
        const rows = await pat.update(updOpt, {where: {id: id}})
        if ( rows[0] === 0 )
            res.status(404).json({message: "No such patient found"})
        else
            res.status(200).json({message: "Patient updated successfully"})
    }
    catch (e) {
        res.status(500).json({message: "Internal server error"})
    }
}

exports.getSinglePatient = async (req, res) => {
    try
    {
        const { patientId } = req.body
        const user = await pat.findByPk(doctorId)
        if ( !user )
        {
            res.status(404).json({message: "Patient not found"})
        }
        else
        {
            const userObj = user.toJSON()
            delete userObj.pass
            res.status(200).json({message: "Patient found successfully", userObj})
        }
    }
    catch (e) {
        res.status(500).json({message: "Internal server error"})
    }
}

exports.deletePatientById = async (req, res) => {
    try
    {
        const { patientId } = req.body
        const delPat = await pat.destroy({where: {id: patientId}})
        if ( delPat )
            res.status(200).json({message: "Patient deleted successfully"})
        else
            res.status(404).json({message: "Patient not found"})
    }
    catch (e) {
        res.status(500).json({message: "Internal server error"})
    }
}