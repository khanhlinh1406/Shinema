import styles from './styles'
import { useSelector } from 'react-redux';
import { userSelector } from '../../redux/selector'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red, grey } from "@mui/material/colors";

import { ShowTimeManager, TheaterManager, Statistics } from '../../components'
import { Helmet } from 'react-helmet';

const Manager = () => {

    const user = useSelector(userSelector)
    let navigate = useNavigate();

    useEffect(() => {
        const checkAuth = () => {
            if (user) {
                if (user.rank != "Manager" && user.rank != "Admin") {
                    navigate('/')
                }
            }
        }
        checkAuth()
    }, [user])

    const color = "#c44242";
    const tabTheme = createTheme({
        palette: {
            primary: red,
        },
    })

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Helmet>
                <title>Data Manager</title>
            </Helmet>
            
            <ThemeProvider theme={tabTheme}>
                <Typography sx={{ color: '#fff', fontSize: 20, margin: 7 }}>QUẢN LÍ DỮ LIỆU</Typography>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: 5, marginLeft: 5 }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
                            <Tab label="Suất chiếu" {...a11yProps(0)} sx={{ color: '#fff' }} />
                            <Tab label="Thống kê" {...a11yProps(1)} sx={{ color: '#fff' }} />
                            <Tab label="Rạp" {...a11yProps(2)} sx={{ color: '#fff' }} />
                        </Tabs>
                    </Box>

                    <TabPanel value={value} index={0}>
                        <ShowTimeManager />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Statistics />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <TheaterManager />
                    </TabPanel>

                </Box>
            </ThemeProvider>
        </div>
    );
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


export default Manager