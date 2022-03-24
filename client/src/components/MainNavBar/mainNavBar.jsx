import React, { useState } from 'react';
import './mainNavBar.css'
import { Link } from 'react-router-dom'

import { AiOutlineUser } from 'react-icons/ai'
import { BsBell } from 'react-icons/bs'

import { VscHistory } from 'react-icons/vsc'
import { IoIosInformationCircleOutline } from 'react-icons/io'
import { IoIosLogOut } from 'react-icons/io'

import { AiOutlineMenu } from "react-icons/ai";
import { AiFillCloseCircle } from 'react-icons/ai'
import { GiFilmStrip } from 'react-icons/gi'

import { CustomerMenu } from '../Menu/menu';
const defaultColor = '#fff'
const selectedColor = '#ff492094'

const MainNavBar = () => {

    const [logged, setLogged] = useState(false);
    const [accountToggle, setAccountToggle] = useState(false)

    const [menuToggle, setMenuToggle] = useState(false)

    return (

        <div className='mainNavBar'>
            <div>
                <div className='mainNavBar-links'>
                    <p>Góc điện ảnh</p>

                    {logged &&
                        <div>
                            <BsBell className='mainNavBar__icon' color='#fff' size={27} />
                            {!accountToggle && <AiOutlineUser className='mainNavBar__icon' color='#fff' size={27} onClick={() => setAccountToggle(true)} />}
                            {accountToggle && <AiOutlineUser className='mainNavBar__icon' color='#ff492094' size={27} onClick={() => setAccountToggle(false)} />}

                        </div>
                    }

                    {!logged && <NotSignInMenu />}

                </div>

                <div className='mainNavbar-menu'>
                    {menuToggle ?
                        <AiOutlineMenu color="#ff492094" size={27} onClick={() => setMenuToggle(false)} />
                        : <AiOutlineMenu color="#fff" size={27} onClick={() => setMenuToggle(true)} />
                    }

                    {menuToggle && (
                        <div className="mainNavbar-menu__container">
                            <div className='mainNavbar-menu__item'>
                                <p> <Link to="/userInfor">Thông tin cá nhân</Link></p>
                                <AiOutlineUser className='menu__item__icon' color={defaultColor} size={25} />
                            </div>

                            <div className='mainNavbar-menu__item'>
                                <p> <Link to="/userInfor">Thông báo</Link></p>
                                <BsBell className='menu__item__icon' color={defaultColor} size={23} />
                            </div>

                            <div className='mainNavbar-menu__item'>
                                <p> <Link to="/userInfor">Góc điện ảnh</Link></p>
                                <GiFilmStrip className='menu__item__icon' color={defaultColor} size={23} />
                            </div>
                        </div>
                    )}
                </div>
                {accountToggle && <CustomerMenu />}

            </div>
        </div>
    )

}

export const NotSignInMenu = () => {
    return (
        <div className='mainNavBar__login'>
            <p ><Link to="/login">Đăng nhập</Link></p>
            <button className='mainNavBar__login__btn mainNavBar__login__btn--register'>Đăng ký</button>
        </div>
    )
}

export default MainNavBar;