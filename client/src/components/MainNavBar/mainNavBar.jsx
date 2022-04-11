import React, { useState, useEffect } from 'react';
import './mainNavBar.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

import { decode } from 'base-64'
import { encode } from 'base-64'

import { AiOutlineUser, AiOutlineMenu } from 'react-icons/ai'
import { BsBell } from 'react-icons/bs'

import { GiFilmStrip } from 'react-icons/gi'
import { CustomerMenu } from '../Menu/menu';

import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red, grey } from "@mui/material/colors";

import AccountApi from './../../api/accountApi';
import { useSelector, useDispatch } from 'react-redux';
import { userSlice } from './../../redux/slices/userSlice';

const defaultColor = '#fff'
const selectedColor = '#ff492094'


const MainNavBar = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch()

    const [logged, setLogged] = useState(false);
    const [accountToggle, setAccountToggle] = useState(false)

    const [menuToggle, setMenuToggle] = useState(false)

    const user = useSelector(state => state.users.instance)

    const accountToggleHandle = () => {
        setAccountToggle(!accountToggle)
    }
    const checkLogged = () => {
        let logged = localStorage.getItem('logged')
        let remember = localStorage.getItem('rememberAccount')

        setLogged(logged)

        if (remember == 'true' && logged && user == '') {
            let email = decode(localStorage.getItem(encode("rememberEmail")))
            let password = decode(localStorage.getItem(encode("rememberPassword")))

            AccountApi.login(email, password)
                .then(res => {
                    if (res != "Email not exist" && res != "Password incorrect") {
                        AccountApi.getByEmail(email).then(res => {
                            dispatch(userSlice.actions.update(res.data))
                        }).catch(err => console.log(err))
                    }
                })
                .catch(err => console.log(err))
        }
    }

    useEffect((checkLogged), [])

    return (

        <div className='mainNavBar'>
            <div>
                <div className='mainNavBar-links'>
                    <p>GÓC ĐIỆN ẢNH</p>

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
                {accountToggle && <CustomerMenu accountToggleHandle={accountToggleHandle} />}

            </div>
        </div>
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
            <p ><Link to="/login">ĐĂNG NHẬP</Link></p>

            <ThemeProvider theme={btnTheme} >
                <Button sx={{ paddingX: 5, paddingY: 0.8 }} variant="contained" onClick={() => navigate('/register')}>Đăng ký</Button>
            </ThemeProvider>
            {/* <button className='mainNavBar__login__btn mainNavBar__login__btn--register'><p ><Link to="/register">Đăng ký</Link></p></button> */}
        </div >
    )
}

export default MainNavBar;