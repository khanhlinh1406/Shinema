import './App.css';
import { Routes, Route } from 'react-router-dom';

import { Actor, Censor, Genre, Home, Manager, Review, UserInfor, Login, Register } from './containers'
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
      </Routes>
    </div>
  );
}

export default App;
