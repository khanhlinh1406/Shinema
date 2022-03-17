import React, { useState } from 'react';
import './mainNavBar.css'
import { Link } from 'react-router-dom'

import { AiOutlineUser } from 'react-icons/ai'
import { BsBell } from 'react-icons/bs'

import { VscHistory } from 'react-icons/vsc'
import { IoIosInformationCircleOutline } from 'react-icons/io'
import { IoIosLogOut } from 'react-icons/io'

import { CustomerMenu } from '../Menu/menu';
const defaultColor = '#fff'
const selectedColor = '#ff492094'

const MainNavBar = () => {

    const [logged, setLogged] = useState(true);
    const [accountToggle, setAccountToggle] = useState(false)

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

                {accountToggle && <CustomerMenu className="mainNavBar__menu" />}

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