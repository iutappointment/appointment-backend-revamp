const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const doctor = require("../models/Doctor")
const patient = require("../models/Patient")
const bcrypt = require('bcrypt')

passport.use('localDoc', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'pass',
    },
    async (email, pass, done) =>
    {
        try
        {
            const user = await doctor.findOne({where: {email: email}})

            if (!user)
            {
                return done(null, false)
            }

            if ( (bcrypt.compareSync(pass, user.pass)) === true )
            {
                return done(null, user)
            }
            else
            {
                return done(null, false)
            }
        }
        catch (e) {
            done(e, false)
        }
    }
))

passport.use('localPat', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'pass',
    },
    async (email, pass, done) =>
    {
        try
        {
            const user = await patient.findOne({where: {email: email}})

            if (!user)
            {
                return done(null, false)
            }

            if ( (bcrypt.compareSync(pass, user.pass)) === true )
            {
                return done(null, user)
            }
            else
            {
                return done(null, false)
            }
        }
        catch (e) {
            done(e, false)
        }
    }
))

module.exports = passport