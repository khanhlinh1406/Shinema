import React from "react";
import './moreFilm.css'
import { useState, useEffect, useCallback } from "react";

import { createSearchParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from "react-router";

import { movieCornerSelector } from "../../redux/selector";
import { movieCornerSlice } from "../../redux/slices/movieCornerSlice";

import MainNavBar from "../../components/MainNavBar/mainNavBar"

import tmdbApi from "../../api/tmdbApi";
import { movieType } from '../../api/tmdbApi'
import apiConfig from "../../api/apiConfig";

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from "@mui/material/colors";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';




// const url = new URLSearchParams(window.location.search);
// const type = url.get("type");

const MoreFilm = () => {

    const movieSearch = useSelector(movieCornerSelector)
    const { keyword } = useParams();
    const {type} = useParams();

    const [movieItems, setMovieItems] = useState([]);
    const [loadMore, setLoadMore] = useState(false);
    const [movieTypes, setMovieTypes] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();

    const dispatch = useDispatch();

    const openMoreHandler = async () => {
        setLoadMore(true);

        const getMovies = async () => {

            // console.log("total page " + totalPages)
            // console.log('page now ' + page)

            if (page + 1 > totalPages) {
                setPage(totalPages)
            } else
                setPage(page + 1);

            const params = { page: page }

            try {
                if (type !== 'similar') {
                    const response = await tmdbApi.getMoviesList(type, { params: params });
                    ///setMovieItems(response.results.slice(0, page))
                    /// setMovieItems(response.results)
                    ///const updateMovieItems = [...movieItems, ...response.results];

                    setMovieItems([...movieItems, ...response.results])

                    console.log(movieItems)
                }
                // else {
                //     const response = await tmdbApi.similar(category, props.id);
                //     ///setMovieItems(response.results.slice(0, page))
                //     ///setMovieItems([...movieItems, ...response.results])

                // }
            } catch {
                console.log("Film slider error")
            }
        }

        if (page < totalPages)
            await getMovies();
    }

    useEffect(() => {
        dispatch(movieCornerSlice.actions.chooseType(type))

        const getMovies = async () => {
            const params = {
                page: page
            }
            try {
                if (keyword !== undefined) {
                    console.log('iiiii')
                    const params = {
                        query: keyword,
                        page: 1
                    }
                    const response = await tmdbApi.search('movie', { params: params });
                    console.log(response.results)
                    setMovieItems(response.results)
                    setTotalPages(response.total_pages)
                } else
                    if (type !== 'similar' && type !== 'underfined') {
                        const response = await tmdbApi.getMoviesList(type, { params: params });
                        setMovieItems(response.results)
                        setTotalPages(response.total_pages)
                    }

            } catch (err) {
                console.log(err)
            }
        }

        getMovies();

        const getTypes = () => {
            if (type === movieType.popular)
                setMovieTypes('Phổ biến');
            if (type === movieType.upcoming)
                setMovieTypes('Sắp chiếu');;
            if (type === movieType.top_rated)
                setMovieTypes('Đánh giá cao');
            if (type === 'similar') {
                setMovieTypes('Tương tự')
            }
        }

        getTypes();
    }, [keyword, type]);

    return (
        <div className="container">
            <MainNavBar />
            <div className="filter">
                <SearchBar category="movie" keyword={keyword} />
                <TypeFilter />
            </div>

            <div className="film__container" id={type}>
                <div className="film__container__header">
                    <h3 className="film__container__header__title">
                        {movieTypes}
                    </h3>
                </div>

                <div className="film__container__content">
                    <div className="film__container__view-more-content">
                        <div className="film__container__view-more-content-list">
                            {
                                movieItems.map((item, i) => (
                                    <SlideItem item={item} key={i} />
                                ))
                            }
                        </div>
                        {page < totalPages ? (
                            <ViewMoreButton onClick={openMoreHandler}></ViewMoreButton>
                        ) : (<></>)
                        }
                    </div>

                </div>

            </div>
        </div>
    );
}

const SlideItem = props => {
    const item = props.item;
    const background = apiConfig.originalImage(item.backdrop_path ? item.poster_path : item.backdrop_path)
    // const dispatch = useDispatch();
    // const data = useSelector(movieSelector)
    const navigate = useNavigate();

    const GoToDetails = () => {
        // dispatch(
        //     movieSlice.actions.addMovie({name: 'ccccccc'})
        // )

        // console.log(data.movie)

        const params = { category: 'movie', id: props.item.id }
        navigate({
            pathname: '/filmDetails',
            search: `?${createSearchParams(params)}`
        });
    }
    return (
        <div className="film__item__container" onClick={GoToDetails}>
            <div className="film__item__container__hoverItem">
                <button className="film__item__container__hoverItem__buyTicketBtn">Đặt vé</button>

            </div>
            <img className="film__item__container__img" src={background} alt={item.title} />
            <label className="film__item__container__title">{item.title}</label>
        </div>
    )
}

export const ViewMoreButton = (props) => {
    const btnTheme = createTheme({
        shape: {
            borderRadius: 20
        },
        palette: {
            primary: {
                main: '#fff',
                outline: '#fff',
            }
        },
    })

    return (
        <div className='film__container__content__viewMore'>
            <ThemeProvider theme={btnTheme} >
                <Button sx={{ paddingX: 5, paddingY: 0.8 }} variant="outlined" onClick={props.onClick} >Xem thêm</Button>
            </ThemeProvider>
        </div >
    )
}

export const SearchBar = props => {
    const txtFieldTheme = createTheme({
        shape: {
            borderRadius: 55
        },
        palette: {
            primary: grey
        },
        text: grey
    })

    const navigate = useNavigate();

    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');
    const dispatch = useDispatch();
    const movieSearch = useSelector(movieCornerSelector)

    const goToSearch = useCallback(
        () => {
            if (keyword.trim().length > 0) {
                dispatch(movieCornerSlice.actions.searchMovie(keyword))
                navigate(`/movie/search/${keyword}`)

            }
        }, [keyword, navigate, props.category]
    );

    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();
            if (e.keyCode === 13)
                goToSearch();
        }

        document.addEventListener('keyup', enterEvent);

        return () => {
            document.removeEventListener('keyup', enterEvent);
        }
    }, [keyword, goToSearch]);

    return (
        <div className="search-bar">
            <ThemeProvider theme={txtFieldTheme}>
                <TextField
                    id="filled-search"
                    label="Tìm kiếm phim..."
                    type="search"
                    variant="filled"
                    text="primary"
                    color="primary"
                    /// value={movieSearch.search}
                    sx={{
                        marginTop: 1,
                        width: 350,
                        backgroundColor: 'rgb(9, 24, 48)',
                        borderRadius: 0.5,
                        input: { color: 'white', marginLeft: 10, marginX: 0.4 },
                        label: { color: 'rgb(153, 153, 153)', marginLeft: 10, marginX: 2, fontSize: 15 }
                    }}

                    onChange={(e) => { setKeyword(e.target.value); }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={goToSearch}>
                                    <SearchIcon sx={{ color: 'white' }} />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}>
                </TextField>


            </ThemeProvider>
        </div>
    );
}

const TypeFilter = () => {
    const dispatch = useDispatch();
    const movieSearch = useSelector(movieCornerSelector)
    const navigate = useNavigate();

    const options = [
        { label: "Phổ biến", value: movieType.popular },
        { label: "Đang chiếu", value: movieType.now_playing },
        { label: "Đánh giá cao", value: movieType.top_rated },
        { label: "Sắp chiếu", value: movieType.upcoming }
    ]

    const [value, setValue] = useState(options[movieSearch.chooseTypeIndex])

    const goToSearch = useCallback(
        () => {
            navigate(`/movie/${value.value}`);
        }, [navigate, value]);

    return (
        <div className="filter-type">
            <Autocomplete
                disablePortal
                id="combo-box-type"
                onChange={(event, newValue) => {
                    setValue(newValue);
                    console.log(value);
                    goToSearch();
                }}

                options={options}
                sx={{ width: 350, color: 'white' }}
                renderInput={(params) =>
                    <TextField {...params} label="Phân loại" sx={{ color: 'white' }} />
                }
            />
        </div>
    );


}


export default MoreFilm