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
        <Route path="/censor" element={<Censor />} />
        <Route path="/genres" element={<Genre />} />
        <Route path="/manager" element={<Manager />} />
        <Route path="/reviews" element={<Review />} />
        <Route path="/userInfor" element={<UserInfor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
