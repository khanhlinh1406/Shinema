import './App.css';
import { Routes, Route } from 'react-router-dom';

import {
  Actor, Censor, Genre, Home, Manager, Review, UserInfor, Login, Register, 
  FilmDetails, PeopleDetails,
  FilmCorner, Corner
} from './containers'

import { MainNavBar } from './components';

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={
          <div>
            <MainNavBar />
            <Home />
          </div>
        } />

        <Route path="/actors" element={
          <div>
            <MainNavBar />
            <Actor />
          </div>
        } />

        <Route path="/genres" element={<div>
          <MainNavBar />
          <Genre />
        </div>} />

        <Route path="/reviews" element={
          <div>
            <MainNavBar />
            <Review />
          </div>} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Chi tiết phim */}
        <Route path="/filmDetails/:id" element={<FilmDetails />} />

        {/* Chi tiết người */}
        <Route path="/peopleDetails/:id" element={<PeopleDetails/>} />

        {/* Góc phim ảnh */}
        <Route path="corner/movie/search/:keyword" element={<Corner />} />
        <Route path="/corner/movie/:type" element={<Corner />} />

        {/* Góc diễn viên */}
        <Route path="/corner/people" element={<Corner />} />
        <Route path="/corner/people/search/:keyword" element={<Corner />} />

      </Routes>
    </div>
  );
}

export default App;
