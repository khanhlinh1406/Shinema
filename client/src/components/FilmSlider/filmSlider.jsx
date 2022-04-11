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


const FilmSlider = props => {
    const movie = useSelector(movieSelector)

    const prev = "typeOfFilm__container__content__prev__" + props.typeFilm;
    const next = "typeOfFilm__container__content__next__" + props.typeFilm;

    const [movieItems, setMovieItems] = useState([]);
    const [movieTypes, setMovieTypes] = useState("");

    useEffect(() => {
        const getMovies = async () => {
            const params = {
                page: 1,
            }
            try {
                if (props.typeFilm !== 'similar') {
                    const response = await tmdbApi.getMoviesList(props.typeFilm, { params: params });
                    setMovieItems(response.results.slice(0, 15))
                }
                else {
                    const response = await tmdbApi.similar(props.category, props.id);
                    setMovieItems(response.results.slice(0, 15))
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
    }, []);

    /// useEffect(() => {console.log(movie)}, [movie]);
    return (
        <div className="typeOfFilm__container" id={props.typeFilm}>

            <div className="typeOfFilm__container__header">
                <h3 className="typeOfFilm__container__header__title">
                    {movieTypes}
                </h3>

                <button className="typeOfFilm__container__header__viewMore">Xem thêm</button>
            </div>


            <div className="typeOfFilm__container__content">

                {/* <div >
                    <FaAngleLeft style={{ 
                         cursor: 'pointer',
                         left: 5,
                         width: 30,
                         height: 55,
                         position: 'absolute',
                         zindex: 2,
                         top: 35,
                         borderradius: 40,
                         textalign: 'center',
                    }} color='#ff4820' size={65} className={prev} />
                </div> */}

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
                                <SlideItem item={item} />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>

                {/* <div >
                    <FaAngleRight className={next} size={65} color='#ff4820' 
                     style={{
                        cursor: 'pointer',
                        right: 5,
                        width: 30,
                        height: 55,
                        position: 'absolute',
                        zindex: 2,
                        top: 35,
                        borderradius: 40,
                        textalign: 'center',
                     }}/>
                </div> */}

            </div>

        </div>
    );
}

const SlideItem = props => {
    const item = props.item;
    const background = apiConfig.originalImage(item.poster_path)
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const GoToDetails = () => {
        // dispatch(
        //     movieSlice.actions.addMovie({name: 'ok'})
        // )

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

export default FilmSlider