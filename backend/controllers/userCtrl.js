const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendMail = require('./sendMail')

const {CLIENT_URL} = process.env
const userCtrl = {
    register: async (req, res) => {
        try {
            const {name, email, password, phone_number} = req.body
            
            if (!name || !email || !password || !phone_number)
            return res.status(400).json({msg: "Please fill in all fields"})

            if(!validateEmail)
            return res.status(400).json({msg: "Invalid email address"})

            if(!validatePhoneNumber)
            return res.status(400).json({msg: "Please enter a correct mobile number"})

            const user = await Users.findOne({email})
            if(user) return res.status(400).json({msg: "This email already exists"})

            if(password.length < 6)
            return res.status(400).json({msg: "Password must be at least 6 characters"})

            const passwordHash = await bcrypt.hash(password, 12)
            
            const newUser = {
                name, email, phone_number, password: passwordHash
            }

            const activation_token = createActivationToken(newUser)

            const url = `${CLIENT_URL}/user/activate${activation_token}`
            sendMail(email, url)
            
            res.json({msg: "Register Success! Please activate your email to continue"}) 
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    return re.test(email)

}

function validatePhoneNumber(phone_number){
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    return re.test(phone_number)
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'} )
}

const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '5m'} )
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'} )
}
 
module.exports = userCtrl