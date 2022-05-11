import React from 'react'

import Box from '@mui/material/Box';

import TheaterSeat from '../theaterSeat/theaterSeat';

import styles from './styles'

const RoomItem = ({ item }) => {
    return (
        <Box sx={styles.boxContainer}>
            <h2 style={styles.text}>{item.name}</h2>
            <p style={styles.text}>{item.address}</p>
            <p style={styles.text}>Contact: {item.contact}</p>

            {
                item.listRoom.map((item, index) => (
                    <TheaterSeat key={index} item={item} />
                ))
            }

        </Box>
    )
}
export default RoomItem