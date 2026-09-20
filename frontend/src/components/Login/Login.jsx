import React, { useState } from 'react';
import logo from "/logo.webp";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";


const Login = () => {

    const navigate = useNavigate();

    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/api/userroute/login", {
                method: "POST",
                headers: {'content-type' : 'application/json',},

                body:JSON.stringify({
                    email, password,
                }),
            });
            const data = await response.json();

            if(response.ok) {
                console.log("Login successful: ",data);
                alert("Login successful");
                localStorage.setItem("user",JSON.stringify(data));

                navigate("/");
            }
        } catch (error) {
            alert(error);
            console.log(error.message);
        }

    }

  return (
    <div className='bg-gradient-to-r from-black to-blue-950 max-h-fit py-5'>
        <div className='flex flex-col h-screen container mx-auto items-center justify-center text-white my-5'>
            {/* HEADER */}
            <header className=' top-0 left-0 w-full flex justify-between items-center p-5 bg-transparent'>
                <div className='flex items-center space-x-2'>
                    <img src={logo} alt="logo" className='w-10 h-10 rounded-full'/>
                    <Link to={"/"} className='text-xl font-bold text-orange-500'>
                        Eduverse
                    </Link>
                </div>
                <div className='fkex items-center space-x-4'>
                    <Link to={"/login"}
                    className='bg-transparent border border-gray-500 py-2 px-4 rounded-md'>
                        Login
                    </Link>
                    <Link to={"/courses"}
                    className='bg-orange-500 py-2 px-4 rounded-md'>
                        Join now
                    </Link>
                </div>
            </header>

            {/* LOGINFORM */}
            <div className='bg-gray-900 p-8 rounded-lg shadow-lg w-[500px] mt-20 '>
                <h2 className='text-2xl font-bold mb-4 text-center'>
                    Welcome to <span className='text-orange-500'>Eduverse</span>
                </h2>
                <p className='text-center text-gray-400 mb-6'>
                    Login to access paid content
                </p>

                <form onSubmit={handleSubmit}>

                    <div className='mb-4'>
                        <label htmlFor='email' className='text-gray-400 mb-2'>
                            Email
                        </label>
                        <div className='relative'>
                             <input type='text' id='email'  className='w-full p-3 rounded-md bg-gray-800 border 
                            border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            placeholder='Type your Email' onChange={(e) => setEmail(e.target.value)}/>
                            <span className='absolute right-3 top-3 text-gray-500 cursor-pointer'>👁️</span>
                        </div>
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='password' className='text-gray-400 mb-2'>
                            Password
                        </label>
                        <div className='relative'>
                             <input type='password' id='password'  className='w-full p-3 rounded-md bg-gray-800 border 
                            border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            placeholder='**********' onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    </div>
                    <button type='submit' className='w-full bg-orange-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md
                     transition'>Login</button>                   
                </form>
            </div>
        </div>  
    </div>
  )
}

export default Login
