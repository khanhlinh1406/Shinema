import * as React from 'react'
import styles from './styles'
import { useState, useEffect, useCallback } from "react";
import { Error, Success } from '../Alert/alert';

import tmdbApi from "../../api/tmdbApi";
import { movieType } from '../../api/tmdbApi'
import apiConfig from "../../api/apiConfig";

import { useSelector, useDispatch } from 'react-redux'
import { movieSlice } from './../../redux/slices/movieSlice';
import { theaterSlice } from './../../redux/slices/theaterSlice';
import { theaterSelector } from '../../redux/selector'

import TheaterApi from '../../api/theaterApi'
import ShowTimeApi from '../../api/showTimeApi'

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red } from "@mui/material/colors";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import VideoLabelOutlinedIcon from '@mui/icons-material/VideoLabelOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import viLocale from "date-fns/locale/vi"
import format from 'date-fns/format'

const NewShowTimeForm = ({ closeNewShowTimeHandle }) => {
    const dispatch = useDispatch()
    const [, forceRender] = useState()

    const btnTheme = createTheme({
        shape: {
            borderRadius: 5
        },
        palette: {
            primary: red
        },
    })

    const [currentFilm, setCurrentFilm] = useState()
    const [currentTheater, setCurrentTheater] = useState()
    const [listDateTime, setListDateTime] = useState([])
    const [dateSelected, setDateSelected] = useState()

    const [updateSuccessVisible, setUpdateSuccessVisible] = useState(false)
    const [errorDateVisible, setErrorDateVisible] = useState(false)
    const [errorFilmTheaterVisible, setErrorFilmTheaterVisible] = useState(false)
    const [errorTimes, setErrorTimes] = useState(false)
    const [errorTimesVisible, setErrorTimesVisible] = useState(false)

    const upcomingMovies = useSelector(state => state.movies.upcoming)
    const theaters = useSelector(theaterSelector)

    useEffect(() => {
        const getMovies = async () => {
            const params = {

            }
            try {
                const response = await tmdbApi.getMoviesList(movieType.upcoming, { params: params });
                dispatch(movieSlice.actions.updateAllUpcoming(response.results))
            } catch {
                console.log("Film slider error")
            }
        }

        const getTheaters = () => {
            TheaterApi.getAll().then(res => {
                if (res) {
                    dispatch(theaterSlice.actions.updateAll(res))
                }

            })
                .catch(err => console.log(err))
        }

        setDateSelected(new Date())
        getMovies();
        getTheaters();
    }, []);

    useEffect(() => {
        forceRender()
    }, [upcomingMovies, theaters])

    useEffect(() => {
        console.log(listDateTime)
    }, [listDateTime])

    const movieOptions = upcomingMovies.map((option) => {
        const firstLetter = option.title[0].toUpperCase();
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            ...option,
        };
    });

    const addDateHandle = () => {
        const dateFormat = format(dateSelected, "dd/MM/yyyy");
        const today = new Date()

        if (
            dateSelected.getFullYear() >= today.getFullYear() &&
            dateSelected.getMonth() >= today.getMonth() &&
            dateSelected.getDate() >= today.getDate()
        ) {
            if (listDateTime.length != 0 && listDateTime.find(e => e.date == dateFormat)) return

            setListDateTime([...listDateTime, { date: dateFormat }])
        }
        else {
            setErrorDateVisible(true)
        }
    }

    const deleteDateHandle = (item) => {
        let temp = listDateTime.filter(e => e.date !== item.date)
        setListDateTime(temp)
    }

    const onChangeTimeHandle = (item) => {
        let temp = listDateTime.map(e => e.date !== item.date ? e : item);
        setListDateTime(temp)
        setErrorTimesVisible(false)
    }

    const onChangeErrorTimeHandle = (val) => {
        setErrorTimes(val)
    }

    const addShowTimeHandle = () => {
        if (checkShowTime()) {
            let showTime = {
                filmId: currentFilm.id,
                theaterId: currentTheater._id,
                listDateTime: listDateTime
            }

            ShowTimeApi.create(showTime).then(res => {
                console.log(res)
                if (res.data == 'Successful') {
                    setUpdateSuccessVisible(true)
                    closeNewShowTimeHandle()
                }
            }).catch(err => console.log(err))
        }
    }

    const checkShowTime = () => {
        if (currentFilm == null || currentTheater == null) {
            setErrorFilmTheaterVisible(true)
            return false
        }

        if (listDateTime.length == 0) {
            setErrorTimes(true)
            return false
        }

        if (errorTimes) {
            setErrorTimesVisible(true)
            return false
        }

        return true
    }

    return (
        <div style={styles.container} >
            <div>
                <Autocomplete
                    onChange={(event, value) => { setCurrentFilm(value); setErrorFilmTheaterVisible(false) }}
                    options={movieOptions.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                    groupBy={(option) => option.firstLetter}
                    getOptionLabel={(option) => option.title}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Movie" />}
                />

                {currentFilm && <CurrentFilm currentFilm={currentFilm} />}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 30, width: '100%' }}>

                <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Autocomplete
                        onChange={(event, value) => { setCurrentTheater(value); setErrorFilmTheaterVisible(false) }}
                        options={theaters}
                        getOptionLabel={(option) => option.name}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Theater" />}
                    />
                    <ThemeProvider theme={btnTheme} >
                        <Button sx={{ paddingX: 2.5, paddingY: 1.5 }} variant="contained" endIcon={<VideoLabelOutlinedIcon />} onClick={addShowTimeHandle} >Insert show time</Button>
                    </ThemeProvider>
                </div>

                <div style={{ width: '100%', marginTop: 20 }}>
                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <p style={{ color: 'rgb(9, 24, 48)', fontSize: 20, marginTop: 5 }}>Show time</p>

                        <div>
                            <IconButton size='large' onClick={addDateHandle}>
                                <AddCircleOutlineOutlinedIcon fontSize="inherit" />
                            </IconButton>

                            <LocalizationProvider dateAdapter={AdapterDateFns} locale={viLocale}  >
                                <DatePicker
                                    label="Date"
                                    value={dateSelected}
                                    onChange={(newValue) => {
                                        setDateSelected(newValue)
                                        setErrorDateVisible(false)
                                    }}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                        />}
                                />
                            </LocalizationProvider>
                        </div>

                    </div>

                    {listDateTime.length != 0 &&
                        <div style={{ border: '1px solid #cfcfcf', width: '100%', borderRadius: 5, marginTop: 10 }}>
                            {listDateTime.map((item, index) => (
                                <DateTimeItem key={index} item={item} deleteDateHandle={deleteDateHandle} onChangeTimeHandle={onChangeTimeHandle} onChangeErrorTimeHandle={onChangeErrorTimeHandle} />
                            ))}
                        </div>}
                </div>

            </div >

            <Error message={'Please schedule this time 1 day before occuring'} status={errorDateVisible} />
            <Error message={'Please select movie and theater'} status={errorFilmTheaterVisible} />
            <Error message={'Show time is not valid'} status={errorTimesVisible} />
            <Success message={'Insert successfully'} status={updateSuccessVisible} />
        </div >
    )
}

