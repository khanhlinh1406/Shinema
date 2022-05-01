import './App.css';
import { Routes, Route } from 'react-router-dom';

import {
  Actor, Censor, Genre, Home, Manager, Review, Profile, Login, Register,
  FilmDetails, PeopleDetails,
  FilmCorner, Corner,
  Booking
} from './containers'

import { MainNavBar, Footer } from './components';
import ChatBot from './components/Chatbot';

function App() {
  return (
    <div className="App">
      <ChatBot />

      <Routes>
        <Route path="/" element={
          <div>
            <MainNavBar />
            <Home />
            <Footer />
          </div>
        } />

        <Route path="/actors" element={
          <div>
            <MainNavBar />
            <Actor />
            <Footer />
          </div>
        } />

        <Route path="/genres" element={<div>
          <MainNavBar />
          <Genre />
          <Footer />
        </div>} />

        <Route path="/reviews" element={
          <div>
            <MainNavBar />
            <Review />
            <Footer />
          </div>} />

        <Route path="/manager" element={
          <div>
            <MainNavBar />
            <Manager />
          </div>} />


        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Chi tiết phim */}
        <Route path="/filmDetails/:id" element={
          <div>
            <FilmDetails />
            <Footer />
          </div>
        } />

        {/* Chi tiết người */}
        <Route path="/peopleDetails/:id" element={
          <div>
            <PeopleDetails />
            <Footer />
          </div>
        } />

        {/* Góc phim ảnh */}
        <Route path="corner/movie/search/:keyword" element={
          <div>
            <Corner />
            <Footer />
          </div>
        } />
        <Route path="/corner/movie/:type" element={
          <div>
            <Corner />
            <Footer />
          </div>
        } />

        {/* Góc diễn viên */}
        <Route path="/corner/people" element={
          <div>
            <Corner />
            <Footer />
          </div>
        } />

        <Route path="/corner/people/search/:keyword" element={
          <div>
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
            <MainNavBar />
            <Booking />
            <Footer />
          </div>
        }
        />
      </Routes>


    </div>
  );
}

export default App;
