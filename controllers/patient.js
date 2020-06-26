const pat = require("../models/Patient")

exports.completeInfoPatient = (req, res) => {
    const id = req.body.id
    let updOpt = req.body
    delete updOpt.id
    console.log(updOpt)
    pat.update(updOpt, {where: {id: id}})
        .then( (rows) => {
            if ( rows[0] === 0 )
            {
                res.status(404).json({message: "No such patient found"})
            }
            else
            {
                res.status(200).json({message: "Patient updated successfully"})
            }
        })
        .catch( (err) => {
            res.status(500).json({message: "Internal server error: " + err})
        })
}