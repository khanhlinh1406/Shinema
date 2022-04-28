import React from 'react'
import './bookingForm.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red } from '@mui/material/colors'

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";

import format from 'date-fns/format'
import mFunction from "../../function";

import { bookingSelector } from '../../redux/selector'
import { bookingSlice } from '../../redux/slices/bookingSlice'
import { useSelector, useDispatch } from 'react-redux';
import TheaterApi from './../../api/theaterApi';

const BookingForm = (props) => {
    const [showTimeList, setShowTimeList] = useState([])
    const [dateArray, setDateArray] = useState([])
    const [theaterArray, setTheaterArray] = useState([])

    const CURRENT_BOOKING = useSelector(bookingSelector)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(bookingSlice.actions.setShowTimeList(props.showTimeList))

        const getDate = async () => {
            await props.showTimeList.forEach((showTime) => {
                showTime.listDateTime.forEach((object) => {
                    dateArray.push(object.date)
                    ///setDateArray([...dateArray, object.date])
                })
            })

            setDateArray(mFunction.removeDuplicates(dateArray));
        }

        getDate();
    }, [props])



    return (
        <div className="booking-form__container">
            <div className="booking-form__container__check">
                <Box textAlign="right">
                    <CheckBtn />
                </Box>
            </div>

            <div className="booking-form__container__select">
                <div className="booking-form__container__select__date">
                    <div className="booking-form__container__select__date__title">Date</div>
                    <div className="booking-form__container__select__date__swiper">
                        <ShowDateItem array={dateArray} />

                    </div>
                </div>

                <div className="booking-form__container__select__time">
                    <div className="booking-form__container__select__time__title">Time</div>
                    <div className="booking-form__container__select__time__swiper">
                        <ShowTimeItem array={CURRENT_BOOKING.currentTimeArray} />
                    </div>
                </div>

                <div className="booking-form__container__select__theater">
                    <div className="booking-form__container__select__theater__title">Theater</div>
                    <div className="booking-form__container__select__theater__picker"></div>
                </div>
            </div>

        </div>
    )
}

export default BookingForm

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

export const DateItem = (props) => {
    const item = props.date;
    const [month, date, year] = item.split('/')
    const current = new Date(year, month, date);
    const CURRENT_BOOKING = useSelector(bookingSelector)
    const [isHighlighted, setIsHighlighted] = useState(false)
    const [timeArray, setTimeArray] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        if (CURRENT_BOOKING.selectedDate == item) {
            setIsHighlighted(true)

            const getTime = async () => {
                await CURRENT_BOOKING.showTimeList.forEach((showTime) => {
                    showTime.listDateTime.forEach((object) => {
                        if (object.date == CURRENT_BOOKING.selectedDate) {
                            setTimeArray(object.times)
                        }
                    })

                })

                dispatch(bookingSlice.actions.setCurrentTimeArray(timeArray))
            }

            getTime();
        }
        else
            setIsHighlighted(false)
    }, [CURRENT_BOOKING.selectedDate])

    const dayArr = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ]

    const monthArr = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ]

    return (
        <div className="date-item__container"
            onClick={() => dispatch(bookingSlice.actions.setDate(item))}
        >{
                !isHighlighted ?
                    <div className="date-item__container__content">
                        <div className="date-item__container__content__day">{dayArr[current.getDay()]}</div>
                        <div className="date-item__container__content__date">{current.getDate()}</div>
                        <div className="date-item__container__content__month">{monthArr[current.getMonth()]}</div>
                        <div className="date-item__container__content__year">{current.getFullYear()}</div>
                    </div>

                    :

                    <div className="date-item__container__content_red">
                        <div className="date-item__container__content__day">{dayArr[current.getDay()]}</div>
                        <div className="date-item__container__content__date">{current.getDate()}</div>
                        <div className="date-item__container__content__month">{monthArr[current.getMonth()]}</div>
                        <div className="date-item__container__content__year">{current.getFullYear()}</div>
                    </div>
            }
        </div>
    )
}

