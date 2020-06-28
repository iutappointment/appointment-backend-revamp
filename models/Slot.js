const Sequelize = require('sequelize')
const Doctor = require("./Doctor")
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
            allowNull: false,
            references:
                {
                    model: Doctor,
                    key: 'id'
                }
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
            type: Sequelize.INTEGER
        }
})

module.exports = Slot