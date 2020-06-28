const Sequelize = require('sequelize')
const Doctor = require("./Doctor")
const Patient = require("./Patient")
const Slot = require("./Slot")
const sequelize = require('../config/db')

const Appointment = sequelize.define('appointment',
{
    doctorId:
        {
            type: Sequelize.UUIDV4,
            allowNull: false,
            references:
                {
                    model: Doctor,
                    key: 'id'
                }
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
    dateOfAppointment:
        {
            type: Sequelize.DATE,
            allowNull: false
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

module.exports = Appointment