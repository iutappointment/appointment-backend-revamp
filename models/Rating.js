const Sequelize = require('sequelize')
const Doctor = require("./Doctor")
const sequelize = require('../config/db')

const Rating = sequelize.define('rating',
    {
        doctorId:
            {
                type: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false,
                references:
                    {
                        model: Doctor,
                        key: 'id'
                    }
            },
        numRatings:
            {
                type: Sequelize.INTEGER
            },
        sumRatings:
            {
                type: Sequelize.INTEGER
            },
        average:
            {
                type: Sequelize.NUMBER
            }
    })

module.exports = Rating