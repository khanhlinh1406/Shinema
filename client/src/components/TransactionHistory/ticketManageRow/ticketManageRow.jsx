import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import apiConfig from "../../../api/apiConfig";

import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import CakeIcon from '@mui/icons-material/Cake';
import PhoneIcon from '@mui/icons-material/Phone';
import PlaceIcon from '@mui/icons-material/Place';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

import { styles } from './styles'

import { Route, Routes, useNavigate } from "react-router-dom";
import { movieType, category } from '../../../api/tmdbApi'
import mFunction from '../../../function'
import { grey, red, white } from '@mui/material/colors';
import ticketApi from '../../../api/ticketApi';
import TheaterApi from '../../../api/theaterApi'
import tmdbApi from '../../../api/tmdbApi'
import { ticketSlice } from '../../../redux/slices/ticketSlice';
import { useDispatch } from 'react-redux';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';

export const createData = (ticket) => {
  const id = ticket._id
  const filmId = ticket._filmId
  const theaterId = ticket._theaterId
  const roomId = ticket._roomId
  const seatIdArray = ticket.seatIdArray
  const dateOccur = ticket.dateOccur
  const timeOccur = ticket.timeOccur
  const bookedTime = ticket.bookedTime
  const invoice = ticket.invoice
  return {
    id, filmId, theaterId, roomId, seatIdArray, dateOccur, timeOccur, bookedTime, invoice
  };
}

const Row = (props) => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const [theater, setTheater] = React.useState({});
  const [movie, setMovie] = React.useState({})


  useEffect(() => {
    const getMovie = async () => {
      const params = {
      }

      try {
        const response = await tmdbApi.detail(category.movie, row._filmId, { params: params });
        setMovie(response)
      } catch (err) {
        console.log(err)
      }
    }

    getMovie();

  }, [])

  useEffect(() => {
    const getTheaters = async () => {
      await TheaterApi.getById(row._theaterId)
        .then(res =>
          setTheater(res.data))
        .catch(err => console.log(err))
    }

    getTheaters()
  }, [])

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left" style={{ fontWeight: 'bold' }}>{movie.title}</TableCell>
        <TableCell component="th" scope="row" style={{ fontStyle: 'italic' }}>{row.bookedTime}</TableCell>
        <TableCell align="left" style={{}}>{theater.name}</TableCell>
        <TableCell align="right" style={{ fontWeight: 'bold', color: 'red' }}>{row.invoice.total}$</TableCell>
        <TableCell align="center">
          {row.invoice.method == 'Cash' ?
            <LocalAtmIcon style={{ color: "#0c8243", fontSize: 30 }} />
            : <img style={{
              width: '40px',
              height: '40px',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }} src="https://admin.money24h.vn/wp-content/uploads/2022/03/paypal-la-gi.jpg" />
          }</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ mt: 1, ml: 2, p: 2 }}>
              <Typography variant="subtitle1" gutterBottom component="div" style={{ color: 'red', fontWeight: 'bold' }}>
                Ticket information:
              </Typography >

              <TicketInformation data={row} theater={theater} movie={movie} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired,
//     contact: PropTypes.string.isRequired,
//     address: PropTypes.string.isRequired,
//     //gender: PropTypes.string.isRequired,
//     birthday: PropTypes.string.isRequired,

//   }).isRequired,
// };

