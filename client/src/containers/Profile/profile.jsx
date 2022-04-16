import React from 'react'

import { useState, useEffect } from 'react'

import './profile.css'

import { useSelector, useDispatch } from 'react-redux';
import { userSlice } from './../../redux/slices/userSlice';
import { userSelector } from '../../redux/selector';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { BiError } from 'react-icons/bi'

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red, grey } from "@mui/material/colors";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const currentUser = useSelector(userSelector)
  const dispatch = useDispatch();

  const [nameErrVisible, setNameErrVisible] = useState(false)
  const [contactErrVisible, setContactErrVisible] = useState(false)
  const [IDErrVisible, setIDErrVisible] = useState(false)
  const [addressErrVisible, setAddressErrVisible] = useState(false)
  const [birthdayErrVisible, setBirthdayErrVisible] = useState(false)
  const [emailErrVisible, setEmailErrVisible] = useState(false)

  useEffect(() => {
    ///console.log(currentUser)
  }, [])

  const TextFieldTheme = createTheme({
    shape: {
      borderRadius: 20
    },
    palette: {
      primary: grey
    },
    text: grey
  })

  const ButtonTheme = createTheme({
    shape: {
      borderRadius: 20
    },
    palette: {
      primary: red
    },
  })

  return (
    <div className="profile">
      <div className="profile-container">
        <div className="profile-information">
          <div className="profile-information__title">ACCOUNT INFORMATION</div>

          <div className="line"></div>

          <div className="profile-information__item">
            <div className="profile-information__item__title">Name</div>
            <ThemeProvider theme={TextFieldTheme}>
              <TextField className="profile-information__item__content"
                variant="filled"
                sx={{
                  borderRadius: '0.5',
                  input: { color: 'white', marginLeft: 10, marginX: 0.4 },
                  backgroundColor: 'rgb(9, 24, 48)',
                  // label: { color: 'rgb(153, 153, 153)', fontSize: 15 }
                }} />
            </ThemeProvider>
            <div className="profile-information__item__note">
              <Message ></Message>
            </div>
          </div>

          <div className="profile-information__item">
            <div className="profile-information__item__title">Contact</div>
            <ThemeProvider theme={TextFieldTheme}>
              <TextField className="profile-information__item__content"
                variant="filled"
                sx={{
                  borderRadius: '0.5',
                  input: { color: 'white', marginLeft: 10, marginX: 0.4 },
                  backgroundColor: 'rgb(9, 24, 48)',
                  // label: { color: 'rgb(153, 153, 153)', fontSize: 15 }
                }} />
            </ThemeProvider>
            <div className="profile-information__item__note">
              <Message ></Message>
            </div>
          </div>

          <div className="profile-information__item">
            <div className="profile-information__item__title">Indentify number</div>
            <ThemeProvider theme={TextFieldTheme}>
              <TextField className="profile-information__item__content"
                variant="filled"
                sx={{
                  borderRadius: '0.5',
                  input: { color: 'white', marginLeft: 10, marginX: 0.4 },
                  backgroundColor: 'rgb(9, 24, 48)',
                  // label: { color: 'rgb(153, 153, 153)', fontSize: 15 }
                }} />
            </ThemeProvider>
            <div className="profile-information__item__note">
              <Message ></Message>
            </div>
          </div>

          <div className="profile-information__item">
            <div className="profile-information__item__title">Address</div>
            <ThemeProvider theme={TextFieldTheme}>
              <TextField className="profile-information__item__content"
                variant="filled"
                sx={{
                  borderRadius: '0.5',
                  input: { color: 'white', marginLeft: 10, marginX: 0.4 },
                  backgroundColor: 'rgb(9, 24, 48)',
                  // label: { color: 'rgb(153, 153, 153)', fontSize: 15 }
                }} />
            </ThemeProvider>
            <div className="profile-information__item__note">
              <Message ></Message>
            </div>
          </div>

          <div className="profile-information__item">
            <div className="profile-information__item__title">Birthday</div>
            <ThemeProvider theme={TextFieldTheme}>
              <TextField className="profile-information__item__content"
                variant="filled"
                type="date"
                sx={{
                  borderRadius: '0.5',
                  input: { color: 'white', marginLeft: 10, marginX: 0.4 },
                  backgroundColor: 'rgb(9, 24, 48)',
                  // label: { color: 'rgb(153, 153, 153)', fontSize: 15 }
                }} />
            </ThemeProvider>
            <div className="profile-information__item__note">
              <Message ></Message>
            </div>
          </div>

          <div className="profile-information__item">
            <div className="profile-information__item__title">Email</div>
            <ThemeProvider theme={TextFieldTheme}>
              <TextField className="profile-information__item__content"
                variant="filled"
                sx={{
                  borderRadius: '0.5',
                  input: { color: 'white', marginLeft: 10, marginX: 0.4 },
                  backgroundColor: 'rgb(9, 24, 48)',
                  // label: { color: 'rgb(153, 153, 153)', fontSize: 15 }
                }} />
            </ThemeProvider>
            <div className="profile-information__item__note">
              <Message ></Message>
            </div>
          </div>

          <Box textAlign='center' >
            <ThemeProvider theme={ButtonTheme}>
              <Button variant="contained"
                className='profile-information__btnSave'
                sx={{
                  padding: 1,
                  marginTop: 3
                }}
              >SAVE CHANGES</Button>
            </ThemeProvider>
          </Box>
        </div>

        <div className="profile-pic">
          <img className='profile-pic__img' src='' />
          <Box textAlign='center'>
            <ThemeProvider theme={ButtonTheme}>
              <Button variant="contained" className='profile-pic__btnChange'
                sx={{
                  padding: 1,
                  marginTop: 3
                }}
              >CHANGE</Button>
            </ThemeProvider>
          </Box>
          <div className="profile-pic__note">Acceptable formats .png and .jpg only</div>
        </div>

        <div className="clear"></div>
      </div>

      <div className="password-information">
        <div className="password-information__title">CHANGE YOUR PASSWORD</div>
        <div className="line"></div>
        <div className="password-information__item">
          <div className="password-information__item__title">Old password</div>
          <ThemeProvider theme={TextFieldTheme}>
            <TextField className='password-information__item__txtfield'
              id="outlined-password-input"
              label="Old password"
              type="password"
              variant='filled'
              autoComplete="current-password"
              sx={{
                borderRadius: '0.5',
                input: { color: 'white', marginLeft: 10, marginX: 0.4 },
                backgroundColor: 'rgb(9, 24, 48)',
                // label: { color: 'rgb(153, 153, 153)', fontSize: 15 }
              }}
            />
          </ThemeProvider>
          <div className="password-information__item__note">
            <Message ></Message>
          </div>
        </div>

        <div className="password-information__item">
          <div className="password-information__item__title">New password</div>
          <ThemeProvider theme={TextFieldTheme}>
            <TextField className='password-information__item__txtfield'
              id="outlined-password-input"
              label="Old password"
              type="password"
              variant='filled'
              autoComplete="current-password"
              sx={{
                borderRadius: '0.5',
                input: { color: 'white', marginLeft: 10, marginX: 0.4 },
                backgroundColor: 'rgb(9, 24, 48)',
                // label: { color: 'rgb(153, 153, 153)', fontSize: 15 }
              }}
            />
          </ThemeProvider>
          <div className="password-information__item__note">
            <Message ></Message>
          </div>
        </div>

        <div className="password-information__item">
          <div className="password-information__item__title">Repeat new password</div>
          <ThemeProvider theme={TextFieldTheme}>
            <TextField className='password-information__item__txtfield'
              id="outlined-password-input"
              label="Old password"
              type="password"
              variant='filled'
              autoComplete="current-password"
              sx={{
                borderRadius: '0.5',
                input: { color: 'white', marginLeft: 10, marginX: 0.4 },
                backgroundColor: 'rgb(9, 24, 48)',
                // label: { color: 'rgb(153, 153, 153)', fontSize: 15 }
              }}
            />
          </ThemeProvider>
          <div className="password-information__item__note">
            <Message ></Message>
          </div>
        </div>

        <Box textAlign='center'>
          <ThemeProvider theme={ButtonTheme}>
            <Button variant="contained"
              className='password-information__btnChange'
              sx={{
                padding: 1,
                marginTop: 3
              }}
            >CHANGE PASSWORD</Button>
          </ThemeProvider>
        </Box>
      </div>
    </div>
  )
}


export default Profile

const Message = props => {
  const mess = props.message;
  const type = props.type

  return (
    <div className="login__form__message" style={{ color: type == 'err' ? 'rgb(192, 7, 7)' : '#e9be00' }}>
      <BiError size={15} />
      <p>{mess}</p>
    </div >
  )
}
