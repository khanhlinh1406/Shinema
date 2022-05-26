import React, { useState, useEffect } from 'react'
import { styles } from './styles'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { Switch } from '@mui/material';
import Button from '@mui/material/Button';

import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import mFunction from '../../../function';
import accountApi from './../../../api/accountApi';
import { useNavigate } from 'react-router';

import Message from './../../../components/Message/message';
import Loading from './../../../components/Loading/loading'
import { Success, Error } from './../../../components/Alert/alert'

const NewStaff = () => {
  const navigate = useNavigate()
  const [validName, setValidName] = useState({
    check: true,
    alert: ''
  })

  const [validEmail, setValidEmail] = useState({
    check: true,
    alert: ''
  })

  const [validPhone, setValidPhone] = useState({
    check: true,
    alert: ''
  })

  const [validAddress, setValidAddress] = useState({
    check: true,
    alert: ''
  })

  const [validBirthday, setValidBirthday] = useState({
    check: true,
    alert: ''
  })

  const resetValidation = () => {
    setValidName({
      check: true
    })
    setValidEmail({
      check: true
    })
    setValidPhone({
      check: true
    })
    setValidAddress({
      check: true
    })
    setValidBirthday({
      check: true
    })
  }

  const [values, setValues] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    birthday: '',
    email: '',
    password: '123456',
    gender: 'male',
    role: "Staff",
    enable: true
  })

  const [updateSucceeded, setUpdateSucceeded] = useState({
    status: false,
    message: ''
  })

  const [errorNotification, setErrorNotification] = useState({
    status: false,
    message: ''
  })

  const [isLoading, setIsLoading] = useState(false)
  const [, refresh] = useState()

  const handleChangeValue = (prop) => (event) => {
    if (prop == 'gender') {

      if (event.target.checked === true)
        setValues({ ...values, [prop]: 'male' })
      else
        setValues({ ...values, [prop]: 'female' })
    }
    else
      setValues({ ...values, [prop]: event.target.value });

    setUpdateSucceeded({
      status: false,
      message: '',
      display: false,
    })
  };

  const validate = async () => {
    let flag = true;

    resetValidation()

    if (values.name === undefined || values.name === '') {
      setValidName({
        check: false,
        alert: 'Please enter your name!'
      })
      flag = false;
    }
    else if (!mFunction.onlyLettersAndSpaces(values.name)) {
      setValidName({
        check: false,
        alert: 'Invalid name!'
      })
      flag = false;
    }

    if (values.email === undefined || values.email === '') {
      setValidEmail({
        check: false,
        alert: 'Please enter email'
      })
      flag = false;
    }
    else if (!mFunction.validateEmail(values.email)) {
      setValidEmail({
        check: false,
        alert: 'Your email is not valid!'
      })
      flag = false;
    }
    else {
      await accountApi.checkEmail(values.email)
        .then((res) => {
          if (res.status == 200) {
            setValidEmail({
              check: false,
              alert: 'Your email is already existed'
            })
            flag = false;
            console.log('email existed')
          }
        })

    }

    if (values.phoneNumber === undefined || values.phoneNumber === '') {
      setValidPhone({
        check: false,
        alert: 'Please enter phone number'
      })
      flag = false;
    }
    else if (!mFunction.validatePhoneNumber(values.phoneNumber)) {
      setValidPhone({
        check: false,
        alert: 'Invalid phone number!'
      })
      flag = false;
    }


    if (values.address === undefined || values.address === '') {
      setValidAddress({
        check: false,
        alert: 'Please enter address'
      })
      flag = false;
    }

    if (values.birthday === undefined || values.birthday === '') {
      setValidBirthday({
        check: false,
        alert: 'Please enter birthday'
      })
    }

    return flag;
  }

  const create = async () => {
    if (await validate()) {
      setIsLoading(true)
      await accountApi.createNewAccount(values)
        .then((res) => {
          // console.log(res)
          setUpdateSucceeded({
            status: true,
            message: 'Add new staff successfully!'
          })
          ///setIsLoading(false)
        })
        .catch((err) => {
          console.log(err)
          setErrorNotification({
            status: true,
            message: 'Sorry! There are something wrong with your request'
          })
        })


    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <Typography variant="h5" style={{ fontWeight: 'bold'}}>New staff</Typography>
        <Stack direction="column" >

          <Grid container sx={{ p: 2, ml: 2, mr: 2 }}>
            <Grid xs={4} item >
              <Typography variant="body1" style={styles.typo} >Name: </Typography>
            </Grid>
            <Grid xs={8} item>
              {
                validName.check === true ?
                  <TextField id="standard-basic" label="Name" variant="standard" style = {styles.TextField} onChange={handleChangeValue('name')} />
                  : <TextField id="standard-basic" label="Name" variant="standard" onChange={handleChangeValue('name')} error helperText={validName.alert} style = {styles.TextField}
                  />
              }
            </Grid>

            <Grid xs={4} item >
              <Typography variant="body1" style={styles.typo}>Email: </Typography>
            </Grid>
            <Grid xs={8} item>
              {
                validEmail.check === true ?
                  <TextField id="standard-basic" label="Email" variant="standard" onChange={handleChangeValue('email')} style = {styles.TextField}/>
                  : <TextField id="standard-basic" label="Email" variant="standard" onChange={handleChangeValue('email')} error helperText={validEmail.alert} style = {styles.TextField}
                  />
              }
            </Grid>


            <Grid xs={4} item >
              <Typography variant="body1" style={styles.typo}>Phone number: </Typography>
            </Grid>
            <Grid xs={8} item>
              {
                validPhone.check === true ?
                  <TextField id="standard-basic" label="Phone" variant="standard" onChange={handleChangeValue('phoneNumber')} style = {styles.TextField} />
                  : <TextField id="standard-basic" label="Phone" variant="standard" error helperText={validPhone.alert} onChange={handleChangeValue('phoneNumber')} style = {styles.TextField}
                  />
              }
            </Grid>

            <Grid xs={4} item >
              <Typography variant="body1" style={styles.typo}>Address: </Typography>
            </Grid>
            <Grid xs={8} item>
              {
                validAddress.check === true ?
                  <TextField id="standard-basic" label="Address" variant="standard" onChange={handleChangeValue('address')} style = {styles.TextField}/>
                  : <TextField id="standard-basic" label="Address" variant="standard" error helperText={validAddress.alert} onChange={handleChangeValue('address')} style = {styles.TextField}
                  />
              }
            </Grid>

            <Grid xs={4} item >
              <Typography variant="body1" style={styles.typo}>Birthday: </Typography> 
            </Grid>
            <Grid xs={8} item>
              {
                validBirthday.check === true ?
                  <TextField className="profile-information__item__content"
                    variant="standard"
                    type="date"
                    format="yyyy-MM-dd"
                    sx={{
                      borderRadius: '0.5',
                      input: { color: '#000', marginLeft: 10, marginX: 0.4 },
                      // backgroundColor: 'rgb(9, 24, 48)',
                      // label: { color: 'rgb(153, 153, 153)', fontSize: 15 }
                    }}
                    InputLabelProps={{
                      color: "#fff",
                      style: { color: "#000" },
                      shrink: true,
                    }}

                    InputProps={{
                      style: { color: "#000" },
                    }}

                    onChange={handleChangeValue('birthday')}

                    style = {styles.TextField}
                  />
                  :
                  <TextField className="profile-information__item__content"
                    variant="standard"
                    type="date"
                    format="yyyy-MM-dd"
                    error
                    sx={{
                      borderRadius: '0.5',
                      input: { color: '#000', marginLeft: 10, marginX: 0.4 },
                      // backgroundColor: 'rgb(9, 24, 48)',
                      // label: { color: 'rgb(153, 153, 153)', fontSize: 15 }
                    }}
                    InputLabelProps={{
                      color: "#fff",
                      style: { color: "#000" },
                      shrink: true,
                    }}

                    InputProps={{
                      style: { color: "#000" },
                    }}

                    onChange={handleChangeValue('birthday')}

                    helperText={validBirthday.alert}

                    style = {styles.TextField}
                  />
              }
            </Grid>

            <Grid xs={4} item >
              <Typography variant="body1" style={styles.typo}>Male: </Typography>
            </Grid>
            <Grid xs={8} item >
              <Switch onChange={handleChangeValue('gender')}
                defaultChecked
              // defaultChecked={
              //   staff.gender === 'male' ? true: false
              // }
              />
            </Grid>

            
          </Grid>

          <Stack direction="row" sx={{ p: 1, width: '100%', justifyContent: 'center' }}>
            <CustomFillButton onClick={create}>New</CustomFillButton>
            <CustomOutlineButton onClick={() => navigate(-1)}>Cancel</CustomOutlineButton>
          </Stack>
        </Stack>
      </div>

      {updateSucceeded.status && <Success message={updateSucceeded.message} status={updateSucceeded.status} />}
      {errorNotification.status && <Error message={errorNotification.message} status={errorNotification.status} />}

      {isLoading &&
        <Loading />
      }
    </div>
  )
}


export default NewStaff

const CustomFillButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(grey[900]),
  backgroundColor: grey[900],
  '&:hover': {
    backgroundColor: grey[700],
  },
  padding: '6px 35px',
  marginLeft: '20px',
  borderRadius: '10px'

}));

const CustomOutlineButton = styled(Button)(({ theme }) => ({
  color: grey[900],
  borderColor: grey[900],
  borderWidth: 1,
  borderStyle: 'solid',
  '&:hover': {
    backgroundColor: grey[900],
    color: theme.palette.getContrastText(grey[900]),
  },
  padding: '6px 35px',
  marginLeft: '20px',
  borderRadius: '10px'

}));