const Sequelize = require('sequelize')
const sequelize = require('../config/db')

const Appointment = sequelize.define('appointment',
{
    doctorId:
        {
            type: Sequelize.UUIDV4,
            allowNull: false
        },
    patientId:
        {
            type: Sequelize.UUIDV4,
            allowNull: false
        },
    dateOfAppointment:
        {
            type: Sequelize.DATE,
            allowNull: false
        },
    slotId:
        {
            type: Sequelize.UUIDV4
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