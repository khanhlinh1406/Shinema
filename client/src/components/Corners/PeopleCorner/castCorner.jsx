import { useState, useEffect, useCallback } from 'react';
import React from 'react'
import './castCorner.css'

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

const CastCorner = () => {
    const [peopleItems, setPeopleItems] = useState([]);
    const [loadMore, setLoadMore] = useState(false)
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();

    const { keyword } = useParams()

    const openMoreHandler = async () => {
        setLoadMore(true);

        const getPeople = async () => {

            // console.log("total page " + totalPages)
            // console.log('page now ' + page)

            if (page + 1 > totalPages) {
                setPage(totalPages)
            } else
                setPage(page + 1);

            if (keyword === undefined) {
                const params = { page: page }
                const response = await tmdbApi.getPopularPeople({ params: params });
                console.log(response.results)
                setPeopleItems([...peopleItems, ...response.results])
                setTotalPages(response.total_pages)
            } else if (keyword !== undefined){
                const params = { page: page, query: keyword }
                const response = await tmdbApi.searchPeople({ params: params });
                setPeopleItems([...peopleItems, ...response.results])
                setTotalPages(response.total_pages)
            }
        }

        if (page < totalPages)
            await getPeople();
    }

    useEffect(() => {
        if (keyword === undefined) {
            const getPeople = async () => {
                try {
                    const params = {
                        page: 1
                    }
                    const response = await tmdbApi.getPopularPeople({ params: params });
                    console.log(response.results)
                    setPeopleItems(response.results)
                    setTotalPages(response.total_pages)

                } catch (err) {
                    console.log(err)
                }

            }

            getPeople()
        }
        else if (keyword !== undefined) {
            const getPeople = async () => {
                try {
                    const params = {
                        page: 1,
                        query: keyword
                    }
                    const response = await tmdbApi.searchPeople({ params: params });
                    console.log(response.results)
                    setPeopleItems(response.results)
                    setTotalPages(response.total_pages)

                } catch (err) {
                    console.log(err)
                }

            }
            getPeople()
        }
    }, [keyword]);


    return (
        <div className="people-container">
            <div className="people-filter">
                <SearchBar
                    keyword={keyword}
                />
            </div>

            <div className="people__container">
                <div className="people__container__content">
                    <div className="people__container__view-more-content">
                        <div className="people__container__view-more-content-list">
                            {
                                peopleItems.map((item, i) => (
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
                navigate(`/corner/people/search/${keyword}`)
            }
        }, [keyword, navigate]
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
        <div className="people-search-bar">
            <ThemeProvider theme={txtFieldTheme}>
                <TextField
                    id="filled-search"
                    label="Find a person..."
                    type="search"
                    variant="filled"
                    text="primary"
                    color="primary"
                    /// value={movieSearch.search}
                    sx={{
                        marginTop: 1,
                        width: 450,
                        backgroundColor: 'rgb(9, 24, 48)',
                        borderRadius: 0.5,
                        input: { color: 'white', marginLeft: 10, marginX: 0.4 },
                        label: { color: 'rgb(153, 153, 153)', marginLeft: 10, marginX: 2, fontSize: 15 }
                    }}

                    onChange={(e) => { setKeyword(e.target.value); }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={goToSearch}
                                >
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

export default CastCorner

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
        <div className='people__container__content__viewMore'>
            <ThemeProvider theme={btnTheme} >
                <Button sx={{ paddingX: 5, paddingY: 0.8 }} variant="outlined" onClick={props.onClick} >Xem thêm</Button>
            </ThemeProvider>
        </div >
    )
}

const SlideItem = props => {
    const item = props.item;
    const background = apiConfig.originalImage(item.profile_path)
    // const dispatch = useDispatch();
    // const data = useSelector(movieSelector)
    const navigate = useNavigate();

    const GoToDetails = () => {
        navigate(`/peopleDetails/${props.item.id}`)
    }
    return (
        <div className="people__item__container" onClick={GoToDetails}>
            <img className="people__item__container__img" src={background} alt={item.title} />
            <label className="people__item__container__name">{item.name}</label>
        </div>
    )
}