export const ShowDateItem = (props) => {
    const dateArray = props.array

    return (
        <div className="showdate-item-container"
        // style={{ backgroundColor: 'white' }}
        >{dateArray &&
            <Swiper
                slidesPerView={3}
                centeredSlides={true}
                spaceBetween={10}
                // grabCursor={true}
                // pagination={{
                //     clickable: true,
                // }}
                //modules={[Pagination]}
                clickable={true}
                className="mySwiper"
            >
                {
                    dateArray.map((item, i) => (
                        <SwiperSlide key={i}>
                            <DateItem date={item} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            }
        </div>
    )
}

export const TimeItem = (props) => {
    const item = props.time;

    const CURRENT_BOOKING = useSelector(bookingSelector)
    const [isHighlighted, setIsHighlighted] = useState(false)
    const dispatch = useDispatch()

    const [theaterArray, setTheaterArray] = useState([])

    useEffect(() => {
        if (CURRENT_BOOKING.selectedTime == item) {
            setIsHighlighted(true)

            // const getTheaters = async () => {
            //     await CURRENT_BOOKING.showTimeList.forEach((showTime) => {
            //         showTime.listDateTime.forEach((object) => {
            //             if (object.date == CURRENT_BOOKING.selectedDate) {
            //                 const [theater, setTheater] = useState() 
            //                 await TheaterApi.getById(CURRENT_BOOKING.selectedFilm)
            //                 .then((res) =>
            //                 {
            //                     setTheaterArray([...theaterArray, ...res.data])
            //                 })
            //             }
            //         })

            //     })

            //     dispatch(bookingSlice.actions.setCurrentTheaterArray(theaterArray))
            // }

            // getTheaters();
        }
        else
            setIsHighlighted(false)
    }, [CURRENT_BOOKING.selectedTime])

    return (
        <div className="time-item__container"
            onClick={() => dispatch(bookingSlice.actions.setTime(item))}
        >{
                !isHighlighted ?
                    <div className="time-item__container__content">
                        {item}
                    </div>

                    :
                    <div className="time-item__container__content_red">
                        {item}
                    </div>
            }
        </div>
    )

}

export const ShowTimeItem = (props) => {
    const timeArray = props.array

    const CURRENT_BOOKING = useSelector(bookingSelector)

    const [display, setDisplay] = useState(false);
    
    const [,refresh] = useState();

    useEffect(() =>{
        refresh()
    },[display])

    useEffect(() => {
        if (timeArray.length !=0)
        {
            setDisplay(true)
        }
        else
        setDisplay(false)
    }, [CURRENT_BOOKING.selectedDate, CURRENT_BOOKING.currentTimeArray])


    return (
        <div className="showtime-item-container"
        // style={{ backgroundColor: 'white' }}
        >{display ?
            <Swiper
                slidesPerView={3}
                centeredSlides={true}
                spaceBetween={10}
                // grabCursor={true}
                clickable={true}
                // pagination={{
                //     clickable: true,
                // }}
                className="showtime-item-container__swp"
            >
                {
                    timeArray.map((item, i) => (
                        <SwiperSlide key={i}>
                            <TimeItem time={item} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>

            : 
            <div className="showtime-item-container__require">
                Please choose the date
            </div>
            }
        </div>
    )
}

export const ShowTheaterItem = (props) =>{
    const theaterArray = props.array

    const CURRENT_BOOKING = useSelector(bookingSelector)

    const [display, setDisplay] = useState(false);

    useEffect(() => {
        // if (timeArray.length !=0)
        // {
        //     setDisplay(true)
        // }
        // else
        // setDisplay(false)
    }, [CURRENT_BOOKING.selectedDate, CURRENT_BOOKING.selectedTime])


    return (
        <div className="showtime-item-container"
        // style={{ backgroundColor: 'white' }}
        >{display ?
            <Swiper
                slidesPerView={3}
                centeredSlides={true}
                spaceBetween={10}
                // grabCursor={true}
                clickable={true}
                // pagination={{
                //     clickable: true,
                // }}
                className="showtime-item-container__swp"
            >
                {
                    // timeArray.map((item, i) => (
                    //     <SwiperSlide key={i}>
                    //         <TimeItem time={item} />
                    //     </SwiperSlide>
                    // ))
                }
            </Swiper>

            : 
            <div className="showtime-item-container__require">
                Please choose the date
            </div>
            }
        </div>
    )
}