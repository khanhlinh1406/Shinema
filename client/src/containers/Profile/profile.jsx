import React from 'react'

import { useState, useEffect } from 'react'

import './profile.css'

import { useSelector, useDispatch } from 'react-redux';
import { userSlice } from './../../redux/slices/userSlice';
import { userSelector } from '../../redux/selector';

import AccountApi from "../../api/accountApi";
import EmailApi from '../../api/emailApi'
import mFunction from "../../function";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red, grey } from "@mui/material/colors";

import { encode } from 'base-64'

import Loading from '../../components/Loading/loading'
import Message from '../../components/Message/message'
import { Success } from '../../components/Alert/alert'

import background_login from '../../assets/background_login.jpg'
import { Helmet } from 'react-helmet';

const Profile = () => {
  const currentUser = useSelector(userSelector);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false)

  const [, refresh] = useState()

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

  const [updateSucceeded, setUpdateSucceeded] = useState({
    status: false,
    message: ''
  })

  useEffect(() => {
    console.log(currentUser)
  }, [])

  useEffect(() => {
    refresh()
  }, [currentUser])

  useEffect(() => {
  }, [updateSucceeded])

  //#region INFORMATION NOTE
  const [nameNote, setNameNote] = useState({
    visible: false,
    type: '',
    message: ''
  })

  const [contactNote, setContactNote] = useState({
    visible: false,
    type: '',
    message: ''
  })

  const [IDNote, setIDNote] = useState({
    visible: false,
    type: '',
    message: ''
  })

  const [addressNote, setAddressNote] = useState({
    visible: false,
    type: '',
    message: ''
  })

  const [birthdayNote, setBirthdayNote] = useState({
    visible: false,
    type: '',
    message: ''
  })

  const [emailNote, setEmailNote] = useState({
    visible: false,
    type: '',
    message: ''
  })

  //#endregion

  //#region PASSWORD NOTE
  const [oldPasswordNote, setOldPasswordNote] = useState({
    visible: false,
    type: '',
    message: ''
  })

  const [newPasswordNote, setNewPasswordNote] = useState({
    visible: false,
    type: '',
    message: ''
  })

  const [repeatNewPasswordNote, setRepeatNewPasswordNote] = useState({
    visible: false,
    type: '',
    message: ''
  })

  //#endregion

  const [values, setValues] = useState({
    name: currentUser.name,
    contact: currentUser.contact,
    identifyNumber: currentUser.identifyNumber,
    address: currentUser.address,
    birthday: currentUser.birthday,
    email: currentUser.email,
    password: currentUser.password,
    rank: currentUser.rank,
    score: currentUser.score,
    listTicketId: currentUser.listTicketId,
    listReview: currentUser.listReviews
  })

  const [passwords, setPasswords] = useState({
    old: currentUser.password,
    new: '',
    repeatNew: ''
  })

  const handleChangeInformation = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setUpdateSucceeded({
      status: false,
      message: ''
    })

  };

  const handleChangePasswords = (prop) => (event) => {
    setPasswords({ ...passwords, [prop]: event.target.value })
    setUpdateSucceeded({
      status: false,
      message: ''
    })
  }

  const validatePassword = async () => {
    let check = true;

    //#region OLD
    if (passwords.old == '' || passwords.old === undefined) {
      setOldPasswordNote({
        ...oldPasswordNote,
        type: 'warning',
        message: 'Please enter your old password',
        visible: true
      })
      check = false;
    }
    else if (encode(passwords.old) != currentUser.password) {
      setOldPasswordNote({
        ...oldPasswordNote,
        type: 'err',
        message: 'Your input is different from your current password',
        visible: true
      })
      check = false;
    }
    else {
      setOldPasswordNote({ ...oldPasswordNote, visible: false })
    }

    //#endregion

    //#region NEW
    if (passwords.new == '' || passwords.new === undefined) {
      setNewPasswordNote({
        ...newPasswordNote,
        type: 'warning',
        message: 'Please enter your new password',
        visible: true
      })
      check = false;
    } else if (!mFunction.validatePassword(passwords.new)) {
      setNewPasswordNote({
        ...newPasswordNote,
        type: 'err',
        message: 'Password must have at least 6 characters',
        visible: true
      })
      check = false;
    } else if (passwords.old == passwords.new) {
      setNewPasswordNote({
        ...newPasswordNote,
        type: 'err',
        message: 'New password must be different from old password',
        visible: true
      })

      check = false;
    }
    else {
      setNewPasswordNote({ ...newPasswordNote, visible: false })
    }
    //#endregion

    //#region REPEAT
    if (passwords.repeatNew == '' || passwords.repeatNew === undefined) {
      setRepeatNewPasswordNote({
        ...repeatNewPasswordNote,
        type: 'warning',
        message: 'Please enter your new password again',
        visible: true
      })
      check = false;
    }
    else if (!mFunction.validatePassword(passwords.repeatNew)) {
      setRepeatNewPasswordNote({
        ...repeatNewPasswordNote,
        type: 'err',
        message: 'Password must have at least 6 characters',
        visible: true
      })
      check = false;
    }
    else if (passwords.new != passwords.repeatNew) {
      setRepeatNewPasswordNote({
        ...repeatNewPasswordNote,
        type: 'err',
        message: 'Repeat password must be same as new password',
        visible: true
      })
      check = false;
    }
    else {
      setRepeatNewPasswordNote({ ...repeatNewPasswordNote, visilbe: false })
    }

    //#endregion


    console.log(passwords)
    return check;
  }

  const changePassword = async () => {
    setValues({
      ...values,
      password: encode(passwords.repeatNew)
    })

    if (validatePassword()) {
      setIsLoading(true)
      await AccountApi.update(values)
        .then((res) => {
          dispatch(userSlice.actions.update(values))
          setIsLoading(false)
          setUpdateSucceeded({
            status: true,
            message: 'Update your password successfully!'
          })
        })
        .catch(err => {
          console.log(err)
          setUpdateSucceeded({
            status: true,
            message: 'Sorry! There are something wrong with your request'
          })
        })

    }


  }

  const validateInformation = () => {
    let check = true;
    if (values.name == "" || values.name === undefined) {
      setNameNote({
        ...nameNote,
        type: 'warning',
        message: 'Please enter your name',
        visible: true
      })

      check = false;
    } else (setNameNote({ ...nameNote, visible: false }))

    if (values.contact == '' || values.contact === undefined) {
      setContactNote({
        ...contactNote,
        type: 'warning',
        message: 'Please enter your phone number',
        visible: true
      })
      check = false;
    } else if (!mFunction.validatePhoneNumber(values.contact)) {
      setContactNote({
        ...contactNote,
        type: 'err',
        message: 'Your input is not a valid phone number format',
        visible: true
      })
      check = false;
    }
    else (setContactNote({ ...contactNote, visible: false }))


    if (values.identifyNumber == '' || values.identifyNumber === undefined) {
      setIDNote({
        ...IDNote,
        type: 'warning',
        message: 'Please enter your identity number',
        visible: true
      })
      check = false;
    }
    else { setIDNote({ ...IDNote, visible: false }) }

    if (values.address == '' || values.address === undefined) {
      setAddressNote({
        ...addressNote,
        type: 'warning',
        message: 'Please enter your address',
        visible: true
      })
      check = false;
    } else { setAddressNote({ ...addressNote, visible: false }) }

    if (values.birthday == '' || values.birthday === undefined) {
      setBirthdayNote({
        ...birthdayNote,
        type: 'warning',
        message: 'Please enter your birthday',
        visible: true
      })
      check = false;
    } else { setBirthdayNote({ ...birthdayNote, visible: false }) }

    // else if ()
    // {
    //   birthday lon hon current date
    //  check = false;
    // }
    return check
  }

  const editProfile = async () => {
    if (validateInformation()) {
      setIsLoading(true)
      console.log(values)
      await AccountApi.update(values)
        .then((res) => {
          dispatch(userSlice.actions.update(values))
          setIsLoading(false)
          setUpdateSucceeded({
            status: true,
            message: 'Update your profile successfully!'
          })
        })
        .catch(err => {
          setUpdateSucceeded({
            status: true,
            message: 'Sorry! There are something wrong with your request'
          })
          console.log(err)
        })
    }
  }

  return (
    //  {currentUser.name != ''?
    <div className="profile__container"
      style={{ backgroundImage: `url(${background_login})` }}
    >
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className="profile__background">
        <div className="color__gradient"></div>
      </div>

      <div className="profile"  >
        <div className="profile-container">
          <div className="profile-information">
            <div className="profile-information__title">ACCOUNT INFORMATION</div>

            <div className="line"></div>

            <div className="profile-information__item">
              <div className="profile-information__item__title">Name</div>
              <ThemeProvider theme={TextFieldTheme}>
                <TextField className="profile-information__item__content"
                  variant="standard"
                  sx={{
                    borderRadius: '0.5',
                    input: { color: 'white', marginLeft: 10, marginX: 0.4 },
                    icons: { color: 'white' }
                    ///backgroundColor: 'rgb(9, 24, 48)',
                    // label: { color: 'rgb(153, 153, 153)', fontSize: 15 }
                  }}
                  defaultValue={currentUser.name}
                  onChange={handleChangeInformation('name')}
                />
              </ThemeProvider>
              {nameNote.visible &&
                <div className="profile-information__item__note">
                  <Message message={nameNote.message} type={nameNote.type} />
                </div>
              }
            </div>

            <div className="profile-information__item">
              <div className="profile-information__item__title">Contact</div>
              <ThemeProvider theme={TextFieldTheme}>
                <TextField className="profile-information__item__content"
                  variant="standard"
                  sx={{
                    borderRadius: '0.5',
                    input: { color: 'white', marginLeft: 10, marginX: 0.4 },
                    //backgroundColor: 'rgb(9, 24, 48)',
                    // label: { color: 'rgb(153, 153, 153)', fontSize: 15 }
                  }}
                  defaultValue={currentUser.contact}
                  onChange={handleChangeInformation('contact')}
                />
              </ThemeProvider>

              {contactNote.visible &&
                <div className="profile-information__item__note">
                  <Message message={contactNote.message} type={contactNote.type}></Message>
                </div>
              }
            </div>

            <div className="profile-information__item">
              <div className="profile-information__item__title">Indentity number</div>
              <ThemeProvider theme={TextFieldTheme}>
                <TextField className="profile-information__item__content"
                  variant="standard"
                  sx={{
                    borderRadius: '0.5',
                    input: { color: 'white', marginLeft: 10, marginX: 0.4 },
                    //backgroundColor: 'rgb(9, 24, 48)',
                    // label: { color: 'rgb(153, 153, 153)', fontSize: 15 }
                  }}
                  defaultValue={currentUser.identifyNumber}
                  onChange={handleChangeInformation('identifyNumber')}
                />
              </ThemeProvider>
              {IDNote.visible &&
                <div className="profile-information__item__note">
                  <Message type={IDNote.type} message={IDNote.message}></Message>
                </div>
              }
            </div>

            <div className="profile-information__item">
              <div className="profile-information__item__title">Address</div>
              <ThemeProvider theme={TextFieldTheme}>
                <TextField className="profile-information__item__content"
                  variant="standard"
                  sx={{
                    borderRadius: '0.5',
                    input: { color: 'white', marginLeft: 10, marginX: 0.4 },
                    //backgroundColor: 'rgb(9, 24, 48)',
                    // label: { color: 'rgb(153, 153, 153)', fontSize: 15 }
                  }}
                  defaultValue={currentUser.address}
                  onChange={handleChangeInformation('address')}
                />
              </ThemeProvider>
              {addressNote.visible &&
                <div className="profile-information__item__note">
                  <Message message={addressNote.message} type={addressNote.type} />
                </div>
              }
            </div>

            <div className="profile-information__item">
              <div className="profile-information__item__title">Birthday</div>
              <ThemeProvider theme={TextFieldTheme}>
                <TextField className="profile-information__item__content"
                  variant="standard"
                  type="date"
                  format="yyyy-MM-dd"
                  sx={{
                    borderRadius: '0.5',
                    input: { color: 'white', marginLeft: 10, marginX: 0.4 },
                    // backgroundColor: 'rgb(9, 24, 48)',
                    // label: { color: 'rgb(153, 153, 153)', fontSize: 15 }
                  }}
                  InputLabelProps={{
                    color: "#fff",
                    style: { color: "#ffff" },
                    shrink: true,
                  }}

                  InputProps={{
                    style: { color: "#ffff" },
                  }}
                  defaultValue={currentUser.birthday}
                  onChange={handleChangeInformation('birthday')}
                />
              </ThemeProvider>

              {birthdayNote.visible &&
                <div className="profile-information__item__note">
                  <Message type={birthdayNote.type} message={birthdayNote.message} />
                </div>
              }
            </div>

            <div className="profile-information__item">
              <div className="profile-information__item__title">Email</div>
              <ThemeProvider theme={TextFieldTheme}>
                <TextField className="profile-information__item__content"
                  variant="standard"
                  sx={{
                    borderRadius: '0.5',
                    input: { color: 'white', marginLeft: 10, marginX: 0.4 },
                    // backgroundColor: 'rgb(9, 24, 48)',
                    // label: { color: 'rgb(153, 153, 153)', fontSize: 15 }
                  }}
                  defaultValue={currentUser.email}
                  onChange={handleChangeInformation('email')}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </ThemeProvider>
              {/* {emailNoteVisible &&
              <div className="profile-information__item__note">
                <Message ></Message>
              </div>
            } */}
            </div>

            <Box textAlign='center' >
              <ThemeProvider theme={ButtonTheme}>
                <Button variant="contained"
                  className='profile-information__btnSave'
                  sx={{
                    padding: 1,
                    marginTop: 3
                  }}
                  onClick={editProfile}
                >SAVE CHANGES</Button>
              </ThemeProvider>
            </Box>
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
                type="password"
                variant='standard'
                autoComplete="current-password"
                sx={{
                  borderRadius: '0.5',
                  input: { color: 'white', marginLeft: 10, marginX: 0.4 },
                  // backgroundColor: 'rgb(9, 24, 48)',
                  // label: { color: 'rgb(153, 153, 153)', fontSize: 15 }
                }}
                onChange={handleChangePasswords('old')}
              />
            </ThemeProvider>
            {oldPasswordNote.visible &&
              <div className="password-information__item__note">
                <Message type={oldPasswordNote.type} message={oldPasswordNote.message} ></Message>
              </div>
            }
          </div>

          <div className="password-information__item">
            <div className="password-information__item__title">New password</div>
            <ThemeProvider theme={TextFieldTheme}>
              <TextField className='password-information__item__txtfield'
                type="password"
                variant='standard'
                autoComplete="current-password"
                sx={{
                  borderRadius: '0.5',
                  input: { color: 'white', marginLeft: 10, marginX: 0.4 },
                  // backgroundColor: 'rgb(9, 24, 48)',
                  // label: { color: 'rgb(153, 153, 153)', fontSize: 15 }
                }}
                onChange={handleChangePasswords('new')}
              />
            </ThemeProvider>
            {newPasswordNote.visible &&
              <div className="password-information__item__note">
                <Message message={newPasswordNote.message} type={newPasswordNote.type}></Message>
              </div>
            }
          </div>

          <div className="password-information__item">
            <div className="password-information__item__title">Repeat new password</div>
            <ThemeProvider theme={TextFieldTheme}>
              <TextField className='password-information__item__txtfield'
                type="password"
                variant='standard'
                autoComplete="current-password"
                sx={{
                  borderRadius: '0.5',
                  input: { color: 'white', marginLeft: 10, marginX: 0.4 },
                  //backgroundColor: 'rgb(9, 24, 48)',
                  // label: { color: 'rgb(153, 153, 153)', fontSize: 15 }
                }}
                onChange={handleChangePasswords('repeatNew')}
              />
            </ThemeProvider>
            {repeatNewPasswordNote.visible &&
              <div className="password-information__item__note">
                <Message type={repeatNewPasswordNote.type} message={repeatNewPasswordNote.message}></Message>
              </div>
            }
          </div>

          <Box textAlign='center'>
            <ThemeProvider theme={ButtonTheme}>
              <Button variant="contained"
                className='password-information__btnChange'
                sx={{
                  padding: 1,
                  marginTop: 3
                }}
                onClick={changePassword}
              >CHANGE PASSWORD</Button>
            </ThemeProvider>
          </Box>
        </div>
      </div >

      {isLoading && <Loading />}
      <Success message={updateSucceeded.message} status={updateSucceeded.status} />
    </div>
    //  : <Loading />
    //         }
  )
}


export default Profile


