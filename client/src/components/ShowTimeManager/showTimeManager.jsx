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
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ShowTimeManagerItem from '../ShowTimeManagerItem/showTimeManagerItem';

import Loading from '../Loading/loading'

import viLocale from "date-fns/locale/vi"
import format from 'date-fns/format'


const ShowTimeManager = () => {
    const [, forceRerender] = useState();
    const data = useSelector(showTimeRemainingSelector)

    const [value, setValue] = useState(new Date());

    const dispatch = useDispatch()

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    // useEffect(() => {
    //     // const dateFormat = format(value, "MM/dd/yyyy");
    //     // console.log(dateFormat);

    //     console.log(listShowTimes)

    // }, [listShowTimes])

    const getShowTimes = async () => {

        ShowTimeApi.getAll().then(data => {
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
        const dateFormat = format(value, "dd/MM/yyyy");
        dispatch(showTimeSlice.actions.setFilter(dateFormat))
    }

    useEffect(() => {
        getShowTimes()
        setDefaultFilter()
    }, [])

    useEffect(() => {
        forceRerender()
    }, [data])
    return (
        <Box sx={{ width: '100%' }}>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={viLocale}  >
                <DatePicker
                    label="Ngày"
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue)
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


            {data ?
                data.map((item, i) => (
                    <ShowTimeManagerItem key={i} item={item} />
                ))
                :
                <Loading />
            }
        </Box>
    )
}
export default ShowTimeManager