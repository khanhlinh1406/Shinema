import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import ReviewApi from './../../../api/reviewApi';

import CastList from "../../../components/CastList/castList";

import tmdbApi from "../../../api/tmdbApi"
import apiConfig from "../../../api/apiConfig";
import { movieType, category } from '../../../api/tmdbApi'

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { Typography } from "@mui/material";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const ReviewDetail = () => {
    const { reviewId } = useParams();

    const [reviewIns, setReviewIns] = useState()
    const [filmIns, setFilmIns] = useState()

    useEffect(() => {
        ReviewApi.getById(reviewId).then(res => {
            if (res.status == 200) {
                console.log(res)
                setReviewIns(res.data)
            }
        }).catch(err => console.log(err))

    }, [reviewId])

    useEffect(() => {

        if (reviewIns) {
            const getMovie = async () => {
                const params = {
                }

                try {
                    const response = await tmdbApi.detail(category.movie, reviewIns._filmId, { params: params });
                    console.log(response)
                    setFilmIns(response)
                    //setImg(apiConfig.originalImage(response.backdrop_path ? response.backdrop_path : response.poster_path))            

                } catch (err) {
                    console.log(err)
                }
            }

            getMovie()
        }

    }, [reviewIns])

    return (
        <div className="film-details">
            {
                filmIns && (
                    <>
                        <Helmet>
                            <title>{filmIns.title || filmIns.name}</title>
                        </Helmet>

                        <div className="banner" style={{
                            backgroundImage: `url(${apiConfig.originalImage(filmIns.backdrop_path || filmIns.poster_path)})`
                            /// backgroundColor: 'white'
                        }}> </div>

                        <div className="movie-content">
                            <div className="movie-content__poster">
                                <div className="movie-content__poster__img" style={{ backgroundImage: `url(${apiConfig.originalImage(filmIns.poster_path)})` }}>
                                </div>
                            </div>


                            <div className="movie-content__info">
                                <div className="movie-content__info__title">{filmIns.name || filmIns.title}</div>
                                <div className="movie-content__info__duration">{filmIns.runtime} minutes</div>
                                <div className="movie-content__info__genres">
                                    {
                                        filmIns.genres && filmIns.genres.slice(0, 5).map((genre, i) => (
                                            <span key={i} className="movie-content__info__genres__item">
                                                {genre.name}
                                            </span>
                                        ))
                                    }
                                </div>

                                <p className="movie-content__info__overview">{filmIns.overview}</p>

                                <div className="movie-content__info__cast">
                                    <div className="movie-content__info__cast__section-header">
                                        <h2>Actors</h2>
                                    </div>
                                    <CastList id={filmIns.id} category={category.movie}></CastList>
                                </div>
                            </div>
                        </div>

                    </>
                )
            }
        </div>
    )
}

export default ReviewDetail