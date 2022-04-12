import "./corner.css";
import React from "react";

import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { Route, BrowserRouter, Routes, Link } from "react-router-dom"

import MainNavBar from "../../components/MainNavBar/mainNavBar"
import FilmCorner from '../../components/Corners/FilmCorner/filmCorner';
import CastCorner from '../../components/Corners/PeopleCorner/castCorner'

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import AppBar from '@mui/material/AppBar';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { movieCornerSelector } from "../../redux/selector";
import { movieCornerSlice } from "../../redux/slices/movieCornerSlice";
import { useSelector, useDispatch } from 'react-redux'

const Corner = () => {

    const { category } = useParams()
    const { type } = useParams()

    const movieState = useSelector(movieCornerSelector)
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // useEffect(() =>{
    //     switch(value){

    //     }

    // }, [value])
    return (
        <div className="box-container">
            <MainNavBar/>
            <Box sx={{ width: '100%', typography: 'body1' }}
            >
                <TabContext value={value} >
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                            <Tab label="PHIM ẢNH"
                                value={0}
                                component={Link}
                                to={'/corner/movie/'+movieState.chosenType}
                                sx={{ color: '#fff' }} />

                            <Tab label="DIỄN VIÊN"
                                value={1}
                                component={Link}
                                to={'/corner/people'}
                                sx={{ color: '#fff' }} />
                        </TabList>
                    </Box>
                    
                    <TabPanel value={0}>
                        <FilmCorner />
                    </TabPanel>

                    <TabPanel value={1}>
                        <CastCorner />
                    </TabPanel>
                </TabContext>
            </Box>
        </div>

    )
}

export default Corner;