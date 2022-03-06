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
        <div className="slide_container">
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
                            {({ isActive }) => (
                                <img className="slide_item" src={apiConfig.originalImage(item.backdrop_path)} />
                            )}
                        </SwiperSlide>
                    ))
                }
            </Swiper>

        </div>
    );
}

export default Slider;