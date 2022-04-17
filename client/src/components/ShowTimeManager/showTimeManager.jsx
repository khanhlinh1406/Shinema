import * as React from 'react';
import { useEffect, useState } from 'react';
import ShowTimeApi from './../../api/showTimeApi';

import tmdbApi from "../../api/tmdbApi";
import { movieType, category } from '../../api/tmdbApi'
import apiConfig from "../../api/apiConfig";

import { useSelector, useDispatch } from 'react-redux';
import { showTimeSlice } from './../../redux/slices/showTimeSlice';
import { showTimeRemainingSelector } from '../../redux/selector'

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { red } from "@mui/material/colors";

import ShowTimeManagerItem from '../ShowTimeManagerItem/showTimeManagerItem';
import NewShowTimeForm from '../NewShowTimeForm/newShowTimeForm';

import Loading from '../Loading/loading'

import viLocale from "date-fns/locale/vi"
import format from 'date-fns/format'



const ShowTimeManager = () => {
    const [, forceRerender] = useState();
    const data = useSelector(showTimeRemainingSelector)

    const [dateSelect, setDateSelect] = useState(new Date());
    const [showNewForm, setShowNewForm] = useState(false)

    const dispatch = useDispatch()

    const handleChange = (newValue) => {
        setDateSelect(newValue);
    };

    // useEffect(() => {
    //     // const dateFormat = format(value, "MM/dd/yyyy");
    //     // console.log(dateFormat);

    //     console.log(listShowTimes)

    // }, [listShowTimes])

    const getShowTimes = async () => {
        await ShowTimeApi.getAll().then(data => {
            dispatch(showTimeSlice.actions.updateAll([]))
            const params = {
            }
            data.forEach(element => {
                tmdbApi.detail(category.movie, element.filmId, { params: params })
                    .then(res => {
                        let temp = { ...element, film: { ...res } }
                        // setListShowTimes(pre => [...pre, temp])
                        dispatch(showTimeSlice.actions.add(temp))
                    })
                    .catch(err => console.log(err))
            });

        })
            .catch(err => console.log(err))
    }

    const setDefaultFilter = () => {
        const dateFormat = format(dateSelect, "dd/MM/yyyy");
        dispatch(showTimeSlice.actions.setFilter(dateFormat))
    }

    useEffect(() => {
        getShowTimes()
        setDefaultFilter()
    }, [])

    useEffect(() => {
        forceRerender()
    }, [data])

    const btnTheme = createTheme({
        shape: {
            borderRadius: 20
        },
        palette: {
            primary: red
        },
    })

    return (
        <ClickAwayListener onClickAway={() => setShowNewForm(false)}>
            <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'self-start' }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={viLocale}  >
                        <DatePicker
                            label="Ngày"
                            value={dateSelect}
                            onChange={(newValue) => {
                                setDateSelect(newValue)
                                const dateFormat = format(newValue, "dd/MM/yyyy");
                                dispatch(showTimeSlice.actions.setFilter(dateFormat))
                            }}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    sx={{
                                        svg: { color: '#fff' },
                                        input: { color: '#fff' },
                                        label: { color: '#fff' },
                                    }}
                                />}
                        />
                    </LocalizationProvider>

                    <ThemeProvider theme={btnTheme} >
                        <Button sx={{ paddingX: 2.5, paddingY: 1 }} variant="contained" endIcon={<AddRoundedIcon />} onClick={() => setShowNewForm(true)}>Thêm mới</Button>
                    </ThemeProvider>
                </div>

                {data ?
                    data.map((item, i) => (
                        <ShowTimeManagerItem key={i} item={item} />
                    ))
                    :
                    <Loading />
                }

                {showNewForm && <NewShowTimeForm />}
            </Box>
        </ClickAwayListener>
    )
}
export default ShowTimeManager