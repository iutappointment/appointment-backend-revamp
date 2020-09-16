const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool(
    {
        connectionString: process.env.DATABASE_URL
    }
)

exports.patientAgeDist = async (req, res) => {
    try{
        let age = []
        let count = []
        const queryStr = `select count(*), (extract (year from (age (dob)))) as age from patients group by age`
        const result = pool.query(queryStr)
        console.log(result.rows)
        // if ( result.rowCount !== 0 ) {
        //     for ( let i = 0 ; i < result.rowCount ; i++ )
        //     {
        //         if (result.rows[i].age !== null && result.rows[i].count !== null) {
        //             age.push(parseInt(result.rows[i].age))
        //             count.push(parseInt(result.rows[i].count))
        //         }
        //     }
        // }
        // res.status(200).json({x: age, y: count})
    }
    catch (e) {
        console.log(e)
        res.status(500).json({message: "Internal server error"})
    }
}

exports.patientAddressDist = async (req, res) => {
    try{
        let address = []
        let count = []
        const queryStr = `select count(*), address from patients group by address`
        const result = await pool.query(queryStr)
        if ( result.rowCount !== 0 ) {
            for ( let i = 0 ; i < result.rowCount ; i++ )
            {
                if (result.rows[i].address !== null && result.rows[i].address !== null) {
                    address.push(result.rows[i].address.toString())
                    count.push(parseInt(result.rows[i].count))
                }
            }
        }
        res.status(200).json({x: address, y: count})
    }
    catch (e) {
        console.log(e)
        res.status(500).json({message: "Internal server error"})
    }
}

exports.patientGenderDist = async (req, res) => {
    try{
        let gender = []
        let count = []
        const queryStr = `select count(*), gender from patients group by gender;`
        const result = await pool.query(queryStr)
        if ( result.rowCount !== 0 ) {
            for ( let i = 0 ; i < result.rowCount ; i++ )
            {
                if (result.rows[i].gender !== null && result.rows[i].count !== null) {
                    gender.push(result.rows[i].gender.toString())
                    count.push(parseInt(result.rows[i].count))
                }
            }
        }
        res.status(200).json({x: gender, y: count})
    }
    catch (e) {
        console.log(e)
        res.status(500).json({message: "Internal server error"})
    }
}

exports.doctorAddressDist = async (req, res) => {
    try{
        let address = []
        let count = []
        const queryStr = `select count(*), address from doctors group by address`
        const result = await pool.query(queryStr)
        if ( result.rowCount !== 0 ) {
            for ( let i = 0 ; i < result.rowCount ; i++ )
            {
                if (result.rows[i].address !== null && result.rows[i].address !== null) {
                    address.push(result.rows[i].address.toString())
                    count.push(parseInt(result.rows[i].count))
                }
            }
        }
        res.status(200).json({x: address, y: count})
    }
    catch (e) {
        console.log(e)
        res.status(500).json({message: "Internal server error"})
    }
}

exports.doctorSpecialtyDist = async (req, res) => {
    try{
        let specialty = []
        let count = []
        const queryStr = `select count(*), specialty from doctors group by specialty`
        const result = await pool.query(queryStr)
        if ( result.rowCount !== 0 ) {
            for ( let i = 0 ; i < result.rowCount ; i++ )
            {
                if (result.rows[i].specialty !== null && result.rows[i].count !== null) {
                    specialty.push(result.rows[i].specialty.toString())
                    count.push(parseInt(result.rows[i].count))
                }
            }
        }
        res.status(200).json({x: specialty, y: count})
    }
    catch (e) {
        console.log(e)
        res.status(500).json({message: "Internal server error"})
    }
}

exports.doctorRatingDist = async (req, res) => {
    try{
        let values = []
        let rating = []
        let count = []
        const queryStr = `select count(*) from ratings where average between $1 and $2;`
        for ( let i = 0 ; i < 5 ; i++ )
        {
            values[0] = i
            values[1] = i+1
            const result = await pool.query(queryStr, values)
            rating.push(parseInt(i+1))
            count.push(parseInt(result.rows[0].count))
        }
        res.status(200).json({x: rating, y: count})
    }
    catch (e) {
        console.log(e)
        res.status(500).json({message: "Internal server error"})
    }
}