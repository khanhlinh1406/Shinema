import * as React from 'react';
import styles from './styles'

import Box from '@mui/material/Box';

import TheaterRoom from '../TheaterRoom/theaterRoom';

const TheaterManagerItem = ({ item }) => {
    return (
        <Box sx={styles.boxContainer}>
            <h2 style={styles.text}>{item.name}</h2>
            <p style={styles.text}>{item.address}</p>
            <p style={styles.text}>Contact: {item.contact}</p>

            {
                item.listRoom.map((item, index) => (
                    <TheaterRoom key={index} item={item} />
                ))
            }

        </Box>
    )
}
export default TheaterManagerItem