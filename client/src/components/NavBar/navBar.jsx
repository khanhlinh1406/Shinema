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

                <p><a href='#popular'>Phổ biến</a></p>
                <p><a href='#upcoming'>Sắp chiếu</a></p>
                <p><a href='#top_rated'>Bảng xếp hạng</a></p>
            </div>

        </div>
    )
}

export default Navbar;