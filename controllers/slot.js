const slot = require("../models/Slot")
const doc = require("../models/Doctor")
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

exports.createSlot = async (req, res) => {
    try {
        const {doctorId, dateOfSlot, startTime, endTime, status, numSlots} = req.body
        const slotArray = makeSlots(doctorId, dateOfSlot, startTime, endTime, status, numSlots)
        const slots = await slot.bulkCreate(slotArray)
        if ( slots )
            res.status(200).json({message: "Slots created successfully", slots})
        else
            res.status(500).json({message: "Unable to create slots"})
    }
    catch (e) {
        res.status(500).json({message: "Internal server error"})
    }
}

exports.getSlotById = async (req, res) => {
    try {
        const { slotId } = req.body
        console.log(slotId)
        const slotRet = await slot.findByPk(slotId, {include: [{model: doc}]})
        if ( slotRet )
            res.status(200).json({message: "Slot retrieved successfully", slotRet})
        else
            res.status(404).json({message: "Slot not found"})
    }
    catch (e) {
        console.log(e)
        res.status(500).json({message: "Internal server error"})
    }
}