import React from "react";
import './filmSlider.css'
import { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/navigation"
import { Pagination, FreeMode, Navigation } from "swiper";

import tmdbApi from "../../api/tmdbApi";
import { movieType } from '../../api/tmdbApi'
import apiConfig from "../../api/apiConfig";

import { createSearchParams } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
// import { add, update, remove } from "../../redux/actions/movieAction"
// import { MovieReducer } from '../../redux/slices/movieSlice';

import { useNavigate } from "react-router";

import { movieSelector } from "../../redux/selector";

import { movieSlice } from "../../redux/slices/movieSlice";


import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from "@mui/material/colors";


const NUM_FILM_LOADING = 5;

const FilmSlider = props => {
    const movie = useSelector(movieSelector)

    const prev = "typeOfFilm__container__content__prev__" + props.typeFilm;
    const next = "typeOfFilm__container__content__next__" + props.typeFilm;

    const [loadMore, setLoadMore] = useState(false);
    const [movieItems, setMovieItems] = useState([]);
    const [movieTypes, setMovieTypes] = useState("");
    const [page, setPage] = useState(5);
    const [totalPages, setTotalPages] = useState();

    const openMoreHandler = () => {
        setLoadMore(true);

        const getMovies = async () => {
            const params = {}

            if (page + NUM_FILM_LOADING > totalPages) {
                setPage(totalPages)
            } else
                setPage(page + NUM_FILM_LOADING);
                
            try {
                if (props.typeFilm !== 'similar') {
                    const response = await tmdbApi.getMoviesList(props.typeFilm, { params: params });
                    setMovieItems(response.results.slice(0, page))

                }
                else {
                    const response = await tmdbApi.similar(props.category, props.id);
                    setMovieItems(response.results.slice(0, page))

                }
            } catch {
                console.log("Film slider error")
            }
        }

        if (page < totalPages)
            getMovies();

    }

    useEffect(() => {
        const getMovies = async () => {
            const params = {
            }
            try {
                if (props.typeFilm !== 'similar') {
                    const response = await tmdbApi.getMoviesList(props.typeFilm, { params: params });
                    setMovieItems(response.results.slice(0, page))
                    setTotalPages(response.total_pages)
                }
                else {
                    const response = await tmdbApi.similar(props.category, props.id);
                    setMovieItems(response.results.slice(0, page))
                    setTotalPages(response.total_pages)
                }
            } catch {
                console.log("Film slider error")
            }
        }

        getMovies();

        const getTypes = () => {
            if (props.typeFilm === movieType.popular)
                setMovieTypes('Phổ biến');
            if (props.typeFilm === movieType.upcoming)
                setMovieTypes('Sắp chiếu');;
            if (props.typeFilm === movieType.top_rated)
                setMovieTypes('Đánh giá cao');
            if (props.typeFilm == 'similar') {
                setMovieTypes('Tương tự')
            }
        }

        getTypes();
    }, [props, page]);



    /// useEffect(() => {console.log(movie)}, [movie]);
    return (
        <div className="typeOfFilm__container" id={props.typeFilm}>

            <div className="typeOfFilm__container__header">
                <h3 className="typeOfFilm__container__header__title">
                    {movieTypes}
                </h3>


            </div>

            {!loadMore ? (
                <div className="typeOfFilm__container__content">
                    {/* <button className="typeOfFilm__container__content__viewMore">Xem thêm</button> */}

                    <ViewMoreButton onClick={openMoreHandler}></ViewMoreButton>
                    <Swiper className="typeOfFilm__container__content__swiper"
                        slidesPerView={5}
                        centeredSlides={true}
                        // pagination={{
                        //     clickable: true,
                        // }}
                        loop
                        freeMode
                        // navigation={{
                        //     nextEl: {next},
                        //     prevEl: {prev}
                        // }}

                        // navigation
                        modules={[Pagination, Navigation, FreeMode]}
                    >
                        {
                            movieItems.map((item, i) => (
                                <SwiperSlide key={i}>
                                    <SlideItem item={item}
                                    />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>

                </div>)
                :
                (
                    <div className="typeOfFilm__container__view-more-content">
                        <div className="typeOfFilm__container__view-more-content-list">
                            {
                                movieItems.map((item, i) => (
                                    <SlideItem item={item} key={i} />
                                ))
                            }
                        </div>
                        {page < totalPages ? (
                            <ViewMoreButton2 onClick={openMoreHandler}></ViewMoreButton2>
                        ) : (<></>)
                        }
                    </div>
                )
            }

        </div>
    );
}

const SlideItem = props => {
    const item = props.item;
    const background = apiConfig.originalImage(item.poster_path)
    // const dispatch = useDispatch();
    // const data = useSelector(movieSelector)
    const navigate = useNavigate();

    const GoToDetails = () => {
        // dispatch(
        //     movieSlice.actions.addMovie({name: 'ccccccc'})
        // )

        // console.log(data.movie)

        const params = { category: 'movie', id: props.item.id }
        navigate({
            pathname: '/filmDetails',
            search: `?${createSearchParams(params)}`
        });
    }
    return (
        <div className="typeOfFilm__item__container" onClick={GoToDetails}>
            <div className="typeOfFilm__item__container__hoverItem">
                <button className="typeOfFilm__item__container__hoverItem__buyTicketBtn">Đặt vé</button>

            </div>
            <img className="typeOfFilm__item__container__img" src={background} alt={item.title} />
            <label className="typeOfFilm__item__container__title">{item.title}</label>
        </div>
    )
}



export const ViewMoreButton = (props) => {
    const btnTheme = createTheme({
        shape: {
            borderRadius: 20
        },
        palette: {
            primary: {
                main: '#fff',
                outline: '#fff',
            }
        },
    })

    return (
        <div className='typeOfFilm__container__content__viewMore'>
            <ThemeProvider theme={btnTheme} >
                <Button sx={{ paddingX: 5, paddingY: 0.8 }} variant="outlined" onClick={props.onClick} >Xem thêm</Button>
            </ThemeProvider>
        </div >
    )
}

export const ViewMoreButton2 = (props) => {
    const btnTheme = createTheme({
        shape: {
            borderRadius: 20
        },
        palette: {
            primary: {
                main: '#fff',
                outline: '#fff',
            }
        },
    })

    return (
        <div className='typeOfFilm__container__content__viewMore2'>
            <ThemeProvider theme={btnTheme} >
                <Button sx={{ paddingX: 5, paddingY: 0.8 }} variant="outlined" onClick={props.onClick} >Xem thêm</Button>
            </ThemeProvider>
        </div >
    )
}

export default FilmSlider