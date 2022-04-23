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


const NUM_FILM_LOADING = 8;

const FilmSlider = props => {
    const movie = useSelector(movieSelector)

    const [loadMore, setLoadMore] = useState(false);
    const [movieItems, setMovieItems] = useState([]);
    const [movieTypes, setMovieTypes] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();

    const [viewMoreVisible, setViewMoreVisible] = useState(true)

    const openMoreHandler = async () => {
        setLoadMore(true);

        const getMovies = async () => {

            // console.log("total page " + totalPages)
            // console.log('page now ' + page)

            if (page + 1 > totalPages) {
                setPage(totalPages)
            } else
                setPage(page + 1);

            const params = { page: page }

            try {
                if (props.typeFilm !== 'similar') {
                    const response = await tmdbApi.getMoviesList(props.typeFilm, { params: params });
                    ///setMovieItems(response.results.slice(0, page))
                    /// setMovieItems(response.results)
                    ///const updateMovieItems = [...movieItems, ...response.results];

                    setMovieItems([...movieItems, ...response.results])

                    ///console.log(movieItems)
                }
                else {
                    const response = await tmdbApi.similar(props.category, props.id);

                    ///setMovieItems(response.results.slice(0, page))
                    ///setMovieItems([...movieItems, ...response.results])

                }
            } catch {
                console.log("Film slider error")
            }
        }

        if (page < totalPages)
            await getMovies();



    }

    useEffect(() => {
        const getMovies = async () => {
            const params = {
                page: page
            }
            try {
                if (props.typeFilm !== 'similar') {
                    const response = await tmdbApi.getMoviesList(props.typeFilm, { params: params });
                    setMovieItems(response.results.slice(0, NUM_FILM_LOADING))
                    setTotalPages(response.total_pages)
                }
                else {
                    const response = await tmdbApi.similar(props.category, props.id);
                    setMovieItems(response.results.slice(0, NUM_FILM_LOADING))
                    setTotalPages(response.total_pages)
                    setViewMoreVisible(false)
                }
            } catch {
                console.log("Film slider error")
            }
        }

        getMovies();

        const getTypes = () => {
            if (props.typeFilm === movieType.popular)
                setMovieTypes('Popular');
            if (props.typeFilm === movieType.upcoming)
                setMovieTypes('Upcoming');;
            if (props.typeFilm === movieType.top_rated)
                setMovieTypes('Top rated');
            if (props.typeFilm == 'similar') {
                setMovieTypes('Similar')
            }
        }

        getTypes();
    }, [props]);

    return (
        <div className="typeOfFilm__container" id={props.typeFilm}>

            <div className="typeOfFilm__container__header">
                <h3 className="typeOfFilm__container__header__title">
                    {movieTypes}
                </h3>


            </div>


            <div className="typeOfFilm__container__content">
                {viewMoreVisible &&
                    <ViewMoreButton typeFilm={props.typeFilm}></ViewMoreButton>
                }
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

            </div>
        </div>
    );
}

const SlideItem = props => {
    const item = props.item;
    const background = apiConfig.originalImage(item.backdrop_path ? item.poster_path : item.backdrop_path)
    // const dispatch = useDispatch();
    // const data = useSelector(movieSelector)
    const navigate = useNavigate();

    const openBooking = ()=>{
        navigate(`/booking/${props.item.id}`)
    }

    const GoToDetails = () => {
        // dispatch(
        //     movieSlice.actions.addMovie({name: 'ccccccc'})
        // )

        // console.log(data.movie)

        const params = { category: 'movie', id: props.item.id }
        navigate(`/filmDetails/${props.item.id}`);
    }
    return (
        <div className="typeOfFilm__item__container" >
            <div className="typeOfFilm__item__container__hoverItem">
                <button className="typeOfFilm__item__container__hoverItem__buyTicketBtn" onClick={openBooking}>Booking</button>

            </div>
            <img className="typeOfFilm__item__container__img" src={background} alt={item.title} onClick={GoToDetails}/>
            <label className="typeOfFilm__item__container__title" onClick={GoToDetails}>{item.title}</label>
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

    const navigate = useNavigate();

    const onClick = () => {

        navigate(`/corner/movie/${props.typeFilm}`);
    }

    return (
        <div className='typeOfFilm__container__content__viewMore'>
            <ThemeProvider theme={btnTheme} >
                <Button sx={{ paddingX: 5, paddingY: 0.8 }} variant="outlined" onClick={onClick} >View more</Button>
            </ThemeProvider>
        </div >
    )
}

// export const ViewMoreButton2 = (props) => {
//     const btnTheme = createTheme({
//         shape: {
//             borderRadius: 20
//         },
//         palette: {
//             primary: {
//                 main: '#fff',
//                 outline: '#fff',
//             }
//         },
//     })

//     return (
//         <div className='typeOfFilm__container__content__viewMore2'>
//             <ThemeProvider theme={btnTheme} >
//                 <Button sx={{ paddingX: 5, paddingY: 0.8 }} variant="outlined" onClick={props.onClick} >Xem thêm</Button>
//             </ThemeProvider>
//         </div >
//     )
// }

export default FilmSlider