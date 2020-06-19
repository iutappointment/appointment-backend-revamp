const Sequelize = require('sequelize')
require('dotenv').config()

const db_db = process.env.DB_DATABASE
const db_host = process.env.DB_HOST
const db_user = process.env.DB_USER
const db_pass = process.env.DB_PASS

const sequelize = new Sequelize(db_db, db_user, db_pass, {
    host: db_host,
    dialect: 'postgres'
})

module.exports = sequelize