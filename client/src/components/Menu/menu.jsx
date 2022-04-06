import React from "react";
import './menu.css'
import { Link } from 'react-router-dom'

import { AiOutlineUser } from 'react-icons/ai'
import { VscHistory } from 'react-icons/vsc'
import { IoIosInformationCircleOutline, IoIosLogOut } from 'react-icons/io'
import { BiCommentDetail } from 'react-icons/bi'
import { BsHddStack } from 'react-icons/bs'

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userSlice } from './../../redux/slices/userSlice';

const defaultColor = '#fff'

export const CustomerMenu = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch()
    const user = useSelector(state => state.users.instance)
    console.log(user)
    const logoutHandle = () => {
        localStorage.setItem('logged', false)
        dispatch(userSlice.actions.update(''))
        navigate('./login')
    }
    return (
        <div className='menu' >
            <div className='menu__item'>
                <p> <Link to="/userInfor">Thông tin cá nhân</Link></p>
                <AiOutlineUser className='menu__item__icon' color={defaultColor} size={25} />
            </div>

            {
                user.rank == "Customer"
                &&
                <div className='menu__item'>
                    <p> <Link to="/manager">Bình luận phim</Link></p>
                    <BiCommentDetail className='menu__item__icon' color={defaultColor} size={25} />
                </div>
            }

            {
                user.rank == "Customer"
                &&
                <div className='menu__item'>
                    <p> <Link to="/manager">Lịch sử giao dịch</Link></p>
                    <VscHistory className='menu__item__icon' color={defaultColor} size={23} />
                </div>
            }

            {
                (user.rank == "Manager" || user.rank == "Admin")
                &&
                <div className='menu__item'>
                    <p> <Link to="/manager">Quản lí dữ liệu</Link></p>
                    <BsHddStack className='menu__item__icon' color={defaultColor} size={23} />
                </div>
            }

            {
                user.rank == "Censor"
                &&
                <div className='menu__item'>
                    <p> <Link to="/manager">Kiểm duyệt</Link></p>
                    <IoIosInformationCircleOutline className='menu__item__icon' color={defaultColor} size={25} />
                </div>
            }


            <div className="menu__line" />

            <div className='menu__item'>
                <p onClick={logoutHandle}>Đăng xuất</p>
                <IoIosLogOut className='menu__item__icon' color={defaultColor} size={23} />
            </div>

        </div>
    )
}
