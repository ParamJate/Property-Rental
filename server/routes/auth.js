const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const multer = require('multer')

const User = require('../models/User')


router.post("/register", async(req, res) =>{
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
        
        res.status(201).json({ message:"User registered successfully!", userID: newUser._id})
    } catch(err){
        console.log(err)
        res.status(500).json({ message: "registartion failed!", error: err.message})  
    }
})

router.post("/login", async(req, res)=>{
    try {
        const { email, password} = req.body
        const user = await User.findOne({ email })
        if(!user){
            return res.status(409).json({ message: "User does not exist!"})
        }

        const isMatch = await bcrypt.compare(password, user.passwrd)
        if(!isMatch){
            return res.status(400).json({ message: "Invalid credentials!!"})
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        delete user.password

        res.status(200).json({ token, user })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message})
    }
})



module.exports = router

