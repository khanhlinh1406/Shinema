
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { Button, Typography, Link, Breadcrumbs, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Avatar } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import DiamondIcon from '@mui/icons-material/Diamond';
import Radio from '@mui/material/Radio';
import { Slide } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { userSelector } from '../../../redux/selector'
import mFunction from '../../../function'
import { bookingSelector } from '../../../redux/selector';
import apiConfig from "../../../api/apiConfig";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red } from '@mui/material/colors'
import PayPal from '../Paypal/paypal'
import format from 'date-fns/format'
import TicketApi from './../../../api/ticketApi';
import Loading from '../../Loading/loading'
import { Success, Error } from '../../Alert/alert'

const BuyerInformation = ({ movieInfo }) => {
    const currentUser = useSelector(userSelector);
    const dispatch = useDispatch();
    const CURRENT_BOOKING = useSelector(bookingSelector)
    const [isLoading, setIsLoading] = useState(false)

    const [values, setValues] = useState({
        name: currentUser.name,
        contact: currentUser.contact,
        address: '',
        email: currentUser.email,
    })

    const [validName, setValidName] = useState({
        check: true,
        alert: ''
    })

    const [validEmail, setValidEmail] = useState({
        check: true,
        alert: ''
    })

    const [validContact, setValidContact] = useState({
        check: true,
        alert: ''
    })

    const [validAdress, setValidAdress] = useState({
        check: true,
        alert: ''
    })

    const resetValidation = () => {
        setValidName({
            check: true
        })
        setValidEmail({
            check: true
        })
        setValidContact({
            check: true
        })
        setValidAdress({
            check: true
        })
    }


    const [errorNotification, setErrorNotification] = useState({
        status: false,
        message: '',
        display: false
    })


    const handleChangeInformation = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        setUpdateSucceeded({
            status: false,
            message: '',
            display: false,
        })
    };

    const [addressShip, setAddressShip] = useState('')

    const [province, setProvince] = useState({})
    const [provinceList, setProvinceList] = useState([])

    const [district, setDistrict] = useState({})
    const [districtList, setDistrictList] = useState([])

    const [commune, setCommune] = useState({})
    const [communeList, setCommuneList] = useState([])

    const [bigAddress, setBigAddress] = useState('')

    const [house, setHouse] = useState('')
    //get province
    useEffect(() => {
        const getProvinceList = async () => {
            //const resProvince = 
            await fetch('https://sheltered-anchorage-60344.herokuapp.com/province')
                .then(res => res.json()).then((data) => setProvinceList(data))

            // setProvinceList(await resProv)

            //console.log(resProv)
        }
        getProvinceList()
    }, [])

    function handleChangeProvince(event) {
        setProvince(event.target.value)
        setUpdateSucceeded({
            status: false,
            message: '',
            display: false,
        })
    }
    //get district
    useEffect(() => {
        const getDistrict = async () => {
            await fetch(`https://sheltered-anchorage-60344.herokuapp.com/district/?idProvince=${province.idProvince}`)
                .then(res => res.json())
                .then((data) => setDistrictList(data))
        }
        getDistrict()
    }, [province])

    function handleChangeDistrict(event) {
        setDistrict(event.target.value)
        setUpdateSucceeded({
            status: false,
            message: '',
            display: false,
        })
    }

    //get commune
    useEffect(() => {
        const getCommune = async () => {
            await fetch(`https://sheltered-anchorage-60344.herokuapp.com/commune/?idDistrict=${district.idDistrict}`)
                .then(res => res.json())
                .then((data) => setCommuneList(data))
        }
        getCommune()
    }, [district])

    async function handleChangeCommune(event) {
        setCommune(event.target.value)
        setUpdateSucceeded({
            status: false,
            message: '',
            display: false,
        })
    }

    function handleChangeHouse(event) {
        setHouse(event.target.value)
        setUpdateSucceeded({
            status: false,
            message: '',
            display: false,
        })
    }

    const validate = () => {
        let flag = true;
        resetValidation()
        if (values.name === undefined || values.name === '') {
            setValidName({
                check: false,
                alert: 'Please enter your name!'
            })
            flag = false;
        }
        else if (!mFunction.onlyLettersAndSpaces(values.name)) {
            setValidName({
                check: false,
                alert: 'Invalid name!'
            })
            flag = false;
        }

        if (values.email === undefined || values.email === '') {
            setValidEmail({
                check: false,
                alert: 'Please enter email'
            })
            flag = false;
        }
        else if (!mFunction.validateEmail(values.email)) {
            setValidEmail({
                check: false,
                alert: 'Your email is not valid!'
            })
        }

        if (values.contact === undefined || values.contact === '') {
            setValidContact({
                check: false,
                alert: 'Please enter phone number'
            })
            flag = false;
        }
        else if (!mFunction.validatePhoneNumber(values.contact)) {
            setValidContact({
                check: false,
                alert: 'Invalid phone number!'
            })
            flag = false;
        }

        console.log(province.idProvince == null)

        if (house === undefined || house === '') {
            setValidAdress({
                check: false,
                alert: 'Please enter address'
            })
            flag = false;
        }
        else if (province.idProvince == null) {

            setValidAdress({
                check: false,
                alert: 'Please choose province'
            })
            flag = false;

            console.log('a')
        }
        else if (district.idDistrict == null) {
            setValidAdress({
                check: false,
                alert: 'Please choose district'
            })
            flag = false;

            console.log('b')
        }
        else if (commune.idCommune == null) {
            setValidAdress({
                check: false,
                alert: 'Please choose commune'
            })
            flag = false;

            console.log('c')
        }
        else {
            const communeName = commune.name
            const districtName = district.name
            const provinceName = province.name

            console.log('d')

            ///// setBigAddress(house + ", " + communeName + ", " + districtName + ", " + provinceName)
        }
        return flag;
    }

    useEffect(() => {
        setBigAddress(house + ", " + commune.name + ", " + district.name + ", " + province.name)
    }, [house, province, district, commune])


    const [updateSucceeded, setUpdateSucceeded] = useState({
        status: false,
        message: ''
    })

    const navigate = useNavigate()

    const order = async () => {

        if (validate()) {
            let currentTime = new Date()
            const dateFormat = format(currentTime, "PP p");
            const data = {
                _filmId: movieInfo.id,
                _theaterId: CURRENT_BOOKING.selectedTheater._id,
                _roomId: CURRENT_BOOKING.selectedRoom,
                seatIdArray: CURRENT_BOOKING.selectedSeats,
                dateOccur: CURRENT_BOOKING.selectedDate,
                timeOccur: CURRENT_BOOKING.selectedTime,
                _userEmail: currentUser.email,
                bookedTime: dateFormat,
                isCancelled: false,
                invoice: {
                    quantity: CURRENT_BOOKING.selectedSeats.length,
                    price: CURRENT_BOOKING.selectedTheater.price,
                    total: CURRENT_BOOKING.selectedSeats.length * CURRENT_BOOKING.selectedTheater.price,
                    method: "Cash"
                }

            }

            await TicketApi.create(data)
                .then((res) => {
                    setUpdateSucceeded({
                        status: true,
                        message: 'Buy ticket successfully!'
                    })

                })
                .catch((err) => {
                    console.log(err)
                    setErrorNotification({
                        status: true,
                        message: 'Sorry! There are something wrong with your request'
                    })
                })

            console.log(data)
        }
    }

    const [checkOutPaypal, setCheckOutPaypal] = useState(false)
    const paypal = () => {
        setCheckOutPaypal(true)
    }
    return (
        <div style={{marginTop: 24}}>
            <Grid container spacing={3}>
                <Grid item xs={6} >
                    {/* Name */}
                    <Grid item container sx={{ p: 2, pl: 4 }} >
                        <Grid item xs={4}>
                            <Typography style={{ color: 'rgb(196, 196, 196)', fontSize: 15, fontStyle: 'italic' }}>Name: </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            {
                                validName.check === true ?
                                    <TextField className="profile-information__item__content"
                                        variant="standard"
                                        sx={{
                                            borderRadius: '0.5',
                                            input: { color: 'white', marginLeft: 10, marginX: 0.4 },
                                            icons: { color: 'white' }
                                            ///backgroundColor: 'rgb(9, 24, 48)',
                                            // label: { color: 'rgb(153, 153, 153)', fontSize: 15 }
                                        }}
                                        defaultValue={currentUser.name}
                                        onChange={handleChangeInformation('name')}
                                    /> :
                                    <TextField className="profile-information__item__content"
                                        variant="standard"
                                        sx={{
                                            borderRadius: '0.5',
                                            input: { color: 'white', marginLeft: 10, marginX: 0.4 },
                                            icons: { color: 'white' }
                                            ///backgroundColor: 'rgb(9, 24, 48)',
                                            // label: { color: 'rgb(153, 153, 153)', fontSize: 15 }
                                        }}
                                        defaultValue={currentUser.name}
                                        onChange={handleChangeInformation('name')}
                                        error
                                        helperText={validName.alert}
                                    />
                            }
                        </Grid>
                    </Grid>

                    {/* Contact */}
                    <Grid item container sx={{ p: 2, pl: 4 }}>
                        <Grid item xs={4}>
                            <Typography style={{ color: 'rgb(196, 196, 196)', fontSize: 15, fontStyle: 'italic' }}>Contact: </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            {
                                validContact.check === true ?
                                    <TextField className="profile-information__item__content"
                                        variant="standard"
                                        sx={{
                                            borderRadius: '0.5',
                                            input: { color: 'white', marginLeft: 10, marginX: 0.4 },
                                            icons: { color: 'white' }
                                            ///backgroundColor: 'rgb(9, 24, 48)',
                                            // label: { color: 'rgb(153, 153, 153)', fontSize: 15 }
                                        }}
                                        defaultValue={currentUser.contact}
                                        onChange={handleChangeInformation('contact')}
                                    /> :
                                    <TextField className="profile-information__item__content"
                                        variant="standard"
                                        sx={{
                                            borderRadius: '0.5',
                                            input: { color: 'white', marginLeft: 10, marginX: 0.4 },
                                            icons: { color: 'white' }
                                            ///backgroundColor: 'rgb(9, 24, 48)',
                                            // label: { color: 'rgb(153, 153, 153)', fontSize: 15 }
                                        }}
                                        defaultValue={currentUser.contact}
                                        onChange={handleChangeInformation('contact')}
                                        error
                                        helperText={validContact.alert} />
                            }
                        </Grid>
                    </Grid>

                    {/* Email */}
                    <Grid item container sx={{ p: 2, pl: 4 }}>
                        <Grid item xs={4}>
                            <Typography style={{ color: 'rgb(196, 196, 196)', fontSize: 15, fontStyle: 'italic' }}>Email: </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            {
                                validEmail.check === true ?
                                    <TextField className="profile-information__item__content"
                                        variant="standard"
                                        sx={{
                                            borderRadius: '0.5',
                                            input: { color: 'white', marginLeft: 10, marginX: 0.4 },
                                            icons: { color: 'white' }
                                            ///backgroundColor: 'rgb(9, 24, 48)',
                                            // label: { color: 'rgb(153, 153, 153)', fontSize: 15 }
                                        }}
                                        defaultValue={currentUser.email}
                                        onChange={handleChangeInformation('email')}
                                    /> :
                                    <TextField className="profile-information__item__content"
                                        variant="standard"
                                        sx={{
                                            borderRadius: '0.5',
                                            input: { color: 'white', marginLeft: 10, marginX: 0.4 },
                                            icons: { color: 'white' }
                                            ///backgroundColor: 'rgb(9, 24, 48)',
                                            // label: { color: 'rgb(153, 153, 153)', fontSize: 15 }
                                        }}
                                        defaultValue={currentUser.email}
                                        onChange={handleChangeInformation('email')}
                                        error
                                        helperText={validEmail.alert}
                                    />
                            }
                        </Grid>
                    </Grid>

                    {/* Address */}
                    <Grid item container sx={{ p: 2, pl: 4 }}>
                        <AddressInput
                            province={province}
                            provinceList={provinceList}
                            district={district}
                            districtList={districtList}
                            commune={commune}
                            communeList={communeList}
                            handleChangeHouse={handleChangeHouse}
                            handleChangeProvince={handleChangeProvince}
                            handleChangeDistrict={handleChangeDistrict}
                            handleChangeCommune={handleChangeCommune}
                        />
                        {!validAdress.check && <Typography style={{ fontSize: 12, color: 'red', fontStyle: 'italic' }} sx={{ pt: 1 }}>{validAdress.alert}</Typography>}
                    </Grid>

                </Grid>

                <Grid item xs={6} style={{ backgroundColor: 'rgba(4, 12, 24, 1)' }}>
                    <TicketInformation movie={movieInfo} />
                </Grid>

            </Grid>

            <Box textAlign="center" sx={{ p: 2 }}>
                <OrderBtn onClick={order} >ORDER</OrderBtn>
                {
                    checkOutPaypal ? (<PayPal />) :
                        <PaypalBtn onClick={paypal}>PAYPAL</PaypalBtn>
                }
            </Box>

            {updateSucceeded.status && <Success message={updateSucceeded.message} status={updateSucceeded.status} />}
            {errorNotification.status && <Error message={errorNotification.message} status={errorNotification.status} />}

            {isLoading &&
                <Loading />}
        </div>
    )
}

