import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CharacterList from './components/CharacterList';
import CharacterDetail from './components/CharacterDetail';
import StarshipList from './components/StarshipList';
import StarshipDetail from './components/StarshipDetail';

function App() {
  return (
    <Router>
      <div className="App">
          <h1>Star Wars Database</h1>
          <nav style={{ marginBottom: '1rem' }}>
              <Link to="/">Characters</Link> |{' '}
              <Link to="/films">Films</Link>
              <Link to="/species">Species</Link>
              <Link to="/starships">Starships</Link>
              <Link to="/vehicles">Vehicles</Link>
          </nav>
          <Routes>
              <Route path="/" element={<CharacterList />} />
              <Route path="/character/:id" element={<CharacterDetail />} />
              <Route path="/starships" element={<StarshipList />} />
              <Route path="/starship/:id" element={<StarshipDetail />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;