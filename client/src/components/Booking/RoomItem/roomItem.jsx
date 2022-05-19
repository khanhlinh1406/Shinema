import React, { useState } from 'react'

import Box from '@mui/material/Box';

import TheaterSeat from '../theaterSeat/theaterSeat';

import styles from './styles'
import { useEffect } from 'react';

import { bookingSelector } from '../../../redux/selector'
import { bookingSlice } from '../../../redux/slices/bookingSlice'
import { useSelector, useDispatch } from 'react-redux';

const RoomItem = ({ theater }) => {
    const CURRENT_BOOKING = useSelector(bookingSelector)
    const [theaterFilmAvailable, setTheaterFilmAvailable] = useState(theater)
    const [listRoomId, setListRoomId] = useState(CURRENT_BOOKING.currentRoomIdArray)

    useEffect(() => {
        let tmpList = []
        listRoomId.forEach(roomId => {
            theaterFilmAvailable.listRoom.forEach((room)=>
            {
                if (roomId == room.id) {
                    tmpList.push(room)
                }
            }) 
        })

        setTheaterFilmAvailable({...theaterFilmAvailable, listRoom: tmpList})
    }, [listRoomId])

    useEffect(() => {
        setListRoomId(CURRENT_BOOKING.currentRoomIdArray)
    }, [CURRENT_BOOKING.currentRoomIdArray])

    useEffect(() => {
        setTheaterFilmAvailable(theater)
    }, [theater])

    useEffect(() => {
        console.log(theaterFilmAvailable)
    }, [theaterFilmAvailable])

    useEffect(() => {
        setTheaterFilmAvailable(theaterFilmAvailable)
    }, [CURRENT_BOOKING.selectedTheater])

    return (
        <Box sx={styles.boxContainer}>
            <h2 style={styles.text}>{theater.name}</h2>
            <p style={styles.text}>{theater.address}</p>
            <p style={styles.text}>Contact: {theater.contact}</p>

            {
                theaterFilmAvailable.listRoom.map((theater, index) => (
                    <TheaterSeat key={index} item={theater} />
                )) 
            }

        </Box>
    )
}

export default RoomItem