const doc = require("../models/Doctor")

exports.completeInfoDoctor = (req, res) => {
    const id = req.body.id
    let updOpt = req.body
    delete updOpt.id
    console.log(updOpt)
    doc.update(updOpt, {where: {id: id}})
        .then( (rows) => {
            if ( rows[0] === 0 )
            {
                res.status(404).json({message: "No such doctor found"})
            }
            else
            {
                res.status(200).json({message: "Doctor updated successfully"})
            }
        })
        .catch( (err) => {
            res.status(500).json({message: "Internal server error: " + err})
        })
}

exports.getSingleDoctor = async (req, res) => {
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