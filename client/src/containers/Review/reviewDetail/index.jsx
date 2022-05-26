import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import ReviewApi from './../../../api/reviewApi';
import AccountApi from './../../../api/accountApi';

import CastList from "../../../components/CastList/castList";

import tmdbApi from "../../../api/tmdbApi"
import apiConfig from "../../../api/apiConfig";
import { movieType, category } from '../../../api/tmdbApi'

import Grid from '@mui/material/Grid';
import { Typography } from "@mui/material";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const ReviewDetail = () => {
    const { reviewId } = useParams();

    const [reviewIns, setReviewIns] = useState()
    const [filmIns, setFilmIns] = useState()

    useEffect(() => {
        ReviewApi.getById(reviewId).then(res => {
            if (res.status == 200) {
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

                        <Content item={reviewIns} />
                    </>
                )
            }
        </div>
    )
}

const Content = ({ item }) => {
    return (
        <div style={{ margin: '0 160px', paddingBottom: "20px" }}>
            <Typography variant="h3" sx={{ marginTop: '10px' }}>{item.title}</Typography>

            <Typography sx={{ fontWeight: 'lighter' }}>{item.overview}</Typography>

            <Typography sx={{ fontWeight: 'bold', marginTop: '20px', fontSize: '23px' }}>Advantage</Typography>
            <Typography sx={{ fontWeight: 'lighter' }}>{item.advantage}</Typography>

            <Typography sx={{ fontWeight: 'bold', marginTop: '10px', fontSize: '23px' }}>Defect</Typography>
            <Typography sx={{ fontWeight: '1' }}>{item.defect}</Typography>

            <Typography sx={{ fontWeight: 'bold', marginTop: '10px', fontSize: '23px' }}>Overview</Typography>
            <Typography>{item.overview}</Typography>

            <ListComment data={item.listComments} />
        </div>
    )
}

const ListComment = ({ data }) => {
    const [listCmt, setListCmt] = useState()
    useEffect(() => {
        let listObjCtm = []

        data.map((item, index) => (
            AccountApi.getById(item._userId).then(res => {
                let objCmt = { ...item, user: res.data }
                listObjCtm.push(objCmt)
                if (index == data.length - 1) setListCmt(listObjCtm)
            }).catch(err => console.log(err))
        ))

    }, [])

    useEffect(() => {
        console.log(listCmt)
    }, [listCmt])
    return (
        <Stack>
            {
                listCmt.map((item, index) => (
                    <CmtItem item={item} />
                ))
            }
        </Stack>
    )
}

const CmtItem = ({ item }) => {

    return (
        <Stack>
            <Stack direction='row' sx={{ alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: "#FF4820" }}>{item.user.name.charAt(0)}</Avatar>
                <Typography sx={{ marginLeft: 2 }}>{item.user.name}</Typography>
                <Typography sx={{ marginLeft: 2 }}>{item.user.time}</Typography>
            </Stack>

            <Typography sx={{ marginLeft: 2 }}>{item.message}</Typography>
        </Stack>
    )
}

export default ReviewDetail