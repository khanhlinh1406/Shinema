import * as React from 'react';
import styles from './styles'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

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