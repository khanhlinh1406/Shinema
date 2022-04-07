import './App.css';
import { Routes, Route } from 'react-router-dom';

import { Actor, Censor, Genre, Home, Manager, Review, UserInfor, Login, Register, FilmDetails, MoreFilm } from './containers'
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
        <Route path="/:category/:type" element={<MoreFilm/>}/>
        <Route path="/:category/search/:keyword" element = {<MoreFilm/>}/>
      
      </Routes>
    </div>
  );
}

export default App;
