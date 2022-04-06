import styles from './styles'

import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red } from "@mui/material/colors";

import { ShowTime } from '../../components'

const Manager = () => {
    const tabTheme = createTheme({
        palette: {
            primary: red
        },
    })

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <ThemeProvider theme={tabTheme}>
            <p style={{ color: '#fff', fontSize: 20, margin: 50 }}>QUẢN LÍ DỮ LIỆU</p>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: 5, marginLeft: 5 }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
                        <Tab label="Rạp" {...a11yProps(0)} sx={{ color: '#fff' }} />
                        <Tab label="Suất chiếu" {...a11yProps(1)} sx={{ color: '#fff' }} />
                        <Tab label="Thống kê" {...a11yProps(2)} sx={{ color: '#fff' }} />
                        <Tab label="Kiểm duyệt" {...a11yProps(3)} sx={{ color: '#fff' }} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    Item One
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <ShowTime />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Item Three
                </TabPanel>
                <TabPanel value={value} index={3}>
                    Item Three
                </TabPanel>
            </Box>
        </ThemeProvider>
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
                    <Typography>{children}</Typography>
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