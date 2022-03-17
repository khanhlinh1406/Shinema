import React from "react";
import './menu.css'
import { Link } from 'react-router-dom'

import { RiStackLine } from 'react-icons/ri'
import { VscHistory } from 'react-icons/vsc'
import { IoIosInformationCircleOutline } from 'react-icons/io'
import { IoIosLogOut } from 'react-icons/io'

const defaultColor = '#fff'

export const CustomerMenu = () => {
    return (
        <div className='menu' >
            <div className='menu__item'>
                <p> <Link to="/userInfor">Thông tin cá nhân</Link></p>
                <IoIosInformationCircleOutline className='menu__item__icon' color={defaultColor} size={25} />
            </div>

            <div className='menu__item'>
                <p> <Link to="/manager">Lịch sử giao dịch</Link></p>
                <VscHistory className='menu__item__icon' color={defaultColor} size={23} />
            </div>

            <div className="menu__line" />

            <div className='menu__item'>
                <p> <Link to="/userInfor">Đăng xuất</Link></p>
                <IoIosLogOut className='menu__item__icon' color={defaultColor} size={23} />
            </div>

        </div>
    )
}
