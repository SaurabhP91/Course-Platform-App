import { useState,useEffect,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Home from './components/Home/Home'
import Signup from './pages/Signup/Signup'
import Login from './components/Login/login'
import Courses from './components/Courses/Courses';
import Buy from './components/Buy/Buy'
import Purchases from './components/Purchases/Purchases'
//TAILWINDCSS + REACT + REDUX

function App() {
  const [count, setCount] = useState(0);
  
  const handleCounter = () => {
    setCount(count+1);
  }
  return (
    <>
      {/* <div>APP</div>
      <span>Counter</span>
      <button id='countbtn' onClick={handleCounter}>Count : {count}</button> */}

      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>

          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>} />

          <Route path='/courses' element={<Courses/>} />
          <Route path='/buy/:courseId' element={<Buy/>} />
          <Route path='/purchases' element={<Purchases/>} />
          
        </Routes>
      </Router>
    </>
  )
}

export default App;
