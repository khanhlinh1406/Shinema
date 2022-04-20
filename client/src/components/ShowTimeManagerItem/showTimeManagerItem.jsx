import * as React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import apiConfig from "../../api/apiConfig";
import styles from './styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const ShowTimeManagerItem = ({ item }) => {
    const poster = apiConfig.originalImage(item.film.backdrop_path ? item.film.poster_path : item.film.backdrop_path)
    return (
        <Box sx={styles.boxContainer}>
            <div style={{
                backgroundImage: `url(${poster})`,
                display: 'flex',
                height: 500,
                width: 350,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                borderRadius: 20,
                boxShadow: 5,
                marginLeft: 10,
                position: 'absolute'
            }} />

            <div >

                <Box sx={styles.container}>
                    <p style={{ color: 'white', fontSize: 18, fontStyle: 'italic' }}>{item.film.runtime} minutes</p>

                    <h1 style={{ color: 'white', fontSize: 45, }}>{item.film.title}</h1>
                    <p style={{ color: 'white', }}>{item.film.overview}</p>

                    <Grid sx={{ paddingLeft: 0, paddingTop: 7 }} container spacing={{ md: 1 }} >

                        {item.listDateTime[0].times.map((_, index) => (
                            <Grid item key={index} sx={{ minWidth: 80 }}>
                                <Item>{item.listDateTime[0].times[index]}</Item>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </div>
        </Box >
    )
}



export default ShowTimeManagerItem