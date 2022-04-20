import React, { useState } from 'react';
import './navBar.css'
import { AiOutlineMenu } from "react-icons/ai";
import { AiFillCloseCircle } from 'react-icons/ai'

import logo_png from '../../assets/logo_png.png'

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className='navbar-links'>
                <img src={logo_png} alt='logo_png' />

                <p><a href='#popular'>Popular</a></p>
                <p><a href='#upcoming'>Upcoming</a></p>
                <p><a href='#top_rated'>Top-rated</a></p>
            </div>

        </div>
    )
}

export default Navbar;