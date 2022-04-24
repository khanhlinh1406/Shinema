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

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";

import Loading from '../../components/Loading/loading'
import Message from '../../components/Message/message'
import { Success } from '../../components/Alert/alert'

import AccountApi from "../../api/accountApi";
import TicketApi from "../../api/ticketApi";
import ShowTimeApi from "../../api/showTimeApi";
import EmailApi from '../../api/emailApi'
import mFunction from "../../function";

import BookingForm from '../../components/BookingForm/bookingForm';

const Booking = () => {
    const { id } = useParams()

    const [movieInfo, setMovieInfo] = useState();
    const [showTimeList, setShowTimeList] = useState([]);

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

        const fetchShowTimeByFilmId = async () => {
            await ShowTimeApi.getByFilmId(id)
                .then(res => {
                    setShowTimeList(res.data)
                })
        }

        fetchShowTimeByFilmId()
    }, [id])

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

                    <BookingForm showTimeList={showTimeList} />




                </>
            }
        </div>
    )
}

export default Booking

