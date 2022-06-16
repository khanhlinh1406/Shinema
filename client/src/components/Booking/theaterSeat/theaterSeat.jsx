import React, { useState, useEffect } from 'react';
import styles from './styles'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TicketApi from './../../../api/ticketApi';
import { bookingSelector } from '../../../redux/selector'
import { bookingSlice } from '../../../redux/slices/bookingSlice'
import { useSelector, useDispatch } from 'react-redux';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    cursor: 'pointer'
}));

const BookedItem = styled(Paper)(({ theme }) => ({
    backgroundColor: '#07162b',
    border: '1px solid #fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: '#fff',
}));

const ChooseItem = styled(Paper)(({ theme }) => ({
    backgroundColor: '#eb4034',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 'bold',
}));

const FormRow = ({ row, list, room }) => {
    const CURRENT_BOOKING = useSelector(bookingSelector)
    const dispatch = useDispatch()

    console.log('------------')
    console.log(row)
    console.log(list)
    console.log(room)

    // if (CURRENT_BOOKING.selectedRoom !== room.id) {
    //     dispatch(bookingSlice.actions.setSelectedRoom(room.id))
    //     dispatch(bookingSlice.actions.setChosenSeats([]))
    // }

    const [chosenSeats, setChosenSeats] = useState(CURRENT_BOOKING.selectedSeats)
    const chooseSeats = (item) => {
        if (CURRENT_BOOKING.selectedRoom !== room.id) {
            dispatch(bookingSlice.actions.setSelectedRoom(room.id))
            dispatch(bookingSlice.actions.setSelectedSeats([]))
        }
        if (list.includes(item)) { return; }

        if (CURRENT_BOOKING.selectedSeats.length > 0) {
            if (CURRENT_BOOKING.selectedSeats.includes(item)) {
                dispatch(bookingSlice.actions.setSelectedSeats(
                    CURRENT_BOOKING.selectedSeats.filter((e) => { return e != item })
                ))
            }
            else
                dispatch(bookingSlice.actions.pushSelectedSeats(item))
        }
        else {
            dispatch(bookingSlice.actions.pushSelectedSeats(item))
        }
    }

    useEffect(() => {
        if (room.id === CURRENT_BOOKING.selectedRoom)
            setChosenSeats(CURRENT_BOOKING.selectedSeats)
        else setChosenSeats([])
    }, [CURRENT_BOOKING.selectedSeats])


    return (
        <React.Fragment>
            {row.map((item, index) => (
                <Grid item xs={1} key={index}>
                    {
                        list.includes(item) ?
                         <BookedItem >{item}</BookedItem>
                            :
                            (!chosenSeats.includes(item) ?
                                <Item onClick={() => chooseSeats(item)}>{item}</Item>
                                : <ChooseItem onClick={() => chooseSeats(item)}>{item}</ChooseItem>)
                    }
                </Grid>
            ))}

        </React.Fragment>
    );
}




const TheaterSeat = ({ item }) => {
    const [bookedSeats, setBookedSeats] = useState([])
    const CURRENT_BOOKING = useSelector(bookingSelector)
    useEffect(async () => {
        const getBookedSeats = async () => {
            // console.log(CURRENT_BOOKING.selectedTheater._id)
            // console.log(item.id)
            // console.log(CURRENT_BOOKING.selectedDate)
            // console.log(CURRENT_BOOKING.selectedTime)

            await TicketApi.getBookedSeats(
                CURRENT_BOOKING.selectedTheater._id,
                item.id,
                CURRENT_BOOKING.selectedDate,
                CURRENT_BOOKING.selectedTime
            )
                .then((res) => {
                    setBookedSeats(res.data)
                })
                .catch(err => console.log(err))
        }

        await getBookedSeats()
    },[item])

    return (
        <Box sx={styles.boxContainer}>
            <p style={styles.text}>{item.name}</p>
            <div style={{
                backgroundColor: '#b71c1c',
                height: 5,
                width: '100%',
                marginTop: 5,
                marginBottom: 10,
                borderBottomRightRadius: 5,
                borderBottomLeftRadius: 5,
            }} />
            <p style={{ color: '#fff', marginBottom: 30 }}>Screen</p>

            <Grid container spacing={1}>
                {item.listSeat.map((row, index) => (
                    <Grid container item spacing={3} key={index}>
                        <FormRow row={row} list={bookedSeats} room={item} />
                    </Grid>
                ))}

            </Grid>

            <div style={{
                backgroundColor: '#cfcfcf',
                height: 0.5,
                width: '105%',
                marginTop: 10,
                marginBottom: 10,

            }} />
        </Box>
    )
}
export default TheaterSeat