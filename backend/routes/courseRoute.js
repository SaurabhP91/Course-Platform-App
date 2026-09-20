// CLOUDINARY CODE IS NOT WORKING DUE TO API_KEY READ ERROR !!!!

const express = require('express');
const Course = require("../models/course");
const Purchase = require("../models/purchase")
const userMiddleware  = require('../middlewares/userMid');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config();


(async function() {
    
    cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
    });
    
})();


const router = express.Router();

router.post("/create", async (req,res) => {
    const {title,description,price} = req.body;
    const {image} = req.files;
      try {
            
            if(!req.files || Object.keys(req.files).length === 0)
            {
                return res.status(400).send("no file uploaded!!");
            }
            if(!title || !description || !price)
            {
                return res.status(400).json({message:"All fields are required!!"});
            }

            //cloudinary code
            const cloud_response = await cloudinary.uploader.upload(image.tempFilePath);
            if(!cloud_response || cloud_response.error)
            {
                return res.status(400).json({errors: "Error uploading file to cloudinary"});
            }
    
            const newCourse = {
                title,description,price,image:{
                    public_id: cloud_response.public_id,
                    url: cloud_response.url,
                },
            };
    
            const course = await Course.create(newCourse)
            console.log("course created");
    
            res.status(200).json(course);
        } catch (error) {
            res.status(500).json(error.message);
        }
});

router.put("/update/:courseId", async(req,res) => {
    const {courseId} = req.params;
    const {title,description,price} = req.body;
    const {image} = req.files;

    try {
            if(!req.files || Object.keys(req.files).length === 0)
            {
                return res.status(400).send("no file uploaded!!");
            }
            if(!title || !description || !price)
            {
                return res.status(400).json({message:"All fields are required!!"});
            }

            //cloudinary code
            const cloud_response = await cloudinary.uploader.upload(image.tempFilePath);
            if(!cloud_response || cloud_response.error)
            {
                return res.status(400).json({errors: "Error uploading file to cloudinary"});
            }


        const updatedCourse = await Course.updateOne({_id: courseId},{
            title,description,price,
            image:{
                public_id: cloud_response?.public_id || image?.public_id,
                url: cloud_response?.url || image?.url
            }
        });

        res.status(201).json({message: "course updated successfully"});
    } catch (error) {
        res.status(500).json({error: "Error in course updating"});
        
    }
});

router.put("/delete/:courseId", async(req,res) => {
    const {courseId} = req.params;

    try {
        const deletedCourse = await Course.findOneAndDelete({_id: courseId});
        if(!deletedCourse){
             return res.status(404).json({error:"Course not found"});
        }

        res.status(201).json({message: "course deleted successfully"})
    } catch (error) {
        res.status(500).json({error: "Error in course deletion"});
        
    }
});

router.get("/courses", async (req,res) => {
    try {
        const courses = await Course.find({}); 

        if(!courses){
            return res.status(404).json("Course not found")
        }
        res.status(201).json({courses});

    } catch (error) {
        res.status(500).json({error:"Error in getting courses"});
        
    }
})

router.get("/courses/:courseId", async(req,res) => {
    const {ObjectId} = req.params.courseId;
    try 
    {   
        const course = await Course.findOne({ObjectId});
        if(!course) {
            return res.status(404).json({error:"course not found"});
        }
        res.status(201).json({course});
    } catch (error) {
        res.status(500).json({error});
        
    }
});

// Stripe payment code

router.post("/buy/:courseId/:userId", async(req,res) => {
    const {userId} = req.params;
    const {courseId} = req.params;

    try {
        const course = await Course.findById(courseId);
        if(!course) {
            console.log("Course not found");
            return res.status(404).json({errors: "Course not found"});
            
        }
        const existingPurchase = await Purchase.findOne({userId, courseId});
        if(existingPurchase) {
            console.log("User has already purchased this course");
            return res.status(400).json({errors: "User has already purchased this course"});
        }

        //stripe payment goes here


        //adding to purchase list of user
        await Purchase.create({userId,courseId});

        console.log("Course purchased successfully");
        return res.status(201).json({
            message: "Course purchased successfully",
            course
        });


    } catch (error) {
        res.status(500).json({errors: "Error in course buying"});
        console.log("error in course buying", error);
    }
})

module.exports = router;

