import React, { useState } from 'react';
import './mainNavBar.css'
import { Link } from 'react-router-dom'

import { AiOutlineUser } from 'react-icons/ai'
import { BsBell } from 'react-icons/bs'

import { CustomerMenu } from '../Menu/menu';

const MainNavBar = () => {

    return (

        <div className='mainNavBar'>
            <div>
                <div className='mainNavBar-links'>
                    <p>Góc điện ảnh</p>

                    {/* <BsBell className='mainNavBar__icon' color='#fff' size={27} />
                    <AiOutlineUser className='mainNavBar__icon' color='#fff' size={27} /> */}

                    <NotSignInMenu />
                </div>
                {/* <CustomerMenu /> */}
            </div>
        </div>
    )

}

export const NotSignInMenu = () => {
    return (
        <div className='mainNavBar__login'>
            <p >Đăng nhập</p>
            <button className='mainNavBar__login__btn mainNavBar__login__btn--register'>Đăng ký</button>
        </div>
    )
}

export default MainNavBar;