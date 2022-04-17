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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red, grey } from "@mui/material/colors";

import { movieCornerSelector } from "../../redux/selector";
import { movieCornerSlice } from "../../redux/slices/movieCornerSlice";
import { useSelector, useDispatch } from 'react-redux'

import { Helmet } from 'react-helmet';

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

    const tabTheme = createTheme({
        palette: {
            primary: red,
        },
    })

    return (
        <div className="box-container">
            <Helmet>
                <title>Cimena Corner</title>
            </Helmet>
            <MainNavBar />
            <ThemeProvider theme={tabTheme}>
                <Box sx={{ width: '100%', typography: 'body1' }}
                >
                    <TabContext value={value} >
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                                <Tab label="MOVIES"
                                    value={0}
                                    component={Link}
                                    to={'/corner/movie/' + movieState.chosenType}
                                    sx={{ color: '#fff' }} />

                                <Tab label="PEOPLE"
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
            </ThemeProvider>
        </div>

    )
}

export default Corner;