const Sequelize = require('sequelize')
const sequelize = require('../config/db')

const Slot = sequelize.define('slot',
{
    id:
        {
            type: Sequelize.UUIDV4,
            primaryKey: true
        },
    doctorId:
        {
            type: Sequelize.UUIDV4,
            allowNull: false
        },
    dateOfSlot:
        {
            type: Sequelize.DATE
        },
    startTime:
        {
            type: Sequelize.TIME
        },
    endTime:
        {
            type: Sequelize.TIME
        },
    status:
        {
            type: Sequelize.STRING
        }
})

module.exports = Slot