import React from "react";
import './filmSlider.css'
import { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";

import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

const FilmSlider = ({ typeFilm }) => {

    const [movieItems, setMovieItems] = useState([]);
    const [movieTypes, setMovieTypes] = useState("");

    useEffect(() => {
        const getMovies = async() => {
            const params = {
                page: 1,
            }

            try {
                const response = await tmdbApi.getMoviesList(typeFilm, { params: params });
                setMovieItems(response.results.slice(0, 4))
                console.log("response.results" + response)
            } catch {
                console.log("Film slider error")
            }
        }

        getMovies();

        const getTypes = () =>{
            if (typeFilm == 'popular')
                setMovieTypes('Popular');
            if (typeFilm == 'upcoming')
                setMovieTypes('Upcoming');;
            if (typeFilm == 'top_rated')
               setMovieTypes('Top rated');
        }

        getTypes();
    }, []);

   
    return (
        <div className="typeOfFilm__container">
            <h3 class="typeOfFilm__container__title">
                {movieTypes} 
            </h3>

            <Swiper slidesPerView={4}
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}>

                    {
                        movieItems.map((item, i)=>{
                            <SwiperSlide key={i}>
                                <SlideItem item = {item}/>
                            </SwiperSlide>
                        })
                    }

            </Swiper>

        </div>

    )
}

const SlideItem = props => {
    const item = props.item;
    const background = apiConfig.originalImage(item.poster_path)

    return(       
        <div class="typeOfFilm__item__container">
            <img class = "typeOfFilm__item__container__img" src={background} alt={item.title}/>
            <label class = "typeOfFilm__item__container__title">{item.title}</label>
        </div>
    )
}

export default FilmSlider