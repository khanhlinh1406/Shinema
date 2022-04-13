import React from "react";
import './filmDetails.css'

import { useLocation } from "react-router-dom";

import { Helmet } from 'react-helmet';
import { useParams } from "react-router";
import { useState, useEffect } from "react";

import tmdbApi from "../../api/tmdbApi";
import { movieType, category } from '../../api/tmdbApi'
import apiConfig from "../../api/apiConfig";

import CastList from "../../components/CastList/castList";
import VideoList from "../../components/VideoList/videoList";
import FilmSlider from "../../components/FilmSlider/filmSlider";
import MainNavBar from "../../components/MainNavBar/mainNavBar";

const FilmDetails = () => {

  const {id} = useParams();
  const [film, setFilm] = useState();

  useEffect(() => {
    const getMovie = async () => {
      const params = {
      }

      try {
        const response = await tmdbApi.detail(category.movie, id, { params: params });
        setFilm(response)
      } catch (err) {
        console.log(err)
      }
    }

    getMovie();
  })

  return (
    <div className="film-details">
      {
        film && (
          <>
            <Helmet>
              <title>{film.title || film.name}</title>
            </Helmet>

            <MainNavBar/>
            <div className="banner" style={{
              backgroundImage: `url(${apiConfig.originalImage(film.backdrop_path || film.poster_path)})`
              /// backgroundColor: 'white'
            }}> </div>

            <div className="movie-content">
              <div className="movie-content__poster">
                <div className="movie-content__poster__img" style={{ backgroundImage: `url(${apiConfig.originalImage(film.poster_path)})` }}>

                </div>
              </div>

              <div className="movie-content__info">
                <div className="movie-content__info__title">{film.name || film.title}</div>
                <div className="movie-content__info__genres">
                  {
                    film.genres && film.genres.slice(0, 5).map((genre, i) => (
                      <span key={i} className="movie-content__info__genres__item">
                        {genre.name}
                      </span>
                    ))
                  }
                </div>

                <p className="movie-content__info__overview">{film.overview}</p>

                <div className="movie-content__info__cast">
                  <div className="movie-content__info__cast__section-header">
                    <h2>Diễn viên</h2>
                  </div>
                  <CastList id={film.id} category={category.movie}></CastList>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="section mb-3">
                <VideoList id={film.id} category={category.movie} />
              </div>

              <div className="section mb-3">
                <div className="section__header mb-2">
                  <FilmSlider category={category.movie} typeFilm='similar' id={film.id} ></FilmSlider>
                </div>
              </div>
            </div>
          </>
        )
      }
    </div>


  )
}

export default FilmDetails;