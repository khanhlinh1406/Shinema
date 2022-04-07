import React, { useState } from "react";
import './login.css'

import background_login from '../../assets/background_login.jpg'
import logo_png from '../../assets/logo_png.png'

import { AiOutlineGoogle } from 'react-icons/ai'
import { FaFacebookF } from 'react-icons/fa'
import { BiError } from 'react-icons/bi'

import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlined from '@mui/icons-material/VisibilityOffOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red, grey } from "@mui/material/colors";

import { useNavigate } from 'react-router-dom';

import AccountApi from "../../api/accountApi";
import mFunction from "../../function";

const Login = () => {
    const txtFieldThem = createTheme({
        shape: {
            borderRadius: 20
        },
        palette: {
            primary: grey
        },
        text: grey
    })

    const btnTheme = createTheme({
        shape: {
            borderRadius: 20
        },
        palette: {
            primary: red
        },
    })

    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: false,
        isLoading: false,
    });

    const [emailErrVisible, setEmailErrVisible] = useState(false)
    const [emailWarningVisible, setEmailWarningVisible] = useState(false)
    const [passwordErrVisible, setPasswordErrVisible] = useState(false)

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const loginHandle = async () => {
        await AccountApi.login('trithuc23232@gmail.com', '123456').then(
            res => console.log(res)
        )
    }

    const checkInfo = async () => {

        let errEmail = false;
        let errPassword = false;

        if (!mFunction.validateEmail(values.email)) {
            setEmailErrVisible(true)
            errEmail = true
        }
        else {
            setEmailErrVisible(false)
            errEmail = false
        }

        if (!mFunction.validatePassword(values.password)) {
            setPasswordErrVisible(true)
            errPassword = true
        }
        else {
            setPasswordErrVisible(false)
            errPassword = false
        }

        if (!errEmail && !errPassword) {
            await AccountApi.login(values.email, values.password)
                .then(res => {
                    if (res != 'Email already exists') {
                        setEmailWarningVisible(false)
                    }
                    else {
                        setEmailWarningVisible(true)
                    }
                })
                .catch(err => {
                    console.log(err)
                })


            return emailWarningVisible
        }
        else {
            return false
        }

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

                <ThemeProvider theme={txtFieldThem}>
                    <TextField
                        id="filled-basic"
                        label="Email"
                        variant="filled"
                        color="primary"
                        text='primary'
                        sx={{
                            marginTop: 1,
                            backgroundColor: 'rgb(9, 24, 48)',
                            borderRadius: 0.2,
                            input: { color: 'white', marginLeft: 1, marginX: 0.4 },
                            label: { color: 'rgb(153, 153, 153)', marginLeft: 1, marginX: 0.4 }
                        }}
                        value={values.email}
                        onChange={handleChange('email')} />
                </ThemeProvider>

                {emailErrVisible && <Message message="Email không hợp lệ" type="err" />}
                {emailWarningVisible && <Message message="Email chưa được đăng kí" type="warning" />}


                <ThemeProvider theme={txtFieldThem}>
                    <FormControl
                        sx={{
                            marginY: 2,
                            backgroundColor: 'rgb(9, 24, 48)',
                            borderRadius: 0.5,
                        }}
                        variant="filled">
                        <InputLabel sx={{ color: 'rgb(153, 153, 153)', marginLeft: 1 }} htmlFor="filled-adornment-password">Mật khẩu</InputLabel>
                        <FilledInput
                            //id="filled-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            sx={{ color: '#fff', marginLeft: 1, fontSize: 15 }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        sx={{ color: "rgb(153, 153, 153)", marginRight: 0.3 }}

                                    >
                                        {values.showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </ThemeProvider>

                {passwordErrVisible && <Message message="Mật khẩu không chính xác" type="err" />}

                <div className="login__form__remember__container">
                    <a>Quên  mật khẩu?</a>

                    <div className="login__form__remember">
                        <p>Ghi nhớ</p>
                        <input type='checkbox' />
                    </div>
                </div>

                <ThemeProvider theme={btnTheme} >
                    <Button sx={{ padding: 1, marginTop: 3 }} variant="contained" onClick={loginHandle}>Đăng nhập</Button>
                </ThemeProvider>

                <hr style={{ marginBottom: 60, marginTop: 20 }} />

                <div className="login__form__socialMedia" >
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