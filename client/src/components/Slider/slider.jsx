import React from "react";
import './slider.css'
import { useState, useEffect } from 'react'

import SwiperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";

import AccountApi from '../../api/accountApi'
import tmdbApi, { category, movieType } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";


const Slider = () => {
    SwiperCore.use([Autoplay]);

    const [movieItems, setMovieItems] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const params = { page: 1 }
            try {
                const response = await tmdbApi.getMoviesList(movieType.popular, { params });
                setMovieItems(response.results.slice(0, 4));
                console.log(response);
            } catch {
                console.log('error');
            }
        }
        getMovies();
    }, []);

    return (
        <div className="slide__container">
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
            //autoplay={{ delay: 3000 }}

            >
                {
                    movieItems.map((item, i) => (
                        <SwiperSlide key={i}>
                            <SlideItem item={item} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>

        </div>
    );
}

const SlideItem = props => {
    const item = props.item
    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path)

    return (
        <div className="slide__item"
            style={{ backgroundImage: `url(${background})` }}
        >

            <div className="slide__item__contain">
                <div className="slide__item__content__info">
                    <h2 className="title">{item.title}</h2>
                    <div className="overview">{item.overview}</div>
                    <div>
                        <button>Xem trailer</button>
                        <button>Đặt vé</button>
                    </div>
                </div>

                <img className="slider__item__content__poster" src={apiConfig.originalImage(item.poster_path)} alt="" />

            </div>
        </div>
    )
}

export default Slider;