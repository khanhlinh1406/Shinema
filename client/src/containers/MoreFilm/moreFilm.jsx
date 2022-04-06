import React from "react";
import './moreFilm.css'
import { useState, useEffect } from "react";

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

import MainNavBar from "../../components/MainNavBar/mainNavBar"
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from "@mui/material/colors";


const MoreFilm = () => {
    const url = new URLSearchParams(window.location.search);
    const type = url.get("type");
    const category = 'movie';

    const movie = useSelector(movieSelector)

    const [loadMore, setLoadMore] = useState(false);
    const [movieItems, setMovieItems] = useState([]);
    const [movieTypes, setMovieTypes] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();

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
                if (type !== 'similar') {
                    const response = await tmdbApi.getMoviesList(type, { params: params });
                    ///setMovieItems(response.results.slice(0, page))
                    /// setMovieItems(response.results)
                    ///const updateMovieItems = [...movieItems, ...response.results];

                    setMovieItems([...movieItems, ...response.results])

                    console.log(movieItems)
                }
                // else {
                //     const response = await tmdbApi.similar(category, props.id);
                //     ///setMovieItems(response.results.slice(0, page))
                //     ///setMovieItems([...movieItems, ...response.results])

                // }
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
                if (type !== 'similar') {
                    const response = await tmdbApi.getMoviesList(type, { params: params });
                    setMovieItems(response.results)
                    ///setMovieItems(response.results)
                    setTotalPages(response.total_pages)
                }
                // else {
                //     const response = await tmdbApi.similar(category, props.id);
                //     setMovieItems(response.results.slice(0, NUM_FILM_LOADING))
                //     ///setMovieItems(response.results)
                //     setTotalPages(response.total_pages)
                // }
            } catch {
                console.log("Film slider error")
            }
        }

        getMovies();

        const getTypes = () => {
            if (type === movieType.popular)
                setMovieTypes('Phổ biến');
            if (type === movieType.upcoming)
                setMovieTypes('Sắp chiếu');;
            if (type === movieType.top_rated)
                setMovieTypes('Đánh giá cao');
            if (type === 'similar') {
                setMovieTypes('Tương tự')
            }
        }

        getTypes();
    }, []);

    return (
        <div className="container">
            <MainNavBar/>
            <div className="filter"></div>

            <div className="film__container" id={type}>
                <div className="film__container__header">
                    <h3 className="film__container__header__title">
                        {movieTypes}
                    </h3>
                </div>

                <div className="film__container__content">
                    <div className="film__container__view-more-content">
                        <div className="film__container__view-more-content-list">
                            {
                                movieItems.map((item, i) => (
                                    <SlideItem item={item} key={i} />
                                ))
                            }
                        </div>
                        {page <= totalPages ? (
                            <ViewMoreButton onClick={openMoreHandler}></ViewMoreButton>
                        ) : (<></>)
                        }
                    </div>

                </div>

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
        <div className="film__item__container" onClick={GoToDetails}>
            <div className="film__item__container__hoverItem">
                <button className="film__item__container__hoverItem__buyTicketBtn">Đặt vé</button>

            </div>
            <img className="film__item__container__img" src={background} alt={item.title} />
            <label className="film__item__container__title">{item.title}</label>
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
        <div className='film__container__content__viewMore'>
            <ThemeProvider theme={btnTheme} >
                <Button sx={{ paddingX: 5, paddingY: 0.8 }} variant="outlined" onClick={props.onClick} >Xem thêm</Button>
            </ThemeProvider>
        </div >
    )
}


export default MoreFilm