const AddressInput = ({ province, district, commune,
    handleChangeProvince, handleChangeDistrict, handleChangeCommune, handleChangeHouse,
    provinceList, districtList, communeList }) => {
    return (
        <Grid item container>
            <TextField
                fullWidth
                id="outlined-basic"
                label="Your address"
                variant="standard"
                onChange={handleChangeHouse}
                sx={{
                    borderRadius: '0.5',
                    input: { color: 'white', marginLeft: 10, marginX: 0.4 },
                    icons: { color: 'white' },
                    label: { color: 'rgb(153, 153, 153)', fontSize: 15 },
                    border: { color: 'rgb(153, 153, 153)' }
                }}
            />
            <Grid spacing={2} container sx={{ width: '100%', position: 'relative', marginTop: '1em' }}>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">City/Province</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={province}
                            label="Province/City"
                            onChange={handleChangeProvince}
                            sx={{
                                label: { color: 'rgb(153, 153, 153)', fontSize: 15 },
                                input: { color: 'white', marginLeft: 10, marginX: 0.4 },
                            }}
                        >
                            {provinceList.map((province) => (
                                <MenuItem value={province}>{province.name}</MenuItem>
                            )
                            )}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">District</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={district}
                            label="District"
                            onChange={handleChangeDistrict}
                            sx={{

                            }}
                        >
                            {districtList.map((district) => (
                                <MenuItem value={district}>{district.name}</MenuItem>
                            )
                            )}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Commune</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={commune}
                            label="Commune"
                            onChange={handleChangeCommune}
                            sx={{}}
                        >
                            {communeList.map((commune) => (
                                <MenuItem value={commune}>{commune.name}</MenuItem>
                            )
                            )}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

        </Grid>
    )
}

