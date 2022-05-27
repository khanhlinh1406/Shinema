import * as React from 'react';
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

import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import CakeIcon from '@mui/icons-material/Cake';
import PhoneIcon from '@mui/icons-material/Phone';

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

import { styles } from './styles'

import { Route, Routes, useNavigate } from "react-router-dom";




import { CustomFillButton, CustomOutlineButton } from '../index';
import accountApi from '../../../api/accountApi';
import { staffSlice } from '../../../redux/slices/staffSlice';
import { useDispatch } from 'react-redux';

export const createData = (staff) => {
  const email = staff.email
  const contact = staff.contact
  const name = staff.name
  const address = staff.address
  const gender = staff.gender
  const birthday = staff.birthday
  return {
    email, name, contact, gender, address, birthday
  };
}

const Row = (props) => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

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
        <TableCell component="th" scope="row" style={{fontWeight: 'bold'}}>
          {row.name}
        </TableCell>
        <TableCell align="left" style={{fontStyle: 'italic'}}>{row.email}</TableCell>
        <TableCell align="left" style={{fontStyle: 'italic'}}>{row.contact}</TableCell>
        {/* <TableCell align="center">
          {row.gender=='male' ?
          <MaleIcon  style={{color: "#180c75"}} />
          : <FemaleIcon style={{color: "#ba0666"}}/>
          }</TableCell> */}
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ mt: 1, ml: 20, p: 2 }}>
              <Typography variant="subtitle1" gutterBottom component="div" style={{color: 'red', fontWeight: 'bold'}}>
                Staff information:
              </Typography >

              <StaffInformation data={row} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    contact: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    //gender: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
  }).isRequired,
};

const StaffInformation = (props) => {
  const data = props.data
  const dispatch = useDispatch()

  const handleDelete = async () => {
    const response = await accountApi.deleteAccount(data._id)
    if (response.status == 200) {
      console.log('Xoa thanh cong')
      dispatch(staffSlice.actions.deleteStaff(data._id))
    }
    else {
      console.log("Xoa that bai ")
    }
  }

  const navigate = useNavigate()
  return (
    <Box sx={{ width: '70%' }}>
      <Grid container spacing={2} sx={{ alignItems: 'center', justifyContent: "center", p: 2 }}>
        <Grid xs={1} rowSpacing={2} item>
          <PersonIcon style={styles.icon} />
        </Grid>
        <Grid xs={4} item>
          <Typography sx={styles.title}>Name: </Typography>
        </Grid>
        <Grid xs={7} item>
          <Typography sx={styles.item}>{data.name}</Typography>
        </Grid>

        <Grid xs={1} item>
          <EmailIcon style={styles.icon} />
        </Grid>
        <Grid xs={4} item>
          <Typography sx={styles.title}>Email:</Typography>
        </Grid>
        <Grid xs={7} item>
          <Typography sx={styles.item}>{data.email}</Typography>
        </Grid>
        <Grid xs={1} item>
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

        {/*<Grid xs={1} item>
          <PersonIcon />
        </Grid>
         <Grid xs={4} item>
          <Typography sx={styles.title}>Gender:</Typography>
        </Grid>
        <Grid xs={7} item>
          <Typography sx={styles.item}>{data.gender}</Typography>
        </Grid> */}

        <Grid xs={1} item>
          <CakeIcon style={styles.icon}/>
        </Grid>
        <Grid xs={4} item>
          <Typography sx={styles.title}>Birthday:</Typography>
        </Grid>
        <Grid xs={7} item>
          <Typography sx={styles.item}>{data.birthday}</Typography>
        </Grid>
      </Grid>
      <Stack direction="row" sx={{ pt: 3, ml: 12}} >
        <CustomOutlineButton onClick={() => {
          navigate('/manager/staff/edit/' + data._id)
        }}>
          Modify
        </CustomOutlineButton>
        <CustomFillButton variant="contained" onClick={handleDelete}>Delete</CustomFillButton>
      </Stack>
    </Box>

  )


}

export default Row