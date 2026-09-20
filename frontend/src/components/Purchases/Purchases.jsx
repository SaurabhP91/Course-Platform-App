import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios"; 
import logo from "/logo.webp";
import { FaCircleUser } from "react-icons/fa6";
import { RiHome2Fill } from "react-icons/ri";
import { FaDiscourse } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { HiMenu, HiX } from "react-icons/hi";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
const Purchases = () => {
    const [purchases, setPurchases] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState(true);
    const [sidebarFlag,setSidebarFlag] = useState(false);

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.checkUser;

        // Check token
    useEffect(() => {
        if (token) {
            console.log("Token: ", token)
            setIsLoggedIn(true);
        } else {
            console.log("no token found: ",token);
            setIsLoggedIn(false);
        }
    }, []);

    if(!token) {
        navigate("/login");
    }

    //Fetch purchases
    useEffect(() => {
        const fetchPurchases = async () => {
            try {
            //    const response = await axios.get("http://localhost:3000/api/userroute/purchases", 
            //     {
            //     withCredentials: true,
            //    });
             const response = await fetch(`http://localhost:3000/api/userroute/purchases/${token._id}`, {
                method: "GET",
                headers: {'content-type' : 'application/json',},
            });
            const data = await response.json();
               console.log(data.purchased);
               console.log(data.courseData);
               setPurchases(data.courseData);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchPurchases();
    },[]);

    const toggleSidebar = () => {
        setSidebarFlag(!sidebarFlag);
    }

    //Logout
    const handleLogout = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api//userroute/logout`, {
            withCredentials: true,
          });
          toast.success(response.data.message);
          localStorage.removeItem("user");
          setIsLoggedIn(false);
        } catch (error) {
          console.log("Error in logging out ", error);
          toast.error(error.response.data.errors || "Error in logging out");
        }
    };
  return (
    <div className='flex h-screen'>
        <button className='md:hidden fixed top-4 left-4 z-20 text-3xl text-gray-800' onClick={toggleSidebar}>
          {sidebarFlag? <HiX/> : <HiMenu/>}
        </button>

        {/* Sidebar */}
        <aside className={`fixed top-0 left-0 h-screen bg-gray-100 w-64 p-5 transform z-10 transition-transform duration-300 ease-in-out ${sidebarFlag ? "translate-x-0" : "translate-x-full"} md:translate-x-0 md:static`}>
          <div className='flex items-center mb-10 mt-10 md:mt-0'>
              <img src={logo} alt='Profile' className = 'rounded-full h-12 w-12'/>
          </div>
          <nav>
              <ul>
                  <li className='mb-4'>
                      <a href='/' className='flex items-center'>
                          <RiHome2Fill className='mr-2' /> Home
                      </a>
                  </li>
                  <li className='mb-4'>
                      <a href='courses' className='flex items-center '>
                          <FaDiscourse className='mr-2' /> Courses
                      </a>
                  </li>
                  <li className='mb-4'>
                      <a href='/purchases' className='flex items-center text-blue-500'>
                          <FaDownload className='mr-2' /> Purchases
                      </a>
                  </li>
                  <li className='mb-4'>
                      <a href='#' className='flex items-center'>
                          <IoMdSettings className='mr-2' /> Settings
                      </a>
                  </li>

                  <li>
                      {isLoggedIn ? (
                          <Link to={'/'} className='flex items-center' onClick={handleLogout}>
                              <IoLogOut className='mr-2' /> Logout
                          </Link>
                      ) : (
                          <Link to={'/login'} className='flex items-center'>
                              <IoLogOut className='mr-2' /> Login
                          </Link>                       
                      )}
                  </li>               
              </ul>
          </nav>
        </aside>

        {/* Sidebar toggle button for mobile */}
        <button className='fixed top-4 left-4 z-50 md:hidden bg-blue-600 text-white p-2 rounded-lg' 
        onClick={toggleSidebar}>
            {sidebarFlag ? (
              <HiX className="text-2xl" />
            ) : (
              <HiMenu className="text-2xl" />
            )}

        </button>

        {/* Main content */}
        <div className= {`flex-1 p-8 bg-gray-50 transition-all duration-300 ${sidebarFlag ? "ml-34" : "ml-0"} md:ml-34`}>
            <h2 className='text-xl font-semibold mt-6 md:mt-0 mb-6'>
                My Purchases

            </h2>

            {/* error message */}
            {errorMessage && (
                <div className='text-red-500 text-center mb-4'> {errorMessage}</div>
            )}

            {/* Render Purchases */}
            {purchases.length > 0 ? (
                <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6'>
                    {purchases.map((purchase,index) => (
                        <div key={index} className='bg-white rounded-lg shadow-md p-4 mb-4 '>
                            <div className='flex flex-col items-center space-y-4'>
                                {/* course image */}
                                <img className='rounded-lg w-full h-48 object-contain'
                                src={purchase.image?.url || "https://via.placeholder.com/200"} alt={purchase.title}/>
                                <div className='text-center'>
                                    <h3 className='text-lg font-bold'>{purchase.title}</h3>
                                    <p className='text-gray-500'>
                                        {purchase.description.length > 100 ? `${purchase.description.slice(0,100)}...` : purchase.description}
                                    </p>
                                    <span className='text-green-700 font-semibold text-sm'>
                                        ${purchase.price} only
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (<p className='text-gray-500'>You have no purchases yet</p>)}
        </div>
      
    </div>
  )
}

export default Purchases;
