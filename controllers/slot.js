const slot = require("../models/Slot")
const uuid = require('uuid')
const moment = require('moment')

function makeSlots(doctorId, dateOfSlot, startTime, endTime, status, numSlots)
{
    const slotArray = []
    let a = moment(startTime, "hh:mm")
    const b = moment(endTime, "hh:mm")
    const diff = b.diff(a, 'minutes')
    const inc = diff/numSlots
    for ( let i = 0 ; i < numSlots ; i++ )
    {
        const newObj = {
            id: uuid.v4(),
            doctorId,
            dateOfSlot,
            startTime : a.format("hh:mm"),
            endTime : a.add(inc, "minutes").format("hh:mm"),
            status
        }
        slotArray.push(newObj)
    }
    return slotArray
}

exports.createSlot = (req, res) => {
    const {doctorId, dateOfSlot, startTime, endTime, status, numSlots} = req.body
    const slotArray = makeSlots(doctorId, dateOfSlot, startTime, endTime, status, numSlots)
    slot.bulkCreate(slotArray)
        .then((result) => {
            res.status(200).json({message: "Slots created successfully", result})
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({message: "Internal server error"})
        })
}
