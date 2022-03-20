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

import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

const FilmSlider = ({ typeFilm }) => {

    const [movieItems, setMovieItems] = useState([]);
    const [movieTypes, setMovieTypes] = useState("");

    useEffect(() => {
        const getMovies = async () => {
            const params = {
                page: 1,
            }
            try {
                const response = await tmdbApi.getMoviesList(typeFilm, { params: params });
                setMovieItems(response.results.slice(0, 15))
                console.log(response)
            } catch {
                console.log("Film slider error")
            }
        }

        getMovies();

        const getTypes = () => {
            if (typeFilm === movieType.popular)
                setMovieTypes('Phổ biến');
            if (typeFilm === movieType.upcoming)
                setMovieTypes('Sắp chiếu');;
            if (typeFilm === movieType.top_rated)
                setMovieTypes('Đánh giá cao');
        }

        getTypes();
    }, []);

    return (
        <div className="typeOfFilm__container">

            <div className="typeOfFilm__container__header">
                <h3 className="typeOfFilm__container__header__title">
                    {movieTypes}
                </h3>

                <button className="typeOfFilm__container__header__viewMore">Xem thêm</button>
            </div>


            <div className="typeOfFilm__container__content">

                <div >
                    <FaAngleLeft className="typeOfFilm__container__content__prev" color='#ff4820' size={65}/>
                </div>

                <Swiper className="typeOfFilm__container__content__swiper"
                    slidesPerView={5}
                    centeredSlides={true}
                    // pagination={{
                    //     clickable: true,
                    // }}
                    loop
                    freeMode
                    navigation={{
                        nextEl: '.typeOfFilm__container__content__next',
                        prevEl: '.typeOfFilm__container__content__prev'
                    }
                    }

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

                <div >
                    <FaAngleRight className="typeOfFilm__container__content__next" size={65} color='#ff4820'/>
                </div>

            </div>

        </div>
    );
}

const SlideItem = props => {
    const item = props.item;
    const background = apiConfig.originalImage(item.poster_path)

    return (
        <div className="typeOfFilm__item__container">
            <img className="typeOfFilm__item__container__img" src={background} alt={item.title} />
            <label className="typeOfFilm__item__container__title">{item.title}</label>
        </div>
    )
}

export default FilmSlider