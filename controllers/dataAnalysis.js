const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool(
    {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASS,
        port: process.env.PORT,
    }
)

exports.patientAgeDist = async (req, res) => {
    try{
        let age
        const queryStr = `select count(*), (extract (year from (age (dob)))) as age from patients group by age having (extract (year from (age (dob)))) between ${age} and ${age+10}`
        for ( let i = 0 ; i < 10 ; i++ )
        {
            age = i*10;
            const res = await pool.query(queryStr)
            console.log(res.rows[0])
        }
    }
    catch (e) {
        console.log(e)
    }
}