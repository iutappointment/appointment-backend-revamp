const Sequelize = require('sequelize')
const sequelize = require('../config/db')

const Doctor = sequelize.define('doctor',
{
    id:
        {
            type: Sequelize.UUIDV4,
            primaryKey: true
        },
    name:
        {
            type: Sequelize.STRING,
            allowNull: false
        },
    email:
        {
            type: Sequelize.STRING,
            allowNull: false
        },
    pass:
        {
            type: Sequelize.STRING,
            allowNull: false
        },
    phone:
        {
            type: Sequelize.STRING
        },
    dob:
        {
            type: Sequelize.DATE
        },
    gender:
        {
            type: Sequelize.STRING
        },
    blood:
        {
            type: Sequelize.STRING
        },
    address:
        {
            type: Sequelize.STRING
        },
    specialty:
        {
            type: Sequelize.STRING
        },
    bmdc:
        {
            type: Sequelize.STRING
        }
})

module.exports = Doctor