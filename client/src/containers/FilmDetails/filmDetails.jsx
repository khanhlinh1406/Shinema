import React from "react";
import './filmDetails.css'

import { useLocation } from "react-router-dom";


import { useState, useEffect } from "react";

import tmdbApi from "../../api/tmdbApi";
import { movieType, category } from '../../api/tmdbApi'
import apiConfig from "../../api/apiConfig";


const FilmDetails = () => {
  const url = new URLSearchParams(window.location.search);
  const filmId = url.get("id");
  const [film, setFilm] = useState();

  useEffect(() => {
    const getMovie = async () => {
      const params = {
      }

      try {
        const response = await tmdbApi.detail(category.movie, filmId, { params: params });
        setFilm(response)
      } catch (err){
        console.log(err)
      }
    }

    getMovie();
  })

  return (
    <div

    >
      <p>aaaaaaaaaaa</p>

    </div>
  )
}

export default FilmDetails;