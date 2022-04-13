import './peopleDetails.css'
import React from 'react';
import { useLocation } from "react-router-dom";

import { Helmet } from 'react-helmet';

import MainNavBar from "../../components/MainNavBar/mainNavBar";

import { useState, useEffect } from "react";

import tmdbApi from "../../api/tmdbApi";
import { movieType, category } from '../../api/tmdbApi'
import apiConfig from "../../api/apiConfig";
import { useParams, useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import AppBar from '@mui/material/AppBar';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const PeopleDetails = () => {
    const { id } = useParams();
    const [person, setPerson] = useState();

    const [value, setValue] = React.useState(0);
    const [movies, setMovies] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const getPerson = async () => {
            try {
                const response = await tmdbApi.getDetailPerson(id);
                setPerson(response)
            } catch (err) {
                console.log(err)
            }
        }

        getPerson();
       // console.log(person)

        const getMovie = async ()=>{
            try{
                const response = await tmdbApi.getMovieCredits(id);
                setMovies(response)
            }
            catch(err) {
                console.log(err)
            }
        }
        getMovie();
        console.log(movies.cast)
    })

    return (
        <div className="details">
            {
                person &&
                <>
                    <Helmet>
                        <title>
                            {person.name}
                        </title>
                    </Helmet>

                    <MainNavBar />
                    <div className='person-detail'>
                        <div className="person-detail__avatar"
                            style={{ backgroundImage: `url(${apiConfig.originalImage(person.profile_path)})` }}>
                        </div>
                        <div className="person-detail__general-info">
                            <div className="person-detail__general-info__name">{person.name}</div>

                            <div className="person-detail__general-info__department">{person.known_for_department}</div>

                            <div className="person-detail__general-info__other-name">
                                <div className="general-title">Tên gọi khác:</div>
                                <div className="general-content">{person.also_known_as[0]}</div>
                            </div>

                            <div className="person-detail__general-info__birthday">
                                <div className="general-title">Ngày sinh:</div>
                                <div className="general-content">{person.birthday}</div>
                            </div>

                            <div className="person-detail__general-info__place-of-birth">
                                <div className="general-title">Nơi sinh:</div>
                                <div className="general-content">{person.place_of_birth}</div>
                            </div>
                        </div>


                    </div>

                    <Box sx={{ width: '80%', typography: 'body1', marginLeft: '50px' }} className="box"
                    >
                        <TabContext value={value} >
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="GIỚI THIỆU"
                                        value={0}
                                        sx={{ color: '#fff', fontSize:'40' }} />

                                    <Tab label="ĐÃ THAM GIA"
                                        value={1}
                                        sx={{ color: '#fff' }} />
                                </TabList>
                            </Box>

                            <TabPanel value={0}>
                                <div className="person-detail__bio">
                                    {/* <div className="person-detail__intro">Giới thiệu</div> */}
                                    <div className="person-detail__bio__content">{person.biography}</div>
                                </div>
                            </TabPanel>

                            <TabPanel value={1}>
                                <div className="movies-list">
                                {
                                    movies.map((item, i)=>(
                                        <SlideItem item={item} key={i}/>
                                    ))
                                }
                                </div>
                            </TabPanel>
                        </TabContext>
                    </Box>

                </>
            }
        </div >
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
        navigate(`/filmDetails/${props.item.id}`);
    }
    return (
        <div className="item__container" onClick={GoToDetails}>
            <img className="item__container__img" src={background} alt={item.title} />
            <label className="item__container__title">{item.title}</label>
        </div>
    )
}

export default PeopleDetails