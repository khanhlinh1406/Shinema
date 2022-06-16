import { Typography, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import accountApi from '../../../api/accountApi';


import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { tableCellClasses } from '@mui/material/TableCell';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Row from '../staffManageRow/staffManageRow'
import { createData } from '../staffManageRow/staffManageRow'
import { CustomFillButton } from '../index'
import { CustomOutlineButton } from '../index'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { styles } from "./styles";
import { grey, red } from '@mui/material/colors';
import { getAllStaff } from "../../../redux/slices/staffSlice";
import { useDispatch, useSelector } from "react-redux";
import { currentStaffList } from "../../../redux/selector";

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

const DisplayStaff = () => {
    const [staffList, setStaffList] = useState([])
    const [data, setData] = useState()
    const [row, setRow] = useState([])
    const dispatch = useDispatch()
    const _staffList = useSelector(currentStaffList)

    const navigate = useNavigate()

    const [nameSearch, setNameSearch] = useState('');
    const handleChange = (event) => {
        setNameSearch(event.target.value.toLowerCase());
        setData(
            _staffList.filter((e) => e.name.toLowerCase().includes(nameSearch)
            ))
    };

    useEffect(() => {
        if (nameSearch.length === 0)
            setStaffList(_staffList)
        else
            setStaffList(data)
    }, [nameSearch])


    useEffect(async () => {
        let cancel = false
        await dispatch(getAllStaff())
            .unwrap()
            .then((originalPromiseResult) => {
                if (cancel) return
                setStaffList(originalPromiseResult)
            })
            .catch((rejectedValueOrSerializedError) => {
                console.log(rejectedValueOrSerializedError)
            })
        return () => cancel = true
    },[])

    useEffect(() => {
        let arr = [];
        if (staffList.length > 0) {
            staffList.forEach((staff) => arr = [...arr, createData(staff)])
        }
        setData(arr)
    }, [staffList])

    useEffect(() => {
        setStaffList(_staffList)
    }, [_staffList])

    const countMale = () => {
        let counter = 0;
        _staffList.forEach((staff) => {
            if (staff.gender === 'male')
                counter++;
        })

        console.log(counter)

        return counter
    }

    const tfTheme = createTheme({
        shape: {
            borderRadius: 55
        },
        palette: {
            primary: grey
        },
        text: grey
    })

    return (
        <div>
            <Box sx={{ mt: 2, ml: 16, }}>

                <Grid container spacing={2} >
                    <Grid xs={10} item>
                        <Box textAlign="left">
                            <TextField id="standard-basic" label="Search name..." 
                            sx={{
                                marginY: 1,
                                input: { color: 'white', marginLeft: 1, marginX: 0.4 },
                                label: { color: 'rgb(153, 153, 153)', marginLeft: 1, marginX: 0.4 },

                            }} 
                            variant="standard" 
                            onChange={handleChange} />
                        </Box>

                        <Box textAlign="right">
                            <CustomFillButton onClick={() => { navigate('/manager/staff/add') }}>New</CustomFillButton>
                        </Box>

                        {staffList &&
                            <StaffTable data={staffList} />
                        }
                    </Grid>

                    {/* <Grid xs={4} item>
                    <Paper style={{ top: 0,}}>
                        <Grid container spacing={2}>
                            <Grid xs={6} item>
                                <Typography variant="body1">Total: </Typography>
                                <Typography variant="body1">{_staffList.length}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid xs={6} item>
                                <MaleIcon style={{color: "#ba0666"}}/>
                                <Typography variant="body1">{countMale}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid xs={6} item>
                                <FemaleIcon style={{color: "#180c75"}} />
                                <Typography variant="body1">{_staffList - countMale}</Typography> 
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid> 
            */}

                </Grid>

            </Box>
        </div>
    )
}

const StaffTable = (props) => {
    const data = props.data
    return (
        <div >

            <TableContainer component={Paper} sx={{ marginTop: 2, width: '100%' }}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell />
                            <StyledTableCell>
                                <Typography variant="button" sx={styles.title}>Name</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography variant="button" sx={styles.title}>Position</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography variant="button" sx={styles.title}>Email</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography variant="button" sx={styles.title}>Phone</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography variant="button" sx={styles.title}>Gender</Typography>
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <Row sx={{ m: 1 }} key={row.email} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const CustomTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#fff',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#fff',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#fff',
        },
        '&:hover fieldset': {
            borderColor: '#fff',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#fff',
        },
    },
});

export default DisplayStaff