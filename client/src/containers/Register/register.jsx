import React, { useState, useEffect, useRef } from "react";
import './register.css'

import background_login from '../../assets/background_login.jpg'
import logo_png from '../../assets/logo_png.png'

import { BiError } from 'react-icons/bi'

import AccountApi from "../../api/accountApi";
import EmailApi from '../../api/emailApi'
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

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red, grey } from "@mui/material/colors";

const Register = () => {

    const [emailErrVisible, setEmailErrVisible] = useState(false)
    const [emailWarningVisible, setEmailWarningVisible] = useState(false)

    const [passwordErrVisible, setPasswordErrVisible] = useState(false)

    const [confirmPasswordErrVisible, setConfirmPasswordErrVisible] = useState(false)

    const registerHandle = async () => {
        if (checkInfo()) {
            sendMail();
            handleClickOpenDialog()
        }
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
                        setEmailWarningVisible(false)
                        return true
                    }
                    else {
                        setEmailWarningVisible(true)
                        return false
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    const sendMail = () => {
        var mailOptions = {
            to: values.email,
            subject: 'Xác nhận tài khoản',
            text: 'Cảm ơn bạn đã sử dụng dịch vụ của Shinema, mã xác nhận của bạn là: ' + mFunction.makeId(6)
        };

        EmailApi.sendVerify(mailOptions)
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
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
        verify: ''
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

    const [openDialog, setOpenDialog] = useState(false)
    const handleClickOpenDialog = () => {
        setOpenDialog(true);
        clearTimer(getDeadTime());
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    //--------------------countdown--------------------//
    const Ref = useRef(null);
    const [timer, setTimer] = useState('00:00');

    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 * 60 * 60) % 24);
        return {
            total, hours, minutes, seconds
        };
    }

    const startTimer = (e) => {
        let { total, hours, minutes, seconds }
            = getTimeRemaining(e);
        if (total >= 0) {
            setTimer(
                // (hours > 9 ? hours : '0' + hours) + ':' +
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        }
    }

    const clearTimer = (e) => {
        setTimer('00:10');
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }

    const getDeadTime = () => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + 10);
        return deadline;
    }

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

            {/* -----------------------dialog custom--------------------- */}

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle sx={{ color: '#040C18' }}>Xác nhận email</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Shinema vừa gửi mã xác nhận đến email của bạn. Vui lòng kiểm tra và điền mã xác nhận bên dưới.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Mã xác nhận"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>

                <DialogActions>
                    <p>{timer}</p>

                    <Button onClick={handleCloseDialog}>Hủy</Button>
                    {timer == '00:00' ?
                        <Button onClick={handleCloseDialog}>Gửi lại</Button>
                        :
                        <Button onClick={handleCloseDialog} disabled>Gửi lại</Button>
                    }

                    {timer == '00:00' ?
                        <Button onClick={handleCloseDialog} disabled >Xác nhận</Button>
                        :
                        <Button onClick={handleCloseDialog} >Xác nhận</Button>
                    }
                </DialogActions>
            </Dialog>


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