const TicketInformation = ({ movie }) => {
    const CURRENT_BOOKING = useSelector(bookingSelector)
    const [movieInfo, setMovieInfo] = useState(movie)
    const [total, setTotal] = useState(0)



    useEffect(() => {
        const amount = CURRENT_BOOKING.selectedSeats.length
        const price = CURRENT_BOOKING.selectedTheater.price
        setTotal(amount * price)
    }, [])


    return (
        <Grid item container spacing={2}>
            <Grid item xs={3} style={{}}>
                <div className="poster"
                    style={{ backgroundImage: `url(${apiConfig.originalImage(movieInfo.poster_path)})`, width: '100%', height: '100%', backgroundPosition: 'center', backgroundSize: 'cover' }}>
                </div>
            </Grid>

            <Grid item xs={7}>
                <Stack direction="column">
                    <Typography variant="h5" style={{ fontWeight: 'bold', p: 2, color: 'red' }}>{movieInfo.title}</Typography>
                    <Typography variant='subtitle1' style={{ fontWeight: 'bold', p: 2, color: 'gray' }}>{CURRENT_BOOKING.selectedTheater.name}</Typography>
                    <Typography variant='subtitle2' style={{ fontStyle: 'italic', p: 2, color: 'gray' }}>{CURRENT_BOOKING.selectedTheater.address}</Typography>
                    <Typography variant='subtitle2' style={{ fontWeight: 'bold', color: 'red', p: 2 }}>Price: {CURRENT_BOOKING.selectedTheater.price} VND</Typography>
                    <Typography>{CURRENT_BOOKING.selectedDate} - {CURRENT_BOOKING.selectedTime}</Typography>
                    <Typography variant='subtitle1' style={{ fontStyle: 'italic', p: 2 }}>Seats: </Typography>
                    <Stack direction="row" sx={{ pl: 2 }}>
                        {
                            CURRENT_BOOKING.selectedSeats.map((item) => (
                                <Typography sx={{ pr: 0.5 }}>{item} </Typography>
                            ))
                        }
                    </Stack>


                    <Typography sx={{ fontWeight: 'bold', color: 'red' }}>Total: {total} VND</Typography>
                </Stack>
            </Grid>
        </Grid>
    )
}

const OrderBtn = ({ onClick }) => {
    const btnTheme = createTheme({
        shape: {
            borderRadius: 20
        },
        palette: {
            primary: red
        },
    })

    return (
        <div >
            <ThemeProvider theme={btnTheme} >
                <Button sx={{ paddingX: 5, paddingY: 0.8, mb: 2 }} variant="contained" onClick={onClick} >order</Button>
            </ThemeProvider>
        </div >
    )
}

const PaypalBtn = ({ onClick }) => {
    const btnTheme = createTheme({
        shape: {
            borderRadius: 20
        },
        palette: {
            primary: red
        },
    })

    return (
        <div >
            <ThemeProvider theme={btnTheme} >
                <Button sx={{ paddingX: 5, paddingY: 0.8 }} variant="contained" onClick={onClick} >Paypal</Button>
            </ThemeProvider>
        </div >
    )
}

export default BuyerInformation