const CurrentFilm = ({ currentFilm }) => {
    const poster = apiConfig.originalImage(currentFilm.backdrop_path ? currentFilm.poster_path : currentFilm.backdrop_path)

    return (
        <div style={{ maxWidth: 400 }}>
            <div style={{
                backgroundImage: `url(${poster})`,
                display: 'flex',
                height: 400,
                width: 280,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                borderRadius: 20,
                boxShadow: 5,
                marginTop: 10
            }} />

            {/* <h1 style={{ color: 'rgb(9, 24, 48)', fontSize: 35, }}>{currentFilm.title}</h1> */}

        </div>
    )
}

const DateTimeItem = ({ item, deleteDateHandle, onChangeTimeHandle, onChangeErrorTimeHandle }) => {
    const [value, setValue] = useState()
    const [errorTimeVisible, setErrorTimeVisible] = useState(false)

    const handleChange = () => (event) => {
        setValue(event.target.value)
        if (checkTimeFormat(event.target.value)) {
            let timeString = event.target.value.trim()
            let timeArr = timeString.split(' ')
            onChangeTimeHandle({ date: item.date, times: timeArr })

            setErrorTimeVisible(false)
            onChangeErrorTimeHandle(false)
        }
        else {
            onChangeTimeHandle({ date: item.date, times: event.target.value })
            setErrorTimeVisible(true)
            onChangeErrorTimeHandle(true)
        }

    };
    const deleteHandle = () => {
        deleteDateHandle(item)
    }


    const checkTimeFormat = (timeArray) => {
        let timesString = timeArray.trim();
        let listTime = timesString.split(' ')

        var timeFormat = /^(?:\d|[01]\d|2[0-3]):[0-5]\d$/
        let result = true
        listTime.forEach(element => {
            if (element.match(timeFormat) === null) {
                result = false
                return
            }
        });

        return result
    }

    return (
        <div style={{ display: 'flex', alignItems: 'stretch', flexDirection: 'column', padding: 15 }}>
            <p style={{ color: 'rgb(9, 24, 48)' }}>{item.date}</p>

            <FormControl sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">Time. Ex: 8:30 10:30 ... </InputLabel>
                <Input
                    id="standard-adornment-password"
                    type='text'
                    value={value}
                    onChange={handleChange}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={deleteHandle}
                                onMouseDown={event => event.preventDefault()}
                            >
                                <CloseRoundedIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>

            {errorTimeVisible &&
                <div style={{ padding: 8, backgroundColor: '#fdeded', display: 'flex', alignItems: 'center', borderRadius: 3 }}>
                    <ErrorOutlineIcon sx={{ color: '#f16663' }} />
                    <p style={{ color: '#8d4a4a', fontFamily: 'sans-serif', marginLeft: 10 }}>Danh sách thời gian chưa đúng định dạng</p>
                </div>
            }

        </div>


    )
}
export default NewShowTimeForm