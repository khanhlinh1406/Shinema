import React, {useState, useEffect} from 'react';
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
}));

function FormRow({ row }) {
    return (
        <React.Fragment>
            {row.map((item, index) => (
                <Grid item xs={1} key={index}>
                    <Item>{item}</Item>
                </Grid>
            ))}

        </React.Fragment>
    );
}




const TheaterSeat = ({ item }) => {
    const [bookedSeats, setBookedSeats] = useState([])
    const CURRENT_BOOKING = useSelector(bookingSelector)
    useEffect(async() =>{
        const getBookedSeats = async() =>
        {
            await TicketApi.getBookedSeats(
                CURRENT_BOOKING.selectedTheater._id,
                item.id,
                CURRENT_BOOKING.selectedDate,
                CURRENT_BOOKING.selectedTime
            )
            .then(res=>{
                console.log(res)
                setBookedSeats(res.data)
            })
            .catch(err => console.log(err))
        }

        await getBookedSeats()
    }, [])

    useEffect(() => {
        console.log('hhh')
        console.log(bookedSeats)
    },[bookedSeats])

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
                        <FormRow row={row} />
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