import './App.css';
import { Routes, Route } from 'react-router-dom';

import { Actor, Censor, Genre, Home, Manager, Review, UserInfor, Login, Register } from './containers'
import { MainNavBar } from './components';

function App() {
  return (
    <div className="App">
      <MainNavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/actors" element={<Actor />} />
        <Route path="/genres" element={<Genre />} />
        <Route path="/reviews" element={<Review />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
