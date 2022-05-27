import './App.css';
import { Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { decode } from 'base-64'
import { encode } from 'base-64'

import { useNavigate } from 'react-router-dom';

import {
  Actor, Censor, Genre, Home, Manager, Review, Profile, Login, Register, ForgotPassword,
  FilmDetails, PeopleDetails,
  FilmCorner, Corner,
  Booking
} from './containers'

import { MainNavBar, Footer } from './components';
import ChatBot from './components/Chatbot';

import AccountApi from './api/accountApi'
import { useSelector, useDispatch } from 'react-redux';
import { userSlice } from './redux/slices/userSlice'
import TransactionHistory from './containers/TransactionHistory/transactionHistory';

function App() {
  let navigate = useNavigate();
  const dispatch = useDispatch()

  const _currentUser = useSelector(state => state.users.instance)

  const [loaded, setLoaded] = useState(false)

  const checkLogged = () => {
    let logged = localStorage.getItem('logged')
    let remember = localStorage.getItem('rememberAccount')

    // console.log(remember == 'true')
    // console.log(logged == 'true')
    // console.log(user == null)
    if (remember == 'true' && logged == 'true' && (_currentUser == '' || _currentUser == null)) {
      let email = decode(localStorage.getItem(encode("rememberEmail")))
      let password = decode(localStorage.getItem(encode("rememberPassword")))
      AccountApi.login(email, password)
        .then(res => {
          if (res.data != "Email not exist" && res.data != "Password incorrect") {
            AccountApi.getByEmail(email).then(res => {
              dispatch(userSlice.actions.update(res.data))
              setLoaded(true)
            }).catch(err => console.log(err))
          }
          else {
            localStorage.setItem("logged", false)
            navigate('/login')
          }
        })
        .catch(err => console.log(err))
    }
    else {
      setLoaded(true)
    }
  }

  useEffect((checkLogged), [])

  return (
    <div className="App">

      {
        loaded &&
        <Routes>

          {
            <Route path="*" element={_currentUser != '' && _currentUser.rank != 'Customer' ?
              <Manager />
              :
              <div>
                <ChatBot />
                <MainNavBar />
                <Home />
                <Footer />
              </div>
            } />
          }

          <Route path="/actors" element={
            <div>
              <ChatBot />
              <MainNavBar />
              <Actor />
              <Footer />
            </div>
          } />

          <Route path="/genres" element={<div>
            <ChatBot />
            <MainNavBar />
            <Genre />
            <Footer />
          </div>} />

          <Route path="/reviews/*" element={
            <div>
              <ChatBot />
              <MainNavBar />
              <Review />
              <Footer />
            </div>} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />

          {/* Chi tiết phim */}
          <Route path="/filmDetails/:id" element={
            <div>
              <ChatBot />
              <FilmDetails />
              <Footer />
            </div>
          } />

          {/* Chi tiết người */}
          <Route path="/peopleDetails/:id" element={
            <div>
              <ChatBot />
              <PeopleDetails />
              <Footer />
            </div>
          } />

          {/* Góc phim ảnh */}
          <Route path="corner/movie/search/:keyword" element={
            <div>
              <ChatBot />
              <Corner />
              <Footer />
            </div>
          } />
          <Route path="/corner/movie/:type" element={
            <div>
              <ChatBot />
              <Corner />
              <Footer />
            </div>
          } />

          {/* Góc diễn viên */}
          <Route path="/corner/people" element={
            <div>
              <ChatBot />
              <Corner />
              <Footer />
            </div>
          } />

          <Route path="/corner/people/search/:keyword" element={
            <div>
              <ChatBot />
              <Corner />
              <Footer />
            </div>
          } />

          {/* Thông tin cá nhân */}
          <Route path="/profile" element={
            <div>
              <MainNavBar />
              <Profile />
              <Footer />
            </div>
          }
          />

          {/* Đặt vé */}
          <Route path="/booking/:id" element={
            <div>
              <ChatBot />
              <MainNavBar />
              <Booking />
              <Footer />
            </div>
          }
          />

        <Route path="/transactions" element={
          <div>
            <MainNavBar />
            <TransactionHistory/>
            <Footer/>
          </div>
        }
        />
        </Routes>
      }

    </div>
  );
}

export default App;
