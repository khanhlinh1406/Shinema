import React, { useState } from 'react'

import Box from '@mui/material/Box';

import TheaterSeat from '../theaterSeat/theaterSeat';

import styles from './styles'
import { useEffect } from 'react';

import { bookingSelector } from '../../../redux/selector'
import { bookingSlice } from '../../../redux/slices/bookingSlice'
import { useSelector, useDispatch } from 'react-redux';

const RoomItem = ({ item }) => {
    const CURRENT_BOOKING = useSelector(bookingSelector)
    const [theaterFilmAvailable, setTheaterFilmAvailable] = useState(item)
    const [_theaterFilmAvailable, _setTheaterFilmAvailable] = useState(item)
    const [listRoomId, setListRoomId] = useState(CURRENT_BOOKING.currentRoomIdArray)

    useEffect(() => {
        listRoomId.forEach(roomId => {
            setTheaterFilmAvailable({
                theaterFilmAvailable,
                listRoom: theaterFilmAvailable.listRoom.filter((e) => {
                    return e.id === roomId
                }
                )
            })
        })
    }, [CURRENT_BOOKING.currentRoomIdArray])

    useEffect(() => {console.log(theaterFilmAvailable)},[theaterFilmAvailable])

    useEffect(() => {
        setTheaterFilmAvailable(theaterFilmAvailable)
    }, [CURRENT_BOOKING.selectedTheater])

    return (
        <Box sx={styles.boxContainer}>
            <h2 style={styles.text}>{item.name}</h2>
            <p style={styles.text}>{item.address}</p>
            <p style={styles.text}>Contact: {item.contact}</p>

            {
                theaterFilmAvailable.listRoom.map((item, index) => (
                    <TheaterSeat key={index} item={item} />
                ))
            }

        </Box>
    )
}

export default RoomItem