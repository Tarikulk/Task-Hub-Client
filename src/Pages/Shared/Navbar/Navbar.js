import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';
import {FaMoon, FaSun} from "react-icons/fa"
import "./Navbar.css";

const Navbar = () => {


    const [theme, setTheme] = useState("light")
    useEffect(() =>{
      if(theme === "dark"){
        document.documentElement.classList.add("dark")
      }
      else{
        document.documentElement.classList.remove("dark")
      }
    }, [theme])

    const handleThemeSwitch = () =>{
        setTheme(theme === "dark" ? "light" : "dark")
    }

    const {user, userSignOut} = useContext(AuthContext);
    const navigate = useNavigate()

    const handleSignOut = () =>{
        userSignOut()
        .then(() =>{
            navigate("/signIn")
        })
        .catch(error =>{
            console.log(error)
        })
    }

    return ( 
           <header className="lg:px-16 px-8 bg-sky-500 dark:bg-gray-900 shadow-md py-4 md:py-0">
        <div className="container mx-auto flex flex-wrap items-center">
            <div className="flex-1 flex justify-between items-center">
                <Link to="/" className="text-xl font-semibold text-green-100 hover:text-white tracking-normal">Tasks Hub</Link>
            </div>

            <label htmlFor="menu-toggle" className="pointer-cursor md:hidden block">
                <svg className="fill-current text-gray-300 hover:text-white" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                    viewBox="0 0 20 20">
                    <title>menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                </svg>
            </label>
            <input className="hidden" type="checkbox" id="menu-toggle" />

            <div className="hidden md:flex md:items-center md:w-auto w-full" id="menu">
                <nav>
                    <ul className="md:flex items-center justify-between text-base pt-4 md:pt-0">
                        <li>
                           <span onClick={handleThemeSwitch} className="mr-5 w-10 h-10 rounded-full shadow-lg bg-cyan-400 cursor-pointer flex justify-center items-center" >
                           {
                                theme === "light" ? 
                                <FaMoon className='text-white ms-5 fs-4'></FaMoon> 
                                :
                                <FaSun className='text-white ms-5 fs-4'></FaSun>
                            }
                           </span>
                        </li>
                        <li><Link to="/" className="md:px-4 py-2 md:py-4 px-0 block text-green-100 hover:text-white md:hover:bg-sky-300">Add Tasks</Link></li>
                        <li><Link to="/myTask" className="md:px-4 py-2 md:py-4 px-0 block text-green-100 hover:text-white md:hover:bg-sky-300">My Tasks</Link></li>
                        <li><Link to="/completedTask" className="md:px-4 py-2 md:py-4 px-0 block text-green-100 hover:text-white md:hover:bg-sky-300">Completed Tasks</Link></li>
                        {   user?.uid ?
                            <li><Link onClick={handleSignOut} className="md:px-4 py-2 md:py-4 px-0 block text-green-100 hover:text-white md:hover:bg-sky-300">Sign Out</Link></li>
                            :
                            <li><Link to="/signIn" className="md:px-4 py-2 md:py-4 px-0 block text-green-100 hover:text-white md:hover:bg-sky-300">Sing In</Link></li>
                        }
                          
                    </ul>
                </nav>
            </div>
        </div>
    </header>
    );
};

export default Navbar;