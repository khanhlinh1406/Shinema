import React, { useState } from "react";
import './login.css'

import background_login from '../../assets/background_login.jpg'
import logo_png from '../../assets/logo_png.png'

import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineGoogle } from 'react-icons/ai'
import { MdOutlineEmail } from 'react-icons/md'
import { FaFacebookF } from 'react-icons/fa'
import { BiError } from 'react-icons/bi'

import AccountApi from "../../api/accountApi";

const Login = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [passwordVisible, setPasswordVisible] = useState(false)

    const [emailErrVisible, setEmailErrVisible] = useState(false)
    const [emailWarningVisible, setEmailWarningVisible] = useState(false)
    const [passwordErr, setPasswordErr] = useState(false)

    const loginHandle = async () => {
        console.log('dang nhap')
        await AccountApi.login('trithuc', '123456').then(
            res => console.log(res)
        )

    }

    const getAccounts = async () => {
        console.log('get accounts')
        await AccountApi.getAll().then(
            res => console.log(res)
        )
    }

    return (
        <div className="login">
            <div className="login__background">
                <img className="login__background__img" src={background_login} alt="background" />
                <div className="login__color__gradient"></div>
            </div>

            <div className="login__form__container">
                <div className="login__form__title">
                    <img style={{ width: 40 }} src={logo_png} alt="logo_png" />
                    <h2>ĐĂNG NHẬP</h2>
                </div>

                <div className="login__form__ip__container">
                    <input className="login__form__ip" type="email" placeholder="Email" />
                    <MdOutlineEmail size={25} color="#9C9C9C" />
                </div>

                {emailErrVisible && <Message message="Email không hợp lệ" type="err" />}
                {emailWarningVisible && <Message message="Email chưa được đăng kí" type="warning" />}

                <div className="login__form__ip__container">
                    <input className="login__form__ip" type={passwordVisible ? "text" : "password"} placeholder="Mật khẩu" />
                    {passwordVisible ?
                        <AiOutlineEye size={25} color="#9C9C9C" cursor='pointer' onClick={() => { setPasswordVisible(false) }} />
                        :
                        <AiOutlineEyeInvisible size={25} color="#9C9C9C" cursor='pointer' onClick={() => { setPasswordVisible(true) }} />
                    }
                </div>

                {passwordErr && <Message message="Mật khẩu không chính xác" type="err" />}

                <div className="login__form__remember__container">
                    <a>Quên  mật khẩu?</a>

                    <div className="login__form__remember">
                        <p>Ghi nhớ</p>
                        <input type='checkbox' />
                    </div>
                </div>

                <button className="login__form__btn login__form__btn--login" onClick={loginHandle}>Đăng nhập</button>

                <hr style={{ marginBottom: 60 }} />

                <div className="login__form__socialMedia" onClick={getAccounts}>
                    <AiOutlineGoogle size={23} />
                    <p>Đăng nhập với Google</p>
                </div>

                <div className="login__form__socialMedia">
                    <FaFacebookF size={21} />
                    <p>Đăng nhập với Facebook</p>
                </div>

                <div className="login__form__register">
                    <p>Bạn chưa có tài khoản? </p>
                    <a>Đăng ký</a>
                </div>

            </div>
        </div>
    )
}
const Message = props => {
    const mess = props.message;
    const type = props.type

    return (
        <div className="login__form__message" style={{ color: type == 'err' ? 'rgb(192, 7, 7)' : '#e9be00' }}>
            <BiError size={15} />
            <p>{mess}</p>
        </div >
    )

}

export default Login