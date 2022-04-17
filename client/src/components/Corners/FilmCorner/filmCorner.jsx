import React from "react";
import './filmCorner.css'
import { useState, useEffect, useCallback } from "react";

import { createSearchParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from "react-router";

import { movieCornerSelector } from "../../../redux/selector";
import { movieCornerSlice } from "../../../redux/slices/movieCornerSlice";

import MainNavBar from "../../MainNavBar/mainNavBar"

import tmdbApi from "../../../api/tmdbApi";
import { movieType } from '../../../api/tmdbApi'
import apiConfig from "../../../api/apiConfig";

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from "@mui/material/colors";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const FilmCorner = () => {

    const movieSearch = useSelector(movieCornerSelector)
    const { keyword } = useParams();
    const { type } = useParams();

    const [movieItems, setMovieItems] = useState([]);
    const [loadMore, setLoadMore] = useState(false);
    const [movieTypes, setMovieTypes] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();

    const dispatch = useDispatch();

    const openMoreHandler = async () => {
        setLoadMore(true);

        const getMovies = async () => {
            if (page + 1 > totalPages) {
                setPage(totalPages)
            } else
                setPage(page + 1);

            try {
                if (type !== 'similar' && keyword === undefined) {
                    const params = { page: page }
                    const response = await tmdbApi.getMoviesList(type, { params: params });
                    setMovieItems([...movieItems, ...response.results])
                }

                if (keyword !== undefined) {
                    const params = { page: page, query: keyword }
                    const response = await tmdbApi.search('movie', { params: params });
                    setMovieItems([...movieItems, ...response.results])


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
                page: 1
            }
            try {
                if (keyword === undefined && type === undefined) {
                    const response = await tmdbApi.getMoviesList(movieType.popular, { params: params });
                    setMovieItems(response.results)
                    setTotalPages(response.total_pages)
                }
                else if (keyword !== undefined) {
                    const params = {
                        query: keyword,
                        page: 1
                    }
                    const response = await tmdbApi.search('movie', { params: params });
                    console.log(response.results)
                    setMovieItems(response.results)
                    setTotalPages(response.total_pages)
                } else if (type !== 'similar' && type !== 'underfined') {
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
                setMovieTypes('Popular');
            if (type === movieType.upcoming)
                setMovieTypes('Upcoming');;
            if (type === movieType.top_rated)
                setMovieTypes('Top rated');
            if (type == movieType.now_playing)
                setMovieTypes('Now playing')
            if (type === 'similar') {
                setMovieTypes('Similar')
            }
        }

        getTypes();
    }, [keyword, type]);

    return (
        <div className="container">
            {/* <MainNavBar /> */}
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
    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path)
    // const dispatch = useDispatch();
    // const data = useSelector(movieSelector)
    const navigate = useNavigate();

    const GoToDetails = () => {
        // dispatch(
        //     movieSlice.actions.addMovie({name: 'ccccccc'})
        // )

        // console.log(data.movie)

        const params = { category: 'movie', id: props.item.id }
        navigate(`/filmDetails/${props.item.id}`);
    }
    return (
        <div className="film__item__container" onClick={GoToDetails}>
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
                navigate(`/corner/movie/search/${keyword}`)

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
                    label="Search movies..."
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

    const customTheme = createTheme({
        palette: {
            primary: grey
        }
    })

    const options = [
        { label: "Popular", value: movieType.popular },
        { label: "Now playing", value: movieType.now_playing },
        { label: "Top rated", value: movieType.top_rated },
        { label: "Upcoming", value: movieType.upcoming }
    ]

    const [value, setValue] = useState(options[movieSearch.chooseTypeIndex])


    const goToSearch = useCallback(
        () => {
            dispatch(movieCornerSlice.actions.chooseType(value.value))
            navigate(`/corner/movie/${value.value}`);
        }, [navigate, value]);

    const onChangeHandler = (event) => {
        const updateValue = event.target.value;
        console.log("uuu" + updateValue)
        dispatch(movieCornerSlice.actions.chooseType(updateValue))
        setValue(options[movieSearch.chosenTypeIndex])
        //  setValue(updateValue);
        console.log(value)
        goToSearch();
    }

    return (
        <div className="filter-type">
            <ThemeProvider theme={customTheme}>
                <Autocomplete
                    disablePortal
                    id="combo-box-type"
                    onChange={(event, newValue) => {
                        setValue(newValue);
                        console.log(value);
                        goToSearch();
                    }}
                    options={options}
                    sx={{
                        width: 350,
                        backgroundColor: 'rgb(9, 24, 48)',
                        svg: { color: '#fff' },
                        input: { color: '#fff' },
                        label: { color: '#fff' },
                    }}

                    renderInput={(params) =>
                        <TextField {...params} label="Type" sx={{
                            label: {
                                color: '#fcfcfc',
                            }
                        }} />

                    }
                />
            </ThemeProvider>

            {/* <Box sx={{ width: 350 }}>
                <FormControl fullWidth>
                    <ThemeProvider theme={customTheme}>
                        <InputLabel id="demo-simple-select-label"
                            sx={{ color: '#fcfcfc' }}
                        >Phân loại</InputLabel>
                    </ThemeProvider>
                    <ThemeProvider theme={customTheme}>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={value}
                            ///defaultValue = {options[movieSearch.chosenTypeIndex].value}
                            label="Phân loại"
                            onChange={onChangeHandler}
                            sx={{
                                backgroundColor: 'rgb(9, 24, 48)'

                            }}
                        >
                            {
                                options.map((item, i) => (
                                    <MenuItem item={item} key={i} value={item.value} sx={{ color: '#000000' }}>
                                        {item.label}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </ThemeProvider>
                </FormControl>
            </Box> */}
        </div >
    );


}


export default FilmCorner