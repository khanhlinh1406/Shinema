import React from "react";
import { Navbar, Slider, FilmSlider } from '../../components/index'
import {tmdb, movieType} from '../../api/tmdbApi'

const Home = () => {
    return (
        <div className="home">
            <Slider />
            <Navbar />
            <FilmSlider typeFilm={movieType.popular} />
            <FilmSlider typeFilm={movieType.upcoming} />
            <FilmSlider typeFilm={movieType.top_rated} />
        </div>
    )
}
export default Home