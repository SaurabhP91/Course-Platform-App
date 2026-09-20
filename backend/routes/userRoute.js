const express = require('express');
const Course = require("../models/course");
const User = require("../models/user");
const Purchase = require("../models/purchase");
const cloudinary = require('cloudinary').v2;

const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const router = express.Router();

const secret = 'asdfe45we45w345wegw345werjktjwertkj';


router.get("/users", async (req,res) => {
    try {
        const users = await User.find({}); 
        if(!users){
            res.status(404).json("No users found");
        }
        res.status(201).json({users});
    } catch (error) {
        res.status(500).json({error:"Error in getting users"});
        
    }
})

router.post('/register', async (req,res) => {
    try{
        
        const { firstName, lastName, email, password } = req.body;
        //check if user exists
        const checkUser = await User.findOne({email});
        if(checkUser)
        {
            return res.status(400).send('Email already exists');
        }
        //generate hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create a new user
        const newUser = new User({
            firstName, lastName,
            email,
            password: hashedPassword
        });

        //save user
        const user = await newUser.save();
        res.status(200).json(user);

    }catch (error) {
        res.status(500).json(error.message);
        console.log(error.message);
    }
});

router.post('/login', async (req,res) => {
    try{
        const {email, password} = req.body;
        //check if email exists
        const checkUser = await User.findOne({email});
        if(!checkUser)
        {
            res.status(400).send('Email is not registered');
        }

        //password validation
        const validPass = await bcrypt.compare(password,checkUser.password);
        if(!validPass)
        {
            return res.status(400).send('Invalid password')
        }

        //generate jwt
        const token = jwt.sign({ firstName: checkUser.firstName, id: checkUser._id}, secret, {expiresIn: '1d'}
            // res.cookie('token', token).json({
            //     id: checkUser._id,
            //     firstName: checkUser.firstName,
            // });
            //;
        );
        res.cookie('token', token);
        //.json(
            //{
                // id: checkUser._id,
                // firstName: checkUser.firstName,}
            //);
        res.status(201).json({ message: "Login successful", checkUser, token});
    } catch(error) {
        res.status(500).json(error.message);
        console.log("error in login");
    }
});

router.get('/logout', async (req,res) => {
    try {
        res.clearCookie("token");
        // localStorage.removeItem("user");
        res.status(200).json({message: "logged out successfully"});

    } catch (error) {
        res.status(500).json("Error in logout");

    }
})

router.get('/purchases/:userId', async(req,res) => {
    // const userId = req.cookies.token._id;
    const {userId} = req.params;
    console.log("Userid:",userId);
    // if(!userId) console.log("no user logged in found in req.checkUser");
    if(!userId){
        return res.status(400).json({
            error: "User Id is required"
        });
    }
    try {
        const purchased = await Purchase.find({userId});
        // console.log(purchased);

        let purchasedCourseId = [];

        for(let i=0; i<purchased.length; i++){
            purchasedCourseId.push(purchased[i].courseId);
        }
        // console.log("purchasedCourseid: ",purchasedCourseId);
        const courseData = await Course.find(
            {
                _id: { $in: purchasedCourseId},
            }
        );
        console.log(courseData);

       return res.status(200).json({purchased, courseData});
    } catch (error) {
        res.status(500).json({ errors: "Error in purchases"});
        console.log("Error in purchase",error);
    }
});

module.exports = router;
