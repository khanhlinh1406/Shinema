import React from "react";
import './filmDetails.css'

import { useLocation } from "react-router-dom";

import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";

import tmdbApi from "../../api/tmdbApi";
import { movieType, category } from '../../api/tmdbApi'
import apiConfig from "../../api/apiConfig";
import ShowTimeApi from "../../api/showTimeApi";
import mFunction from "../../function";

import CastList from "../../components/CastList/castList";
import VideoList from "../../components/VideoList/videoList";
import FilmSlider from "../../components/FilmSlider/filmSlider";
import MainNavBar from "../../components/MainNavBar/mainNavBar";

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red } from '@mui/material/colors'

import format from 'date-fns/format'
import { useSelector } from 'react-redux';

const FilmDetails = () => {

  const { id } = useParams();
  const [film, setFilm] = useState();
  const [showTimeList, setShowTimeList] = useState([]);
  const [dateArray, setDateArray] = useState([])
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

    const fetchShowTimeByFilmId = async () => {
      await ShowTimeApi.getByFilmId(id)
        .then(res => {
          setShowTimeList(res.data)
        })

    }

    fetchShowTimeByFilmId()
  }, [])

  useEffect(() => {

    const getDate = async () => {
      let day = new Date().getDate()
      let month = new Date().getMonth()
      let year = new Date().getFullYear()

      let current = month + "/" + day + "/" + year

      await showTimeList.forEach((showTime) => {
        showTime.listDateTime.forEach((object) => {
          console.log(object.date)
          if (mFunction.subDate(object.date, current) >= 1)
            dateArray.push(object.date)
          setDateArray([...dateArray, object.date])
        })
      })

      setDateArray(mFunction.removeDuplicates(dateArray));
    }

    getDate();
  }, [showTimeList])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  return (
    <div className="film-details">
      {
        film && (
          <>
            <Helmet>
              <title>{film.title || film.name}</title>
            </Helmet>

            <MainNavBar />
            <div className="banner" style={{
              backgroundImage: `url(${apiConfig.originalImage(film.backdrop_path || film.poster_path)})`
              /// backgroundColor: 'white'
            }}> </div>

            <div className="movie-content">
              <div className="movie-content__poster">
                <div className="movie-content__poster__img" style={{ backgroundImage: `url(${apiConfig.originalImage(film.poster_path)})` }}>
                </div>

                {
                  dateArray.length > 0 &&
                  <div className="movie-content__booking">
                    <Box textAlign="center">
                      <BookingBtn id={id} />
                    </Box>
                  </div>
                }

              </div>


              <div className="movie-content__info">
                <div className="movie-content__info__title">{film.name || film.title}</div>
                <div className="movie-content__info__duration">{film.runtime} minutes</div>
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
                    <h2>Actors</h2>
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


export const BookingBtn = (props) => {
  const _currentUser = useSelector(state => state.users.instance)
  const btnTheme = createTheme({
    shape: {
      borderRadius: 20
    },
    palette: {
      primary: red
    },
  })

  const navigate = useNavigate();

  const onClick = () => {
    if (_currentUser == "")
      navigate('/login')
    else
    navigate(`/booking/${props.id}`);
  }

  return (
    <div>
      <ThemeProvider theme={btnTheme} >
        <Button sx={{ paddingX: 5, paddingY: 0.8 }} variant="contained" onClick={onClick} >BOOKING NOW</Button>
      </ThemeProvider>
    </div >
  )
}