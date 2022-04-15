import * as React from 'react'
import styles from './styles'
import { useState, useEffect } from "react";

import tmdbApi from "../../api/tmdbApi";
import { movieType } from '../../api/tmdbApi'
import apiConfig from "../../api/apiConfig";

import { useSelector, useDispatch } from 'react-redux'
import { movieSlice } from './../../redux/slices/movieSlice';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const NewShowTimeForm = () => {
    const dispatch = useDispatch()
    const [, forceRender] = useState()
    const upcomingMovie = useSelector(state => state.movies.upcoming)

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

        getMovies();
    }, []);

    useEffect(() => {
        forceRender()
    }, [upcomingMovie])

    const options = upcomingMovie.map((option) => {
        const firstLetter = option.title[0].toUpperCase();
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            ...option,
        };
    });

    return (
        <div style={styles.container} >

            <Autocomplete
                id="grouped-demo"
                options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                groupBy={(option) => option.firstLetter}
                getOptionLabel={(option) => option.title}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Chọn phim" />}
            />

        </div>
    )
}

export default NewShowTimeForm