import React, { useState, useEffect } from 'react';
import './mainNavBar.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

import { AiOutlineUser, AiOutlineMenu } from 'react-icons/ai'
import { BsBell } from 'react-icons/bs'

import { GiFilmStrip } from 'react-icons/gi'
import { CustomerMenu } from '../Menu/menu';

import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red } from "@mui/material/colors";

const defaultColor = '#fff'
const selectedColor = '#ff492094'


const MainNavBar = () => {
    let navigate = useNavigate();

    let logged = localStorage.getItem('logged')
    const [accountToggle, setAccountToggle] = useState(false)

    const [menuToggle, setMenuToggle] = useState(false)

    const accountToggleHandle = () => {
        setAccountToggle(!accountToggle)
    }


    const goToCorner = () => {
        navigate(`/corner/movie/popular`);
    }

    return (

        <div className='mainNavBar'>
            <div>
                <div className='mainNavBar-links'>
                    <p onClick={goToCorner}>FILMDOM</p>

                    {logged == 'true' ?
                        <div>
                            <BsBell className='mainNavBar__icon' color='#fff' size={27} />
                            {!accountToggle && <AiOutlineUser className='mainNavBar__icon' color='#fff' size={27} onClick={() => setAccountToggle(true)} />}
                            {accountToggle && <AiOutlineUser className='mainNavBar__icon' color='#ff492094' size={27} onClick={() => setAccountToggle(false)} />}

                        </div>
                        :
                        <NotSignInMenu />
                    }

                </div>

                <div className='mainNavbar-menu'>
                    {menuToggle ?
                        <AiOutlineMenu color="#ff492094" size={27} onClick={() => setMenuToggle(false)} />
                        : <AiOutlineMenu color="#fff" size={27} onClick={() => setMenuToggle(true)} />
                    }

                    {menuToggle && (
                        <div className="mainNavbar-menu__container">
                            <div className='mainNavbar-menu__item'>
                                <p> <Link to="/profile">Profile</Link></p>
                                <AiOutlineUser className='menu__item__icon' color={defaultColor} size={25} />
                            </div>

                            <div className='mainNavbar-menu__item'>
                                <p> <Link to="/userInfor">Notification</Link></p>
                                <BsBell className='menu__item__icon' color={defaultColor} size={23} />
                            </div >

                            <div className='mainNavbar-menu__item'>
                                <p> <Link to="/corner/movie/popular">FILMDOM</Link></p>
                                <GiFilmStrip className='menu__item__icon' color={defaultColor} size={23} />
                            </div >
                        </div >
                    )}
                </div >
                {accountToggle && <CustomerMenu accountToggleHandle={accountToggleHandle} />}

            </div >
        </div >
    )
}

export const NotSignInMenu = () => {
    const btnTheme = createTheme({
        shape: {
            borderRadius: 20
        },
        palette: {
            primary: red
        },
    })

    let navigate = useNavigate();

    return (
        <div className='mainNavBar__login'>
            <p ><Link to="/login">LOGIN</Link></p>

            <ThemeProvider theme={btnTheme} >
                <Button sx={{ paddingX: 5, paddingY: 0.8 }} variant="contained" onClick={() => navigate('/register')}>REGISTER</Button>
            </ThemeProvider>
            {/* <button className='mainNavBar__login__btn mainNavBar__login__btn--register'><p ><Link to="/register">????ng k??</Link></p></button> */}
        </div >
    )
}

export default MainNavBar;