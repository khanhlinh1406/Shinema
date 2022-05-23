import React, { useEffect, useState } from 'react'
import tmdbApi from "../../../api/tmdbApi"
import apiConfig from "../../../api/apiConfig";
import { movieType, category } from '../../../api/tmdbApi'

import { useNavigate, Link } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


const ReviewItem = ({ item }) => {

    let navigate = useNavigate();
    const LIMIT_CONTENT_LENGTH = 130
    const [film, setFilm] = useState()
    const [img, setImg] = useState()

    const [content, setContent] = useState()

    const onClickHandle = () => {
        navigate('/reviews/detail/' + item._id)
    }

    useEffect(() => {
        const getMovie = async () => {
            const params = {
            }

            try {
                const response = await tmdbApi.detail(category.movie, item._filmId, { params: params });
                setFilm(response)
                setImg(apiConfig.originalImage(response.backdrop_path ? response.backdrop_path : response.poster_path))

                if (item.pilot.length < LIMIT_CONTENT_LENGTH) {
                    setContent(item.pilot)
                }
                else {
                    const toShow = item.pilot.substring(0, LIMIT_CONTENT_LENGTH) + "...";
                    setContent(toShow)
                }

            } catch (err) {
                console.log(err)
            }
        }

        getMovie();
    }, [])
    return (
        <Card sx={{ maxWidth: 345, minHeight: 400, backgroundColor: 'rgb(9, 24, 48)' }}>
            <CardActionArea onClick={() => onClickHandle()}>
                {img &&
                    <CardMedia
                        component="img"
                        height="200"
                        image={img}
                        alt="green iguana"
                    />}

                <CardContent>

                    <Typography gutterBottom variant="h5" component="div" sx={{ color: "#fff", fontWeight: 'bold' }}>
                        {item.title}
                    </Typography>
                    <div style={{ width: '40%', height: "2px", backgroundColor: '#c62828', marginTop: '10px', marginBottom: '5px' }}></div>
                    <Typography variant="body2" color="text.secondary" sx={{ color: "rgb(203, 203, 203" }}>
                        {content}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default ReviewItem