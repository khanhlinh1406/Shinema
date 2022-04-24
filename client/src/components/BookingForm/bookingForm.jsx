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

const BookingForm = (props) => {
    const [showTimeList, setShowTimeList] = useState([])
    const [dateArray, setDateArray] = useState([])

    useEffect(() => {
        const getDate = async () => {
            await props.showTimeList.forEach((showTime) => {
                showTime.listDateTime.forEach((object) => {
                    ///dateArray.push(object.date)
                    setDateArray([...dateArray, object.date])
                })
            })
        }

        getDate();
    }, [props])



    return (
        <div className="booking-form__container">
            <div className="booking-form__container__select">
                <div className="booking-form__container__select__date">
                    <div className="booking-form__container__select__date__title">Date</div>
                    <div className="booking-form__container__select__date__swiper">
                        <ShowDateItem array={dateArray} />

                    </div>
                </div>

                <div className="booking-form__container__select__time">
                    <div className="booking-form__container__select__time__title">Time</div>
                    <div className="booking-form__container__select__time__picker"></div>
                </div>

                <div className="booking-form__container__select__theater">
                    <div className="booking-form__container__select__theater__title">Theater</div>
                    <div className="booking-form__container__select__theater__picker"></div>
                </div>
            </div>

            <div className="booking-form__container__check">
                <Box textAlign="center">
                    <CheckBtn />
                </Box>
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

    ///console.log(dayArr[current.getDay()])

    return (
        <div className="date-item__container"
            onClick={() => console.log(current)}
        >
            <div className="date-item__container__content">
                <div className="date-item__container__content__day">{dayArr[current.getDay()]}</div>
                <div className="date-item__container__content__date">{current.getDate()}</div>
                <div className="date-item__container__content__month">{monthArr[current.getMonth()]}</div>
                <div className="date-item__container__content__year">{current.getFullYear()}</div>
            </div>

        </div>
    )
}

export const ShowDateItem = (props) => {
    const dateArray = props.array
    console.log(dateArray)
    return (
        <div className="showtime-item-container"
        // style={{ backgroundColor: 'white' }}
        >
            <Swiper
                slidesPerView={3}
                centeredSlides={true}
                spaceBetween={20}
                // grabCursor={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
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

        </div>
    )
}

export const ShowTimeItem = (props) => {

}