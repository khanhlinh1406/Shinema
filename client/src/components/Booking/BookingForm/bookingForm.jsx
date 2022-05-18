import React from 'react'
import './bookingForm.css'
import { useEffect, useState, useCallback } from 'react';
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
import mFunction from "../../../function";

import { bookingSelector } from '../../../redux/selector'
import { bookingSlice } from '../../../redux/slices/bookingSlice'
import { useSelector, useDispatch } from 'react-redux';
import TheaterApi from '../../../api/theaterApi';
import { Card } from '@mui/material';
import Typography from '@mui/material/Typography';

const BookingForm = (props) => {
    const [showTimeList, setShowTimeList] = useState([])
    const [dateArray, setDateArray] = useState([])
    const [theaterIdArray, setTheaterIdArray] = useState([])
    const [timeArray, setTimeArray] = useState([])

    const CURRENT_BOOKING = useSelector(bookingSelector)
    const dispatch = useDispatch()

    dispatch(bookingSlice.actions.setShowTimeList(props.showTimeList))

    useEffect(() => {

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

    useEffect(() => {
        setTimeArray(CURRENT_BOOKING.currentTimeArray)
        setTheaterIdArray(CURRENT_BOOKING.currentTheaterIdArray)
    }, [CURRENT_BOOKING.currentTimeArray])

    useEffect(() => {
        setTheaterIdArray(CURRENT_BOOKING.currentTheaterIdArray)
    }, [CURRENT_BOOKING.currentTheaterIdArray])



    return (
        <div className="booking-form__container">
            <Card sx={{ width: '80%', color: '#e3e4e8', borderRadius: 5, padding: 2 }}>
                <Typography textAlign="left" variant="h6" sx={{ fontWeight: 'bold', color: '#000' }}>
                    Choose the showtime here!
                </Typography>
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
                            <ShowTimeItem array={timeArray} />
                        </div>
                    </div>

                    <div className="booking-form__container__select__theater">
                        <div className="booking-form__container__select__theater__title">Theater</div>
                        <div className="booking-form__container__select__theater__picker">
                            <ShowTheaterItem array={theaterIdArray} />
                        </div>
                    </div>
                </div>
            </Card>

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

    const CURRENT_BOOKING = useSelector(bookingSelector)
    const dispatch = useDispatch()

    const navigate = useNavigate();

    const onClick = () => {
        if (CURRENT_BOOKING.selectedDate !== '' && CURRENT_BOOKING.selectedTime !== '' && CURRENT_BOOKING.selectedTheater !== {}) {
            dispatch(bookingSlice.actions.setCheck(true))
        }
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
    const [timeArray, setTimeArray] = useState(CURRENT_BOOKING.currentTimeArray)
    const dispatch = useDispatch()

    useEffect(() => {
        if (CURRENT_BOOKING.selectedDate == item) {
            setIsHighlighted(true)
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
    const item = props.time

    const CURRENT_BOOKING = useSelector(bookingSelector)
    const [isHighlighted, setIsHighlighted] = useState(false)
    const dispatch = useDispatch()

    const [theaterArray, setTheaterArray] = useState([])
    const [theaterIdArray, setTheaterIdArray] = useState([])


    useEffect(() => {
        if (CURRENT_BOOKING.selectedTime == item) {
            setIsHighlighted(true)
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
    const [timeArray, setTimeArray] = useState(props.array)

    const CURRENT_BOOKING = useSelector(bookingSelector)

    const [display, setDisplay] = useState(false);

    const [, refresh] = useState();

    const dispatch = useDispatch()


    useEffect(() => {
        setTimeArray(props.array)
    }, [props.array])

    useEffect(() => {
        dispatch(bookingSlice.actions.setTime(''))
    }, [CURRENT_BOOKING.selectedDate])

    useEffect(() => {
        if (timeArray.length != 0) {
            setDisplay(true)
        }
        else
            setDisplay(false)
    }, [timeArray])



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

export const ShowTheaterItem = (props) => {
    const [theaterIdArray, setTheaterIdArray] = useState(props.array)

    const dispatch = useDispatch()
    const CURRENT_BOOKING = useSelector(bookingSelector)

    const [display, setDisplay] = useState(false);

    const [, refresh] = useState();

    useEffect(() => {
        if (theaterIdArray.length != 0) {
            setDisplay(true)
        }
        else
            setDisplay(false)
    }, [theaterIdArray])

    useEffect(() => {
        setTheaterIdArray(props.array)
    }, [props.array])

    useEffect(() => {
        setDisplay(false)
        dispatch(bookingSlice.actions.setSelectedTheater({}))
    }, [CURRENT_BOOKING.selectedDate])

    useEffect(() => {
        dispatch(bookingSlice.actions.setSelectedTheater({}))
    }, [CURRENT_BOOKING.currentTimeArray])


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
                    theaterIdArray.map((item, i) => (
                        <SwiperSlide key={i}>
                            <TheaterItem theaterId={item} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            :
            <div className="showtime-item-container__require">
                Please choose the showtime
            </div>
            }
        </div>
    )
}

const TheaterItem = (props) => {
    const [itemId, setItemId] = useState(props.theaterId)
    const [isHighlighted, setIsHighlighted] = useState(false)
    const dispatch = useDispatch()
    const CURRENT_BOOKING = useSelector(bookingSelector)
    const [item, setItem] = useState({})

    const [selectedShowTime, setSelectedShowTime] = useState({})

    useEffect(async () => {
        const getTheater = async () => {
            await TheaterApi.getById(itemId)
                .then((res) => {
                    setItem(res.data)
                })
                .catch((err) => { console.log(err) })
        }
        await getTheater()
    }, [])

    useEffect(() => {
        if (CURRENT_BOOKING.selectedTheater == item) {
            setIsHighlighted(true)
        }
        else
            setIsHighlighted(false)
    }, [CURRENT_BOOKING.selectedTheater])


    return (
        <div className="theater-item__container"
            onClick={() => dispatch(bookingSlice.actions.setSelectedTheater(item))}
        >{
                !isHighlighted ?
                    <div className="theater-item__container__content">
                        <div className="theater-item__container__content__name">{item.name}</div>
                        <div className="theater-item__container__content__address">{item.address}</div>
                    </div>
                    :
                    <div className="theater-item__container__content_red">
                        <div className="theater-item__container__content__name_red">{item.name}</div>
                        <div className="theater-item__container__content__address_red">{item.address}</div>
                    </div>
            }
        </div>
    )
}