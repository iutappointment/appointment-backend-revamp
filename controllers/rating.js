const rat = require("../models/Rating")

exports.getRatingsById = async (req, res) => {
    try {
        const {doctorId} = req.body
        const docRating = await rat.findAll({where: {doctorId}})
        if (docRating)
            res.status(200).json({message: "Rating found successfully", docRating})
        else
            res.status(404).json({message: "Rating not found"})
    } catch (e) {
        res.status(500).json({message: "Internal server error"})
    }
}

exports.editRatingsById = async (req, res) => {
    try {
        const {doctorId, rating} = req.body
        const prevRat = await rat.findOne({where: {doctorId}})
        if (!prevRat) {
            res.status(404).json({message: "Rating not found"})
            return
        }
        let numRatings = parseInt(prevRat.numRatings) + 1
        let sumRatings = parseInt(prevRat.sumRatings) + parseInt(rating)
        let average = sumRatings / numRatings
        const updOpt = {
            numRatings,
            sumRatings,
            average
        }
        const newRat = rat.update(updOpt, {where: {doctorId}})
        if (newRat)
            res.status(200).json({message: "Rating updated successfully"})
        else
            res.status(404).json({message: "Rating not found"})
    } catch (e) {
        console.log("err: " + e)
        res.status(500).json({message: "Internal server error"})
    }
}