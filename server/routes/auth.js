const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// const multer = require('multer')

const User = require('../models/User')

router.post('/register', async(req, res) =>{
    try{
        const { firstName, lastName, email, password } = req.body

        const existingUser = await User.findOne({ email })
        if (existingUser){
            return res.status(409).json({ message: "User already exists!"})
        }

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User ({
            firstName,
            lastName,
            email,
            password: hashedPassword
        })

        await newUser.save()

        //sending success msg
        
        res.status(200).json({ message:"User registered successfully!", user: newUser})
    } catch(err){
        console.log(err)
        res.status(500).json({ message: "registartion failed!", error: err.messasge})  
    }
})

module.exports = router