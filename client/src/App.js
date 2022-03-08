import './App.css';
import { Routes, Route, Link } from 'react-router-dom';

import { Home, Movie, Actor } from './containers'
import { MainNavBar } from './components';

function App() {
  return (
    <div className="App">
      <MainNavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movie />} />
        <Route path="/actors" element={<Actor />} />
      </Routes>
    </div>
  );
}

export default App;
