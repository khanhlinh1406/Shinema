import './App.css';
import { Routes, Route } from 'react-router-dom';

import { Actor, Censor, Genre, Home, Manager, Review, UserInfor, Login, Register, FilmDetails, 
  FilmCorner, Corner } from './containers'

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
        <Route path="/filmDetails" element={<FilmDetails/>} />
        {/* <Route path="corner/:category/:type" element={<FilmCorner/>}/> */}

        {/* Góc phim ảnh */}
        <Route path="corner/movie/search/:keyword" element = {<Corner/>}/>
        <Route path="/corner/movie/:type" element = {<Corner/>}/>

        {/* Góc diễn viên */}
        <Route path="/corner/cast" element = {<Corner/>}/>
      
      </Routes>
    </div>
  );
}

export default App;
