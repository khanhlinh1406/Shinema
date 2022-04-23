import React from 'react'
import { useState, useEffect } from 'react'
import './booking.css'
import { useParams, useNavigate } from 'react-router';

import { Helmet } from 'react-helmet';

import tmdbApi from "../../api/tmdbApi";
import { movieType, category } from '../../api/tmdbApi'
import apiConfig from "../../api/apiConfig";

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red } from '@mui/material/colors'

const Booking = () => {
    const { id } = useParams()

    const [movieInfo, setMovieInfo] = useState();

    useEffect(() => {
        const getMovie = async () => {
            const params = {
            }

            try {
                const response = await tmdbApi.detail(category.movie, id, { params: params });
                setMovieInfo(response)
            } catch (err) {
                console.log(err)
            }
        }

        getMovie();
    })

    const navigate = useNavigate()
    const viewDetails = () => {
        navigate(`/filmDetails/${id}`)
    }

    return (
        <div className="booking-container" >
            {movieInfo &&
                <>
                    <Helmet>
                        <title>
                            Booking: {movieInfo.title || movieInfo.name}
                        </title>
                    </Helmet>


                    <div className="booking-container__movie-cover" style={{ backgroundImage: `url(${apiConfig.originalImage(movieInfo.backdrop_path)})` }}>
                        <div className="booking-container__movie-cover__gradient"></div>
                        <div className="booking-container__movie-cover__poster"
                            style={{ backgroundImage: `url(${apiConfig.originalImage(movieInfo.poster_path)})` }}></div>

                        <div className="booking-container__movie-cover__content">
                            <div className="booking-container__movie-cover__title">{movieInfo.name || movieInfo.title}</div>
                            <div className="booking-container__movie-cover__duration">{movieInfo.runtime} minutes</div>
                            <div className="booking-container__movie-cover__genres">
                                {
                                    movieInfo.genres && movieInfo.genres.slice(0, 5).map((genre, i) => (
                                        <span key={i} className="booking-container__movie-cover__genres__item">
                                            {genre.name}
                                        </span>
                                    ))
                                }
                            </div>
                            <p className="booking-container__movie-cover__overview">
                                {movieInfo.overview} <p className="booking-container__movie-cover__view-more" onClick={viewDetails}>View more detail</p>
                            </p>
                        </div>
                    </div>

                    <div className="booking-container__select">
                        <div className="booking-container__select__date">
                            <div className="booking-container__select__date__title">Date</div>
                            <div className="booking-container__select__date__swiper"></div>
                        </div>

                        <div className="booking-container__select__time">
                            <div className="booking-container__select__time__title">Time</div>
                            <div className="booking-container__select__time__picker"></div>
                        </div>

                        <div className="booking-container__select__theater">
                            <div className="booking-container__select__theater__title">Theater</div>
                            <div className="booking-container__select__theater__picker"></div>
                        </div>
                    </div>

                    <div className="booking-container__check">
                        <Box textAlign="center">
                            <CheckBtn />
                        </Box>
                    </div>



                </>
            }
        </div>
    )
}

export default Booking

export const CheckBtn = () => {
    const btnTheme = createTheme({
        shape: {
            borderRadius: 20
        },
        palette: {
            primary: red
        },
    })

    const navigate = useNavigate();

    const onClick = () => {
    }

    return (
        <div >
            <ThemeProvider theme={btnTheme} >
                <Button sx={{ paddingX: 5, paddingY: 0.8 }} variant="contained" onClick={onClick} >CHECK</Button>
            </ThemeProvider>
        </div >
    )
}