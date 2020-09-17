const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool(
    {
        connectionString: process.env.DATABASE_URL
    }
)

exports.patientBloodDist = async (req, res) => {
    try{
        let blood = []
        let count = []
        const queryStr = `select count(*), blood from patients group by blood`
        const result = await pool.query(queryStr)
        if ( result.rowCount !== 0 ) {
            for ( let i = 0 ; i < result.rowCount ; i++ )
            {
                if (result.rows[i].blood !== null && result.rows[i].address !== null) {
                    blood.push(result.rows[i].blood.toString())
                    count.push(parseInt(result.rows[i].count))
                }
            }
        }
        else
        {
            res.status(404).json({message: "No data found"})
        }
        res.status(200).json({x: blood, y: count})
    }
    catch (e) {
        res.status(500).json({message: "Internal server error"})
    }
}

exports.doctorBloodDist = async (req, res) => {
    try{
        let blood = []
        let count = []
        const queryStr = `select count(*), blood from doctors group by blood`
        const result = await pool.query(queryStr)
        if ( result.rowCount !== 0 ) {
            for ( let i = 0 ; i < result.rowCount ; i++ )
            {
                if (result.rows[i].blood !== null && result.rows[i].address !== null) {
                    blood.push(result.rows[i].blood.toString())
                    count.push(parseInt(result.rows[i].count))
                }
            }
        }
        else
        {
            res.status(404).json({message: "No data found"})
        }
        res.status(200).json({x: blood, y: count})
    }
    catch (e) {
        res.status(500).json({message: "Internal server error"})
    }
}

exports.triggerDisp = async ( req, res ) => {
    try {
        const queryStr = `select count("doctorId") from ratings`
        const result = await pool.query(queryStr)
        if ( result.rowCount !== 0 )
        {
            res.status(200).json({x: "Number of doctors", y: result.rows[0].count})
        }
        else
        {
            res.status(404).json({message: "No data found"})
        }
    }
    catch (e) {
        res.status(500).json({message: "Internal server error"})
    }
}

exports.patientAgeDist = async (req, res) => {
    try{
        let age = []
        let count = []
        const queryStr = `select count(*), (extract (year from (age (dob)))) as age from patients group by age`
        const result = await pool.query(queryStr)
        console.log(result.rows)
        if ( result.rowCount !== 0 ) {
            for ( let i = 0 ; i < result.rowCount ; i++ )
            {
                if (result.rows[i].age !== null && result.rows[i].count !== null) {
                    age.push(parseInt(result.rows[i].age))
                    count.push(parseInt(result.rows[i].count))
                }
            }
        }
        else
        {
            res.status(404).json({message: "No data found"})
        }
        res.status(200).json({x: age, y: count})
    }
    catch (e) {
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
        else
        {
            res.status(404).json({message: "No data found"})
        }
        res.status(200).json({x: address, y: count})
    }
    catch (e) {
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
        else
        {
            res.status(404).json({message: "No data found"})
        }
        res.status(200).json({x: gender, y: count})
    }
    catch (e) {
        res.status(500).json({message: "Internal server error"})
    }
}

exports.doctorGenderDist = async (req, res) => {
    try{
        let gender = []
        let count = []
        const queryStr = `select count(*), gender from doctors group by gender;`
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
        else
        {
            res.status(404).json({message: "No data found"})
        }
        res.status(200).json({x: gender, y: count})
    }
    catch (e) {
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
        else
        {
            res.status(404).json({message: "No data found"})
        }
        res.status(200).json({x: address, y: count})
    }
    catch (e) {
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
        else
        {
            res.status(404).json({message: "No data found"})
        }
        res.status(200).json({x: specialty, y: count})
    }
    catch (e) {
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
        res.status(500).json({message: "Internal server error"})
    }
}

exports.appointmentCompletion = async ( req, res ) => {
    try{
        let total, complete
        const totQuery = `select count(*) from appointments`
        const compQuery = `select count(*) from appointments where status = 'Complete'`
        const tot = await pool.query(totQuery)
        const comp = await pool.query(compQuery)
        if ( tot.rowCount !== 0 )
        {
            if ( tot.rows[0].count == '0' )
                res.status(404).json({message: "No appointments scheduled"})
            else
                total = tot.rows[0].count
        }
        else
        {
            res.status(404).json({message: "No data found"})
        }
        if ( comp.rowCount !== 0 )
        {
            complete = comp.rows[0].count
        }
        else
        {
            res.status(404).json({message: "No data found"})
        }
        res.status(200).json({x: parseInt(total), y: parseInt(complete)})
    }
    catch (e) {
        res.status(500).json({message: "Internal server error"})
    }
}

exports.bookedTimeDist = async (req, res) => {
    try
    {
        let startTime = []
        let count = []
        const query = `select count (*), "startTime" from slots where status = 1 group by "startTime" order by count(*)`
        const result = await pool.query(query)
        if ( result.rowCount !== 0 )
        {
            for ( let i = 0 ; i < result.rowCount ; i++ )
            {
                if ( result.rows[i].count !== null && result.rows[i].startTime !== null )
                {
                    startTime.push(result.rows[i].startTime)
                    count.push(parseInt(result.rows[i].count))
                }
            }
            res.status(200).json({x: startTime, y: count})
        }
        else
        {
            res.status(404).json({message: "No data found"})
        }
    }
    catch (e)
    {
        res.status(500).json({message: "Internal server error"})
    }
}

exports.prescriptionAnalysis = async (req, res) => {
    try {
        let drugArr = []
        let drugCount = []
        let diagnosisArr = []
        let diagnosisCount = []
        const query = `select prescription from appointments where status = 'Complete' and prescription is not null`
        const result = await pool.query(query)
        if (result.rowCount !== 0) {
            for (let i = 0; i < result.rowCount; i++) {
                if (result.rows[i].prescription !== null) {
                    const presStr = result.rows[i].prescription
                    let temp = presStr
                    const drugs = temp.slice(presStr.search("Drugs: ") + 7, presStr.length)
                    const sepDrugs = drugs.split(", ")
                    for ( let j = 0 ; j < sepDrugs.length ; j++ )
                    {
                        if ( drugArr.indexOf(sepDrugs[j]) === -1 )
                        {
                            drugArr.push(sepDrugs[j])
                            drugCount.push(1)
                        }
                        else
                        {
                            drugCount[drugArr.indexOf(sepDrugs[j])]++
                        }
                    }
                    temp = presStr
                    const diagnosis = temp.slice(presStr.search("Diagnosis: ") + 11, presStr.search(" Drugs: "))
                    // diagnosisArr.push(diagnosis)
                    const sepDx = diagnosis.split(", ")
                    for ( let j = 0 ; j < sepDx.length ; j++ )
                    {
                        if ( diagnosisArr.indexOf(sepDx[j]) === -1 )
                        {
                            diagnosisArr.push(sepDx[j])
                            diagnosisCount.push(1)
                        }
                        else
                        {
                            diagnosisCount[diagnosisArr.indexOf(sepDx[j])]++
                        }
                    }
                }
            }
            res.status(200).json({drugs: drugArr, drugsCount: drugCount, diagnoses: diagnosisArr, diagnosesCount: diagnosisCount})
        }
        else
        {
            res.status(404).json({message: "No data found"})
        }
    } catch (e) {
        res.status(500).json({message: "Internal server error"})
    }
}