import React, { useState, useEffect } from 'react'
import { styles } from './styles'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { Switch } from '@mui/material';

import { CustomFillButton, CustomOutlineButton } from '../index'
import { useNavigate, useParams } from 'react-router';

import mFunction from '../../../function';
import accountApi from '../../../api/accountApi';

import Message from './../../../components/Message/message';
import Loading from './../../../components/Loading/loading'
import { Success, Error } from '../../Alert/alert'

const EditStaff = () => {
  const { id } = useParams()
  const [staff, setStaff] = useState({})
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(async () => {
    await accountApi.getById(id)
      .then((res) => {
        console.log(res.data)
        setStaff(res.data)
        setValues({
          _id: res.data._id,
          name: res.data.name,
          phoneNumber: res.data.phoneNumber,
          address: res.data.address,
          birthday: res.data.birthday,
          email: res.data.email,
          gender: res.data.gender
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }, [id])

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
    alert: '',
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
    _id: id,
    name: staff.name,
    phoneNumber: staff.phoneNumber,
    address: staff.address,
    birthday: staff.birthday,
    email: staff.email,
    gender: staff.gender
  })

  const [updateSucceeded, setUpdateSucceeded] = useState({
    status: false,
    message: '',
    display: false
  })

  const [errorNotification, setErrorNotification] = useState({
    status: false,
    message: '',
    display: false
  })

  const handleChangeValue = (prop) => (event) => {
    console.log(event.target.value)
    if (prop !== 'gender')
      setValues({ ...values, [prop]: event.target.value });
    else {
      if (event.target.value === true)
        setValues({ ...values, gender: 'male' })
      else
        setValues({ ...values, gender: 'female' });
    }
  }


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
      console.log(mFunction.containNumeric(values.name))
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
    }
    else {
      await accountApi.checkEmail(values.email)
        .then((res) => {
          if (res == 'Email already exists')
            setValidEmail({
              check: false,
              alert: 'Your email is already existed'
            })
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
    }
    return flag;
  }

  const modify = async () => {
    if (await validate()) {
      setIsLoading(true);
      await accountApi.updateAccount(values)
        .then((res) => {
          setIsLoading(false);
          setUpdateSucceeded({
            status: true,
            message: 'Update your staff successfully!'
          })
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
    <div>
      <div style={styles.container}>
        <Typography variant="h5" style={{fontWeight: 'bold', color: 'red' }}>Modify staff</Typography>
        <Stack direction="column">

          <Grid container sx={{ p: 2, ml: 2, mr: 2 }}>
            <Grid xs={4} item >
              <Typography variant="body1" style={styles.typo}>Name: </Typography>
            </Grid>
            <Grid xs={8} item>
              {
                validName.check === true ?
                  <TextField id="standard-basic" variant="standard" onChange={handleChangeValue('name')} value={values.name} style={styles.TextField}/>
                  : <TextField id="standard-basic" variant="standard" onChange={handleChangeValue('name')} error helperText={validName.alert} style={styles.TextField}
                  />
              }
            </Grid>

            <Grid xs={4} item >
              <Typography variant="body1"style={styles.typo}>Email: </Typography>
            </Grid>
            <Grid xs={8} item>
              {
                validEmail.check === true ?
                  <TextField id="standard-basic"  variant="standard" onChange={handleChangeValue('email')} value={values.email} style={styles.TextField} />
                  : <TextField id="standard-basic"  variant="standard" onChange={handleChangeValue('email')} error helperText={validEmail.alert} style={styles.TextField}
                  />
              }
            </Grid>


            <Grid xs={4} item >
              <Typography variant="body1" style={styles.typo}>Phone number: </Typography>
            </Grid>
            <Grid xs={8} item>
              {
                validPhone.check === true ?
                  <TextField id="standard-basic"  variant="standard" onChange={handleChangeValue('phoneNumber')} value={values.phoneNumber} style={styles.TextField}/>
                  : <TextField id="standard-basic"  variant="standard" error helperText={validPhone.alert} onChange={handleChangeValue('phoneNumber')} style={styles.TextField}/>
                  
              }
            </Grid>

            <Grid xs={4} item >
              <Typography variant="body1" style={styles.typo}>Address: </Typography>
            </Grid>
            <Grid xs={8} item>
              {
                validAddress.check === true ?
                  <TextField id="standard-basic"  variant="standard" style={styles.TextField} onChange={handleChangeValue('address')} value={values.address} />
                  : <TextField id="standard-basic"  variant="standard" style={styles.TextField} error helperText={validAddress.alert} onChange={handleChangeValue('address')}
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
                    style = {styles.TextField}
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
                    defaultValue={values.birthday}
                    onChange={handleChangeValue('birthday')} />
                  :
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
                    style={styles.TextField}
                    InputLabelProps={{
                      color: "#fff",
                      style: { color: "#000" },
                      shrink: true,
                    }}

                    InputProps={{
                      style: { color: "#000" },
                    }}
                    defaultValue={values.birthday}
                    onChange={handleChangeValue('birthday')}
                    error
                    helperText={validBirthday.alert}
                  />
              }
            </Grid>

            {/* <Grid xs={4} item >
              <Typography variant="body1" style={styles.typo}>Male: </Typography>
            </Grid>
            <Grid xs={8} item>
              <Switch onChange={handleChangeValue('gender')}
                
              defaultChecked={
                staff.gender === 'male' ? true: false
              }
              />
            </Grid> */}
          </Grid>

          <Stack direction="row" sx={{ width: '100%', mt: 3, p: 1, justifyContent: 'center', alignItems: 'center' }}>
              <CustomFillButton onClick={modify}>Modify</CustomFillButton>
              <CustomOutlineButton onClick={() => navigate(-1)}>Cancel</CustomOutlineButton>
            </Stack>
        </Stack>
      </div>

      {isLoading && <Loading />}
      <Success message={updateSucceeded.message} status={updateSucceeded.status} />
      {errorNotification.status && <Error message={errorNotification.message} status={errorNotification.status} />}
    </div>
  )

}


export default EditStaff