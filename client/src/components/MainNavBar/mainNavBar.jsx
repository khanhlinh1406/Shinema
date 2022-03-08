import React, { useState } from 'react';
import './mainNavBar.css'
import { Link } from 'react-router-dom'

const MainNavBar = () => {

    return (
        <div className='mainNavBar'>
            <div className='mainNavBar-links'>
                <p> <Link to="/">Trang chủ</Link></p>
                <p> <Link to="/moives">Phim</Link></p>
                <p> <Link to="/actors">Diễn viên</Link></p>
            </div>
        </div>
    )
}

export default MainNavBar;