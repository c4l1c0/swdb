import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CharacterList from './components/CharacterList';
import CharacterDetail from './components/CharacterDetail';

function App() {
  return (
    <Router>
      <div className="App">
          <h1>Star Wars Database</h1>
          <Routes>
              <Route path="/" element={<CharacterList />} />
              <Route path="/character/:id" element={<CharacterDetail />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;