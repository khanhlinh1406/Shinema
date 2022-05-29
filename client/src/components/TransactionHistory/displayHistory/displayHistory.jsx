import { Typography, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import accountApi from '../../../api/accountApi';

import Button from '@mui/material/Button';
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
import Row from '../ticketManageRow/ticketManageRow'
import { createData } from '../ticketManageRow/ticketManageRow'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { styles } from "./styles";
import { grey, red } from '@mui/material/colors';
import { getByUser } from "../../../redux/slices/ticketSlice";
import { useDispatch, useSelector } from "react-redux";
import { currentTicketList, userSelector } from './../../../redux/selector';

const DisplayHistory = () => {
    const [ticketList, setTicketList] = useState([])
    const [data, setData] = useState()
    const [row, setRow] = useState([])
    const dispatch = useDispatch()
    const _ticketList = useSelector(currentTicketList)
    const currentUser = useSelector(userSelector)
    const navigate = useNavigate()

    useEffect(async () => {
        let cancel = false
        await dispatch(getByUser(currentUser.email))
            .unwrap()
            .then((originalPromiseResult) => {
                if (cancel) return
                setTicketList(originalPromiseResult)
            })
            .catch((rejectedValueOrSerializedError) => {
                console.log(rejectedValueOrSerializedError)
            })
        return () => cancel = true
    }, [])

    useEffect(() => {
        let arr = [];
        if (ticketList.length > 0) {
            ticketList.forEach((order) => arr = [...arr, createData(order)])
        }
        setData(arr)
       // console.log('refresh ticketList')
    }, [ticketList])

    useEffect(() => {
        setTicketList(_ticketList)
       // console.log('refresh _ticketList')
    }, [_ticketList])


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
                        {/* <Box textAlign="left">
                            <ThemeProvider theme={tfTheme}>
                                <TextField id="standard-basic" label="Search name..." variant="standard" onChange={handleChange} />
                            </ThemeProvider>
                        </Box> */}

                        {ticketList &&
                            <TicketTable data={ticketList} />
                        }
                    </Grid>

                    {/* <Grid xs={4} item>
                    <Paper style={{ top: 0,}}>
                        <Grid container spacing={2}>
                            <Grid xs={6} item>
                                <Typography variant="body1">Total: </Typography>
                                <Typography variant="body1">{_ticketList.length}</Typography>
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
                                <Typography variant="body1">{_ticketList - countMale}</Typography> 
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

const TicketTable = (props) => {
    const data = props.data
    return (
        <div >
            <TableContainer component={Paper} sx={{ marginTop: 2, width: '100%' }}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell />
                            <StyledTableCell>
                                <Typography variant="button" sx={styles.title}>Movie</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography variant="button" sx={styles.title}>Booked Time</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography variant="button" sx={styles.title}>Theater</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography variant="button" sx={styles.title}>Total</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography variant="button" sx={styles.title}>Method</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography variant="button" sx={styles.title}>Status</Typography>
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <Row sx={{ m: 1 }} key={row._id} row={row} />
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

export const CustomFillButton = styled(Button)(({ theme }) => ({
    color: '#fff',
    backgroundColor: red[600],
    '&:hover': {
        backgroundColor: red[700],
    },
    padding: '6px 35px',
    marginLeft: '20px',
    borderRadius: '20px'
}));

export const CustomOutlineButton = styled(Button)(({ theme }) => ({
    color: red[700],
    borderColor: red[700],
    borderWidth: 1,
    borderStyle: 'solid',
    '&:hover': {
        backgroundColor: red[900],
        color: theme.palette.getContrastText(red[900]),
    },
    padding: '6px 35px',
    marginLeft: '20px',
    borderRadius: '20px'

}));

export default DisplayHistory