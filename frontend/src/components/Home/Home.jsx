import React, { useEffect, useState, useRef} from 'react';
import logo from "/logo.webp";
import { Link } from 'react-router-dom';
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import axios from 'axios';
import Slider from 'react-slick';
import Responsive from '../slider/SimpleSlider';
import toast from "react-hot-toast"

//SLIDER COMPONENT NOT WORKING 4:12:00-changes
//MAKE SLIDING ANIMATIONS FOR COURSE ROW CONTAINER
//MAKE LOGIN AND LOGOUT FUNCTIONS


const Home = () => {
    const courseRef = useRef(null);

    const [courses,setCourses] = useState([]);
    const [isLoggedIn,setIsLoggedIn] = useState(false);

    // token
    useEffect(() => {
      const user = localStorage.getItem("user");
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }, []);

    const handleLogout = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/userroute/logout",{
                withCredentials: true,
            })
            
            toast.success(response.data.message);
            localStorage.removeItem("user");

            setIsLoggedIn(false);
        } catch (error) {
            console.log(error.message);
            toast.error(error.response.data.errors || "error in logging out");
        }
    }

    const scrollLeft = () => {
        console.log("LEFT");
        courseRef.current?.scrollBy({
            left: courseRef.current?.clientWidth,
            behavior: "smooth",
        });
    };

    const scrollRight = () => {
        console.log("RIGHT");
        courseRef.current?.scrollBy({
            left: -courseRef.current?.clientWidth,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        const fetchCourses = async () => {
            try {
               const response = await axios.get("http://localhost:3000/api/courseroute/courses");
               console.log(response.data);
               setCourses(response.data.courses);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCourses();
    },[]);

    var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  console.log(Slider);
  return (
    <div className="bg-gradient-to-r from-black to-blue-900 h-max-content py-5">

        <div className=' container mx-auto '>

                        {/*HEADER */}
            <header className='flex items-center justify-between '>
                <div className='flex items-center space-x-2'>
                    <img src={logo} alt="logo" className='w-10 h-10 rounded-full'/>
                    
                    <h1 className='text-2xl text-orange-500 font-bold'>Eduverse</h1>
                </div>
                <div className='space-x-4'>
                    {isLoggedIn? (
                        <button onClick={handleLogout} className='bg-transparent text-white py-2 px-4 border-white rounded border-2 mx-2'>
                            Logout
                        </button>
                        
                    ) : (<>
                        <button className='bg-transparent text-white py-2 px-4 border-white border-2 mx-2 rounded'><Link to={"/login"}>Login</Link></button>
                        <button className='bg-transparent text-white py-2 px-4 border-white border-2 mx-2 rounded'><Link to={"/signup"}>Signup</Link></button>

                    </>)}
                    
                </div>
            </header>



            <section className='text-center py-20'>
                <h1 className='text-4xl font-semibold text-orange-500'>Eduverse</h1>

                <br/>
                <p className='text-gray-500'>
                    Sharpen your skills with courses crafted by experts
                </p>
                <div className='space-x-4 mt-8'>
                    <Link to={'/courses'} className='bg-green-500 text-white rounded py-3 px-6 rounded font-semibold hover:bg-white hover:cursor-pointer duration-300 hover:text-black'>
                        Explore Courses
                    </Link>
                    <Link to={'/'} className='bg-green-500 text-white rounded py-3 px-6 rounded font-semibold hover:bg-white hover:cursor-pointer  duration-300 hover:text-black'>
                        Courses videos
                    </Link>
                </div>
            </section>
            <section id='section2'>
                {/* <Slider className="" {...settings}>
                    {
                        courses.map((course) => {
                            <div key={course._id} className='p-4'>
                                <div className='relative flex-shrink-0 w-92 transition-transform duration-300 transform hover:scale-105'>
                                    <div className='bg-gray-900 rounded-lg overflow-hidden'>
                                        <img className='h-32 w-full object-contain' src={course.image?.url} alt=''/>
                                        <div className="p-6 text-center">
                                            <h2 className='text-xl font-bold text-white'>{course.title}</h2>
                                            <button>Enroll now</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </Slider>  */}
            <div id='course-slider'>
                <h1 className='text-white text-2xl'>COURSES</h1>

                <div id='course-row' className='flex flex-row'>
                    {/*LEFT BUTTON */}
                    <button onClick={scrollLeft} className='relative left-0 top-0  z-10 
                    bg-black/60 text-white px-5 text-4xl py-0 rounded-full'>&lt;</button>

                    <div id='course-container' className='flex w-325 overflow-auto scroll-smooth '>
                        {
                            courses.map((course) => (
                                <div key={course._id} className='p-4 flex-row flex '>
                                    <div className='relative flex-shrink-0 flex-row w-90 transition-transform duration-300 transform hover:scale-105'>
                                        <div className='bg-gray-900 rounded-lg overflow-hidden'>
                                            <img className='h-32 w-full object-contain' src={course.image?.url} alt=''/>
                                            <div className="p-6 text-center">
                                                <h2 className='text-xl font-bold text-white'>{course.title}</h2>
                                                <button className='text-white mt-4 bg-orange-500 py-2 px-4 rounded-full hover:bg-blue-500 
                                                hover:cursor-pointer duration-300'>Enroll now</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                        
                {/* RIGHT BUTTON */}
                <button onClick={scrollRight} className='relative left-0 top-0 z-10 
                bg-black/60 text-white px-5 text-4xl py-0 '>&gt;</button>

                </div>

            </div>
            

                
            </section>


                        {/*FOOTER */}

            <footer  className='grid grid-cols-1 md:grid-cols-3 border-t-white border-t-2 py-10 mt-50'>
                <div id='left'>
                   <div className='flex flex-col items-center md:items-start'>
                    <div className='flex items-center space-x-2'>
                        <img src={logo} alt="logo" className='w-10 h-10 rounded-full'/>
                        <h1 className='text-2xl text-orange-500 font-bold'>Eduverse</h1>
                    </div>
                    <div className='mt-6 ml-2 md:ml-8'>
                        <p className='mb-2 text-white'>Follow us</p>
                        <div className='flex space-x-4'>
                            <a href=""><FaFacebookF className='text-2xl text-white hover:text-blue-950 duration-300'/></a>
                            <a href=""><FaInstagram className='text-2xl text-white hover:text-pink-600 duration-300'/></a>
                            <a href=""><FaTwitter className='text-2xl text-white hover:text-blue-400 duration-300'/></a>
                        </div>
                    </div>
                   </div>
                </div>
                <div id='center' className='items-center flex flex-col'>
                    <h3 className='text-lg text-white  font-semibold mb-4 '>connects</h3>
                    <ul className='space-y-2 text-gray-400'>
                        <li className='hover:text-white hover:cursor-pointer duration-300'>youtube - learn coding</li>
                        <li className='hover:text-white hover:cursor-pointer duration-300'>telegram - learn coding</li>
                        <li className='hover:text-white hover:cursor-pointer duration-300'>Github - learn coding</li>
                    </ul>
                   
                </div>
                <div id='right' className='items-center flex flex-col'>
                    <h3 className='text-lg text-white  font-semibold mb-4'>copyrights &#139; 2026</h3>
                    <ul className='space-y-2 text-gray-400'>
                        <li className='hover:text-white hover:cursor-pointer duration-300'>Terms & conditions</li>
                        <li className='hover:text-white hover:cursor-pointer duration-300'>Privacy Policy</li>
                        <li className='hover:text-white hover:cursor-pointer duration-300'>Refund & Cancellation</li>
                    </ul>
                   
                </div>
            </footer>
        </div>
      
    </div>
  )
}

export default Home

