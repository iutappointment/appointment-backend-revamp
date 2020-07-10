const Sequelize = require('sequelize')
const Doctor = require("./Doctor")
const Patient = require("./Patient")
const Slot = require("./Slot")
const sequelize = require('../config/db')

const Appointment = sequelize.define('appointment',
{
    id:
        {
            type:Sequelize.UUIDV4,
            primaryKey: true
        },
    patientId:
        {
            type: Sequelize.UUIDV4,
            allowNull: false,
            references:
                {
                    model: Patient,
                    key: 'id'
                }
        },
    slotId:
        {
            type: Sequelize.UUIDV4,
            references:
                {
                    model: Slot,
                    key: 'id'
                }
        },
    prescription:
        {
            type: Sequelize.STRING
        },
    status:
        {
            type: Sequelize.STRING
        }
})

Appointment.belongsTo(Slot, {
    foreignKey: "slotId"
})
Appointment.belongsTo(Patient, {
    foreignKey: "patientId"
})

module.exports = Appointment