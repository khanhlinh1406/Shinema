import React from "react";
import { Navbar, Slider, FilmSlider } from '../../components/index'

const Home = () => {
    return (
        <div className="home">
            <Slider />
            <Navbar />
            <FilmSlider typeFilm="popular" />
            <FilmSlider typeFilm="upcoming" />
            <FilmSlider typeFilm="top_rated" />
        </div>
    )
}
export default Home