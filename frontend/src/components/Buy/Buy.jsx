import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'

const Buy = () => {
    const {courseId} = useParams();
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

    const [courses,setCourses] = useState([]);
    
    const [course, setCourse] = useState({});
    const [clientSecret, setClientSecret] = useState("");
    const [error, setError] = useState("");

    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.checkUser;

    //Fetch courses
    useEffect(() => {
        const fetchCourses = async () => {
            try {
               const response = await axios.get("http://localhost:3000/api/courseroute/courses");
               console.log(response.data);
               setCourses(response.data.courses);
               setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
    fetchCourses();
    },[]);

    const handlePurchase = async () => {
        if(!token) {
            toast.error("Please login to purchase the course");
            return
        }
        try {
            setLoading(true);
            // const response = axios.post(`http://localhost:4002/api/courseroute/buy/${courseId}`,{},{
            //     headers: {
            //         Authorization: `Bearer ${token}`
            //     },
            //     withCredentials: true,
            // })
            const response = await fetch(`http://localhost:3000/api/courseroute/buy/${courseId}/${token._id}/`, {
                method: "POST",
                headers: {'content-type' : 'application/json',},
            });
            if(response.ok){
                toast.success(response.data.message || "Course purchased successfully");
                alert("Course purchased successfully");
                setLoading(false);
                navigate("/purchases");
            
            }
            


        } catch (error) {
            alert(error);
            setLoading(false);
            if(error?.response?.status === 400){
                alert("You have already purchased this course");

                toast.error("You have already purchased this course");
            }else{
                toast.error(error.response?.data?.errors);
            }
        }
    }
  return (
    <div className='flex h-screen items-center justify-center bg-gray-800 flex-col'>
        {courses.filter(course => course._id === courseId).map((course) => (
            
            <div key={course._id} className='flex border border-gray-200 rounded-lg p-4 shadow-sm grid w-md'>
                <img src={course.image.url} alt={course.title} className='rounded mb-4'/>
                <h2 className='font-bold text-lg mb-2 text-gray-200'> {course.title}</h2>
                <p className='text-gray-400 mb-4'>
                    {course.description}
                </p>
                <div className='flex justify-between items-center mb-4'>
                    <span className='font-bold text-xl'>Rs. {course.price}{" "}
                        <span className='text-gray-500 line-through'>5999</span>
                    </span>
                    <span className='text-green-600' >20% off</span>
                </div>

                <button className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-800 duration-300 hover:cursor-pointer'
                    onClick={handlePurchase}
                    disabled={loading}>
                      Buy now
                </button>
                
            </div>
        ))}

    </div>
  )
}

export default Buy