const TicketInformation = (props) => {
  const data = props.data
  const theater = props.theater
  const movie = props.movie

  const dispatch = useDispatch()

  // const handleDelete = async () => {
  //   const response = await accountApi.deleteAccount(data._id)
  //   if (response.status == 200) {
  //     console.log('Xoa thanh cong')
  //     dispatch(staffSlice.actions.deleteStaff(data._id))
  //   }
  //   else {
  //     console.log("Xoa that bai ")
  //   }
  // }

  const navigate = useNavigate()

  const openDetailFilm = () => {
    navigate('/filmDetails/' + movie.id)
  }

  const [cancelable, setCancelable] = useState(true)

  useEffect(() => {
    const checkAbleToCancel = () => {
      let day = new Date().getDate()
      let month = new Date().getMonth()
      let year = new Date().getFullYear()
  
      let current = month + "/" + day + "/" + year
  
      if (mFunction.subDate(data.dateOccur, current) < 1)
        setCancelable(false)
  
      if (data.invoice.method === "Paypal") {
        setCancelable(false)
      }
    }

    checkAbleToCancel()
  }, [])
  
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={4} sx={{ p: 2 }}>
        {/* ShowTime Information */}
        <Grid item container spacing={2} xs={6}>
          <Grid xs={1} rowSpacing={2} item>
            <Grid3x3Icon style={styles.icon} />
          </Grid>
          <Grid xs={4} item>
            <Typography sx={styles.title}>Ticket ID: </Typography>
          </Grid>
          <Grid xs={7} item>
            <Typography sx={styles.item}>{data._id.toUpperCase()}</Typography>
          </Grid>

          <Grid xs={1} item>
            <PlaceIcon style={styles.icon} />
          </Grid>
          <Grid xs={4} item>
            <Typography sx={styles.title}>Place:</Typography>
          </Grid>
          <Grid xs={7} item>
            <Typography sx={styles.item}>{theater.name} ({theater.address}) - Room {data._roomId}</Typography>
          </Grid>

          <Grid xs={12} item>
            <Box sx={{ height: '1px', backgroundColor: 'black' }}></Box>
          </Grid>

          <Grid xs={1} item>
            <PersonIcon style={styles.icon} />
          </Grid>
          <Grid xs={4} item>
            <Typography style={styles.title}>Name: </Typography>
          </Grid>
          <Grid xs={7} item>
            <Typography style={styles.item}>{data.name}</Typography>
          </Grid>

          <Grid xs={1} item>
            <PhoneIcon style={styles.icon} />
          </Grid>
          <Grid xs={4} item>
            <Typography sx={styles.title}>Phone:</Typography>
          </Grid>
          <Grid xs={7} item>
            <Typography sx={styles.item}>{data.contact}</Typography>
          </Grid>

          <Grid xs={1} item>
            <HomeIcon style={styles.icon} />
          </Grid>
          <Grid xs={4} item>
            <Typography sx={styles.title}>Address:</Typography>
          </Grid>
          <Grid xs={7} item>
            <Typography sx={styles.item}>{data.address}</Typography>
          </Grid>

        </Grid>

        {/* Invoice Information */}
        <Grid item container spacing={2} xs={6}>
          <Grid item container xs={12}>
            <Grid item xs={4}>
              <div className="poster"
                style={{ backgroundImage: `url(${apiConfig.originalImage(movie.poster_path)})`, width: '100%', height: '100%', backgroundPosition: 'center', backgroundSize: 'cover', cursor: 'pointer' }} onClick={openDetailFilm}>
              </div>
            </Grid>

            <Grid item xs={7} sx={{ backgroundColor: '#ededed' }}>
              <Stack direction="column" sx={{ pl: 1 }}>
                <Typography variant="h5" style={{ fontWeight: 'bold', p: 2, color: 'black', mt: 2, cursor: 'pointer' }} onClick={openDetailFilm}>{movie.title}</Typography>
                <Typography variant='subtitle2' style={{ fontWeight: 'bold', color: 'black', p: 2, mt: 2 }}>Price: {theater.price}$</Typography>
                <Typography variant='subtitle2' style={{ color: 'black', p: 2 }}>Date - Time: {data.dateOccur} - {data.timeOccur}</Typography>
                <Typography variant='subtitle2' style={{ fontStyle: 'italic', fontWeight: 'bold', p: 2, color: 'black' }}>Seats: </Typography>
                <Stack direction="row" sx={{ pl: 2 }}>
                  {
                    data.seatIdArray.map((item) => (
                      <Typography variant="subtitle2" sx={{ pr: 0.5, color: 'black' }}>{item} </Typography>
                    ))
                  }
                </Stack>
                <Typography variant='subtitle2' style={{ fontStyle: 'italic', fontWeight: 'bold', p: 2, color: 'black' }}>Seats: </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'red' }}>Total: {data.invoice.total}$</Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'black' }}>Method: {data.invoice.method}</Typography>
              </Stack>
            </Grid>
          </Grid>
        </Grid>

        {/* Button */}
        { cancelable ?
          <Grid item container xs={12}>
            <Stack>
              <CustomFillButton>
                Cancel this order
              </CustomFillButton>
            </Stack>
          </Grid>: (
            
              data.invoice.method === "Paypal" && 
              <Typography variant="subtitle2" style={{color: "red"}}>You can not cancel this order which paid by PayPal.</Typography>
            
          )
        }
      </Grid>



      {/* <Grid xs={1} item>
          <PhoneIcon style={styles.icon}/>
        </Grid>
        <Grid xs={4} item>
          <Typography sx={styles.title}>Phone:</Typography>
        </Grid>
        <Grid xs={7} item>
          <Typography sx={styles.item}>{data.contact}</Typography>
        </Grid>

        <Grid item xs={1}>
          <HomeIcon style={styles.icon}/>
        </Grid>
        <Grid xs={4} item>
          <Typography sx={styles.title}>Address:</Typography>
        </Grid>
        <Grid xs={7} item>
          <Typography sx={styles.item}>{data.address}</Typography>
        </Grid>
        <Grid xs={1} item>
          <CakeIcon style={styles.icon}/>
        </Grid>
        <Grid xs={4} item>
          <Typography sx={styles.title}>Birthday:</Typography>
        </Grid>
        <Grid xs={7} item>
          <Typography sx={styles.item}>{data.birthday}</Typography>
        </Grid> */}
      {/* <Stack direction="row" sx={{ pt: 3, ml: 12}} >
        <CustomOutlineButton onClick={() => {
          navigate('/manager/staff/edit/' + data._id)
        }}>
          Modify
        </CustomOutlineButton>
        <CustomFillButton variant="contained" onClick={handleDelete}>Delete</CustomFillButton>
      </Stack> */}
    </Box >

  )


}

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

export default Row