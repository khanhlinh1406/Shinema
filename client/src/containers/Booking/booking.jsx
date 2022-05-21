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
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Typography from '@mui/material/Typography';
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

import BookingForm from '../../components/Booking/BookingForm/bookingForm';
import { useDispatch, useSelector } from 'react-redux';
import { bookingSelector } from '../../redux/selector';
import { bookingSlice } from './../../redux/slices/bookingSlice';
import RoomItem from './../../components/Booking/RoomItem/roomItem';
import BuyerInformation from '../../components/Booking/BuyerInformation/buyerInformation';

const Booking = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});
    const steps = ["Firstly, let choose your ideal seats!",
        "Secondly, let fill out your personal information!"]

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    const { id } = useParams()

    const [movieInfo, setMovieInfo] = useState();
    const [showTimeList, setShowTimeList] = useState([]);
    const dispatch = useDispatch()
    const CURRENT_BOOKING = useSelector(bookingSelector)

    const [data, setData] = useState()

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

        dispatch(bookingSlice.actions.setSelectedFilm(id))
    }, [id])

    useEffect(() => {
        if (CURRENT_BOOKING.check === true)
            setData(CURRENT_BOOKING.selectedTheater)
    }, [CURRENT_BOOKING.check])




    return (
        <div className="booking-container" >
            <MovieInformation movieInfo={movieInfo} />
            <Box sx={{ width: '100%', mt: 15 }}>
                <div>
                    <Typography variant="h5">Booking tickets</Typography>
                    <Stepper nonLinear activeStep={activeStep} sx={{ width: '80%' }}>
                        {steps.map((label, index) => (
                            <Step key={label} completed={completed[index]}>
                                <StepButton color="inherit" onClick={handleStep(index)}>
                                    {label}
                                </StepButton>
                            </Step>
                        ))}
                    </Stepper>
                    <div>
                        {allStepsCompleted() ? (
                            <React.Fragment>
                                <Typography sx={{ mt: 2, mb: 1 }}>
                                    All steps completed - you&apos;re finished
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handleReset}>Reset</Button>
                                </Box>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Button
                                        color="inherit"
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        sx={{ mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    {CURRENT_BOOKING.selectedSeats.length != 0 &&
                                        <Button onClick={handleNext} sx={{ mr: 1 }}>
                                            Next
                                        </Button>
                                    }
                                    {/* {activeStep !== steps.length &&
                                        (completed[activeStep] ? (
                                            <Typography variant="caption" sx={{ display: 'inline-block' }}>
                                                Step {activeStep + 1} already completed
                                            </Typography>
                                        ) : (
                                            <Button onClick={handleComplete}>
                                                {completedSteps() === totalSteps() - 1
                                                    ? 'Finish'
                                                    : 'Complete Step'}
                                            </Button>
                                        ))} */}
                                </Box>

                                {
                                    activeStep == 0 ? (
                                        <div>
                                            <BookingForm showTimeList={showTimeList} />
                                            {
                                                data && <RoomItem theater={data} />
                                            }
                                        </div>
                                    ) : (<BuyerInformation></BuyerInformation>)

                                }
                            </React.Fragment>
                        )}
                    </div>
                </div>
            </Box>
        </div>

        //         <BookingForm showTimeList={showTimeList} />
        //         {
        //             data && <RoomItem theater={data} />
        //         }

    )
}



const MovieInformation = ({ movieInfo }) => {
    const navigate = useNavigate()
    const viewDetails = () => {
        navigate(`/filmDetails/${movieInfo.id}`)
    }
    return (
        <div>
            {
                movieInfo &&
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
                            <div className="booking-containercontainer__movie-cover__overview">
                                {movieInfo.overview}
                            </div>

                            <div className="booking-container__movie-cover__view-more" onClick={viewDetails}>View more detail</div>
                        </div>

                    </div>
                </>

            }

        </div>
    );
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