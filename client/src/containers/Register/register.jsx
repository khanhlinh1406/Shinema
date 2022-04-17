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

import CircularProgress from '@mui/material/CircularProgress';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red, grey } from "@mui/material/colors";

import { useNavigate } from 'react-router-dom';

const Register = () => {
    let navigate = useNavigate();

    const [emailErrVisible, setEmailErrVisible] = useState(false)
    const [emailWarningVisible, setEmailWarningVisible] = useState(false)

    const [passwordErrVisible, setPasswordErrVisible] = useState(false)

    const [confirmPasswordErrVisible, setConfirmPasswordErrVisible] = useState(false)

    const [verifyCode, setVerifyCode] = useState('')

    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: false,
        confirmPassword: '',
        showConfirmPassword: false,
        confirmVerify: '',
        isLoading: false,
        correctVerify: true
    });


    const registerHandle = async () => {
        checkInfo()
            .then(res => {
                console.log(res)
                if (res) sendMail()
            })
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
                    }
                    else {
                        setEmailWarningVisible(true)
                    }
                })
                .catch(err => {
                    console.log(err)
                })


            return !emailWarningVisible
        }
        else {
            return false
        }

    }

    const sendMail = () => {
        setValues({
            ...values,
            isLoading: true
        })

        let verifyCode = mFunction.makeId(6);

        setVerifyCode(verifyCode);

        var mailOptions = {
            to: values.email,
            subject: 'Xác nhận tài khoản',
            text: 'Cảm ơn bạn đã sử dụng dịch vụ của Shinema, mã xác nhận của bạn là: ' + verifyCode
        };

        EmailApi.sendVerify(mailOptions)
            .then(res => {
                setValues({
                    ...values,
                    isLoading: false
                })
                handleClickOpenDialog()
            })
            .catch(err => {
                console.log(err)
            })
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
        setValues({
            ...values,
            correctVerify: true
        })

        setOpenDialog(true);
        clearTimer(getDeadTime());
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleResendMail = () => {
        sendMail()
    }

    const handleConfirmDialog = () => {
        if (verifyCode == values.confirmVerify) {
            setValues({ ...values, correctVerify: true })
            setOpenDialog(false);
            createAccount();
        }
        else {
            setValues({ ...values, correctVerify: false })
        }
    };

    const createAccount = () => {
        const account = {
            name: values.email,
            contact: '',
            identifyNumber: '',
            address: '',
            birthday: '',
            email: values.email,
            password: values.password,
            rank: 'Customer',
            score: 0,
            listTicketId: [],
            listReview: []
        }
        AccountApi.create(account)
            .then(res => {
                navigate('/login')
            })
            .catch(err => console.log(err))
    }

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
        setTimer('01:00');
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }

    const getDeadTime = () => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + 60);
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
                    {values.correctVerify ?
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Mã xác nhận"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={values.confirmVerify}
                            onChange={handleChange('confirmVerify')}
                        />
                        :
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Mã xác nhận"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={values.confirmVerify}
                            onChange={handleChange('confirmVerify')}
                            error
                        />}

                </DialogContent>

                <DialogActions>

                    <p>{timer}</p>

                    <Button onClick={handleCloseDialog}>Hủy</Button>
                    {timer == '00:00' ?
                        <Button onClick={handleResendMail}>Gửi lại</Button>
                        :
                        <Button disabled>Gửi lại</Button>
                    }

                    {timer == '00:00' ?
                        <Button disabled >Xác nhận</Button>
                        :
                        <Button onClick={handleConfirmDialog} >Xác nhận</Button>
                    }
                </DialogActions>
            </Dialog>

            {
                values.isLoading &&
                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', top: 0, left: 0, right: 0, bottom: 0 }} >
                    <CircularProgress />
                </div>
            }


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