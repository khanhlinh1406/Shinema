import React, { StrictMode, useState } from "react";
import './register.css'

import background_login from '../../assets/background_login.jpg'
import logo_png from '../../assets/logo_png.png'

import { BiError } from 'react-icons/bi'

import AccountApi from "../../api/accountApi";
import mFunction from "../../function";

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

const Register = () => {

    const [emailErrVisible, setEmailErrVisible] = useState(false)
    const [emailWarningVisible, setEmailWarningVisible] = useState(false)

    const [passwordErrVisible, setPasswordErrVisible] = useState(false)

    const [confirmPasswordErrVisible, setConfirmPasswordErrVisible] = useState(false)

    const registerHandle = async () => {
        checkInfo()
    }

    const checkInfo = async () => {

        let errEmail = false;
        let errPassword = false;
        let errConfirmPassword = false;

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

        if (values.password != values.confirmPassword) {
            setConfirmPasswordErrVisible(true)
            errConfirmPassword = true;
        }
        else {
            setConfirmPasswordErrVisible(false)
            errConfirmPassword = false
        }

        if (!errEmail && !errPassword && !errConfirmPassword) {
            await AccountApi.checkEmail(values.email)
                .then(res => {
                    console.log(res)
                    if (res != 'Email already exists') {
                        //send email
                        setEmailWarningVisible(false)
                    }
                    else {
                        setEmailWarningVisible(true)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    const btnTheme = createTheme({
        shape: {
            borderRadius: 20
        },
        palette: {
            primary: red
        },
    })

    const txtFieldThem = createTheme({
        shape: {
            borderRadius: 20
        },
        palette: {
            primary: grey
        },
        text: grey
    })

    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: false,
        confirmPassword: '',
        showConfirmPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleClickShowConfirmPassword = () => {
        setValues({
            ...values,
            showConfirmPassword: !values.showConfirmPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div className="register">
            <div className="register__background">
                <img className="register__background__img" src={background_login} alt="background" />
                <div className="register__color__gradient"></div>
            </div>

            <div className="register__form__container">
                <div className="register__form__title">
                    <img style={{ width: 40 }} src={logo_png} alt="logo_png" />
                    <h2>ĐĂNG KÝ</h2>
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
                            borderRadius: 0.5,
                            input: { color: 'white', marginLeft: 1, marginX: 0.4 },
                            label: { color: 'rgb(153, 153, 153)', marginLeft: 1, marginX: 0.4 }
                        }}
                        value={values.email}
                        onChange={handleChange('email')} />
                </ThemeProvider>

                {emailErrVisible && <Message message="Email không hợp lệ" type="err" />}
                {emailWarningVisible && <Message message="Email đã được sử dụng" type="warning" />}

                <ThemeProvider theme={txtFieldThem}>
                    <FormControl
                        sx={{
                            marginTop: 2,
                            backgroundColor: 'rgb(9, 24, 48)',
                            borderRadius: 0.5,
                        }}
                        variant="filled">
                        <InputLabel sx={{ color: 'rgb(153, 153, 153)', marginLeft: 1 }} htmlFor="filled-adornment-password">Mật khẩu</InputLabel>
                        <FilledInput
                            id="filled-adornment-password"
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

                {passwordErrVisible && <Message message="Mật khẩu ít nhất có 6 kí tự" type="err" />}

                <ThemeProvider theme={txtFieldThem}>
                    <FormControl
                        sx={{
                            marginTop: 2,
                            backgroundColor: 'rgb(9, 24, 48)',
                            borderRadius: 0.5,
                        }}
                        variant="filled">
                        <InputLabel sx={{ color: 'rgb(153, 153, 153)', marginLeft: 1 }} htmlFor="filled-adornment-password">Xác nhận mật khẩu</InputLabel>
                        <FilledInput
                            id="filled-adornment-password"
                            type={values.showConfirmPassword ? 'text' : 'password'}
                            value={values.confirmPassword}
                            onChange={handleChange('confirmPassword')}
                            sx={{ color: '#fff', marginLeft: 1, fontSize: 15 }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowConfirmPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        sx={{ color: "rgb(153, 153, 153)", marginRight: 0.3 }}

                                    >
                                        {values.showConfirmPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </ThemeProvider>


                {confirmPasswordErrVisible && <Message message="Xác nhận mật khẩu không trùng khớp" type="err" />}

                <ThemeProvider theme={btnTheme} >
                    <Button sx={{ padding: 1, marginTop: 3 }} variant="contained" onClick={registerHandle}>Đăng ký</Button>
                </ThemeProvider>


                <div className="register__form__register">
                    <p>Bạn đã có tài khoản? </p>
                    <a>Đăng nhập</a>
                </div>

            </div>

            <DialogCustom />
        </div>
    )
}
const DialogCustom = () => {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="register__dialog__container">

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

export default Register