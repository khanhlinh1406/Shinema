import React from "react";
import { Navbar, Slider, FilmSlider } from '../../components/index'
import { tmdb, movieType, category } from '../../api/tmdbApi'

const Home = () => {
    return (
        <div className="home">
            <Slider />
            <Navbar />
            <FilmSlider category={category.movie} typeFilm={movieType.popular} />
            <FilmSlider category={category.movie} typeFilm={movieType.upcoming} />
            <FilmSlider category={category.movie} typeFilm={movieType.top_rated} />
        </div>
    )
}
export default Home