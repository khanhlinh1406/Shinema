import React, { useState } from 'react';
import './navBar.css'
import { AiOutlineMenu } from "react-icons/ai";
import { AiFillCloseCircle } from 'react-icons/ai'

import logo_png from '../../assets/logo_png.png'

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false)

    return (
        <div className='navbar'>
            <div className='navbar-links'>
                <img src={logo_png} alt='logo_png' />

                <p><a href='#popular'>Phổ biến</a></p>
                <p><a href='#upcoming'>Sắp chiếu</a></p>
                <p><a href='#topRate'>Bảng xếp hạng</a></p>
            </div>

            <div className='navbar-menu'>
                {toggleMenu ?
                    <AiFillCloseCircle color="fff" size={27} onClick={() => setToggleMenu(false)} />
                    : <AiOutlineMenu color="fff" size={27} onClick={() => setToggleMenu(true)} />
                }

                {toggleMenu && (
                    <div className="navbar-menu_container scale-up-center">
                        <div className="navbar-menu_container-links">
                            <p><a href='#nowPlaying'>Khởi chiếu</a></p>
                            <p><a href='#popular'>Phổ biến</a></p>
                            <p><a href='#upcoming'>Sắp chiếu</a></p>
                            <p><a href='#topRate'>Bảng xếp hạng</a></p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar;