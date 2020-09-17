const uuid = require('uuid')
const slot = require("../models/Slot")
const doc = require("../models/Doctor")
const pat = require("../models/Patient")
const app = require("../models/Appointment")
const moment = require('moment')
const { Op } = require('sequelize')

exports.createAppointment = async (req, res) => {
    try {
        const {slotId, patientId} = req.body
        const slotRet = await slot.findOne({where: {id: slotId, status: 0}})
        if (slotRet) {
            const appRet = await app.create({
                id: uuid.v4(),
                patientId,
                slotId,
                prescription: "NONE",
                status: "Scheduled"
            })
            if (appRet) {
                const slotRetUpd = await slot.update({status: 1}, {where: {id: slotId}})
                if (slotRetUpd)
                    res.status(200).json({message: "Appointment created successfully", appRet})
                else
                    res.status(500).json({message: "Internal server error"})
            } else {
                res.status(500).json({message: "Internal server error"})
            }
        } else {
            res.status(404).json({message: "Slot not found"})
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({message: "Internal server error"})
    }
}

exports.viewAppointmentById = async (req, res) => {
    try {
        const {appId} = req.body
        const appRet = await app.findOne({
            include: [{
                model: slot,
                required: true,
                include: [{model: doc, required: true}]
            }, {model: pat, required: true}], where: {id: appId}
        })
        if (appRet)
            res.status(200).json({message: "Appointment found successfully", appRet})
        else
            res.status(404).json({message: "No such appointment found"})
    } catch (e) {
        res.status(500).json({message: "Internal server error"})
    }
}

exports.deleteAppointmentById = async (req, res) => {
    try {
        const {appId} = req.body
        const appRet = await app.findByPk(appId)
        if (appRet) {
            const appRetObj = appRet.toJSON()
            const slotId = appRetObj.slotId
            console.log(`slotid = ${slotId}`)
            const appRetDel = await app.destroy({where: {id: appId}})
            if (appRetDel.length !== 0) {
                const slotRetUpd = await slot.update({status: 0}, {where: {id: slotId}})
                if (slotRetUpd)
                    res.status(200).json({message: "Appointment deleted successfully", appRet})
                else
                    res.status(500).json({message: "Internal server error"})
            } else {
                res.status(500).json({message: "Internal server error"})
            }
        } else {
            res.status(404).json({message: "Appointment not found"})
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({message: "Internal server error"})
    }
}

exports.completeAppointment = async (req, res) => {
    try {
        const {appId} = req.body
        const appRet = await app.findByPk(appId)
        if (appRet) {
            const appRetMod = await app.update({status: "Complete"}, {where: {id: appId, status: "Scheduled"}})
            if (appRetMod)
                res.status(200).json({message: "Appointment completed successfully"})
            else
                res.status(500).json({message: "Internal server error"})
        } else {
            res.status(404).json({message: "Appointment not found"})
        }
    } catch (e) {
        res.status(500).json({message: "Internal server error"})
    }
}

exports.editPrescription = async (req, res) => {
    try {
        const {appId, prescription} = req.body
        const appRet = await app.findByPk(appId)
        if (appRet) {
            const appRetMod = await app.update({prescription: prescription}, {where: {id: appId, status: "Scheduled"}})
            if (appRetMod)
                res.status(200).json({message: "Appointment prescription updated successfully"})
            else
                res.status(500).json({message: "Internal server error"})
        } else {
            res.status(404).json({message: "Appointment not found"})
        }
    } catch (e) {
        res.status(500).json({message: "Internal server error"})
    }
}

exports.viewPastAppointmentsPatient = async (req, res) => {
    try {
        const {patientId} = req.body
        const appsRet = await app.findAll({include: [{
                model: slot,
                required: true,
                include: [{model: doc, required: true}]
            }, {model: pat, required: true}], where: {patientId: patientId, status: "Complete"}})
        if (appsRet.length !== 0)
            res.status(200).json({message: "Appointments fetched successfully", appsRet})
        else
            res.status(404).json({message: "Appointments not found"})
    } catch (e) {
        res.status(500).json({message: "Internal server error"})
    }
}

exports.viewPastAppointmentsDoctor = async (req, res) => {
    try {
        const {doctorId} = req.body
        const appsRet = await app.findAll({include: [{model: slot, required: true, where: {doctorId: doctorId}, include: [{model: doc, required: true}]}, {model: pat, required: true}], where: {status: "Complete"}})
        if (appsRet.length !== 0)
            res.status(200).json({message: "Appointments fetched successfully", appsRet})
        else
            res.status(404).json({message: "Appointments not found"})
    } catch (e) {
        res.status(500).json({message: "Internal server error"})
    }
}

exports.viewUpcomingAppointmentsPatient = async (req, res) => {
    try {
        const {patientId} = req.body
        const appRet = await app.findAll({
            include: [{
                model: slot,
                required: true,
                where: {dateOfSlot: {[Op.lte]: moment().add(1, "week").toDate()}},
                include: [{model: doc, required: true}]
            }, {model: pat, required: true, where: {id: patientId}}],
            where: {status: "Scheduled"}
        })
        if ( appRet.length !== 0 )
            res.status(200).json({message: "Fetched appointments successfully", appRet})
        else
            res.status(404).json({message: "Appointments not found"})
    }
    catch (e) {
        res.status(500).json({message: "Internal server error"})
    }
}

exports.viewUpcomingAppointmentsDoctor = async (req, res) => {
    try {
        const {doctorId} = req.body
        const appRet = await app.findAll({
            include: [{
                model: slot,
                required: true,
                where: {dateOfSlot: {[Op.lte]: moment().add(1, "week").toDate()}},
                include: [{model: doc, required: true, where: {id: doctorId}}]
            }, {model: pat, required: true}],
            where: {status: "Scheduled"}
        })
        if ( appRet.length !== 0 )
            res.status(200).json({message: "Fetched appointments successfully", appRet})
        else
            res.status(404).json({message: "Appointments not found"})
    }
    catch (e) {
        res.status(500).json({message: "Internal server error"})
    }
}