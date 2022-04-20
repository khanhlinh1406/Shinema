import './App.css';
import { Routes, Route } from 'react-router-dom';

import {
  Actor, Censor, Genre, Home, Manager, Review, Profile, Login, Register,
  FilmDetails, PeopleDetails,
  FilmCorner, Corner
} from './containers'

import { MainNavBar, Footer } from './components';

function App() {
  return (
    <div className="App">

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
            <Footer />
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

      </Routes>


    </div>
  );
}

export default App;
