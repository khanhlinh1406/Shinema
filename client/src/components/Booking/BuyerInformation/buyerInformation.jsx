
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, Stack, Typography, Link, Breadcrumbs, TextField } from '@mui/material';
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

const BuyerInformation = () => {
    const currentUser = useSelector(userSelector);
    const dispatch = useDispatch();

    const [values, setValues] = useState({
        name: currentUser.name,
        contact: currentUser.contact,
        address: currentUser.address,
        email: currentUser.email,
    })

    const handleChangeInformation = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
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
            const resProvince = await fetch('https://sheltered-anchorage-60344.herokuapp.com/province')
            const resProv = resProvince.json()
            setProvinceList(await resProv)
        }
        getProvinceList()
    }, [])

    function handleChangeProvince(event) {
        setProvince(event.target.value)
    }
    //get district
    useEffect(() => {
        const getDistrict = async () => {
            const resDistrict = await fetch(`https://sheltered-anchorage-60344.herokuapp.com/district/?idProvince=${province.idProvince}`)
            const resDis = resDistrict.json()
            setDistrictList(await resDis)
        }
        getDistrict()
    }, [province])

    function handleChangeDistrict(event) {
        setDistrict(event.target.value)
    }

    //get commune
    useEffect(() => {
        const getCommune = async () => {
            const reCommune = await fetch(`https://sheltered-anchorage-60344.herokuapp.com/commune/?idDistrict=${district.idDistrict}`)
            const resCom = reCommune.json()
            setCommuneList(await resCom)
        }
        getCommune()
    }, [district])

    async function handleChangeCommune(event) {
        setCommune(event.target.value)
    }

    function handleChangeHouse(event) {
        setHouse(event.target.value)
    }


    return (
        <div>
            <Grid container >
                <Grid item xs={7} style={{ backgroundColor: '#000' }}>
                    {/* Name */}
                    <Grid item container >
                        <Grid item xs={4}>
                            <Typography>Name: </Typography>
                        </Grid>
                        <Grid item xs={8}>
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
                            />
                        </Grid>
                    </Grid>

                    {/* Contact */}
                    <Grid item container >
                        <Grid item xs={4}>
                            <Typography>Contact: </Typography>
                        </Grid>
                        <Grid item xs={8}>
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
                            />
                        </Grid>
                    </Grid>

                    {/* Email */}
                    <Grid item container >
                        <Grid item xs={4}>
                            <Typography>Email: </Typography>
                        </Grid>
                        <Grid item xs={8}>
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
                            />
                        </Grid>
                    </Grid>

                    {/* Address */}
                    <Grid item container>
                        <AddressInput
                            province={province}
                            provinceList={provinceList}
                            district={district}
                            setDistrictList={districtList}
                            commune={commune}
                            communeList={communeList}
                            handleChangeHouse={handleChangeHouse}
                            handleChangeProvince={handleChangeProvince}
                            handleChangeDistrict={handleChangeDistrict}
                            handleChangeCommune={handleChangeCommune}
                        />
                    </Grid>

                </Grid>

                <Grid item xs={5}>

                </Grid>
            </Grid>
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
                variant="outlined"
                onChange={handleChangeHouse}
                sx={{
                    color: '#333333',
                    fontFamily: 'sans-serif',
                    marginTop: '1.3rem'
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

export default BuyerInformation