import { MoviesProvider } from './context/MoviesContext';
import { HomePage } from './pages/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NotFound } from './pages/NotFound';
import { MovieDetails } from './pages/MovieDetails';
import { Contact } from './pages/Contact';
import { TvShowDetails } from './pages/TvShowDetails';
function App() {
  
  return (
    <MoviesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/movie/:movieId" element={<MovieDetails/>}></Route>
          <Route path="/tvshow/:tvshowId" element={<TvShowDetails/>}></Route>
          <Route path="/contact" element={<Contact></Contact>}/>
          <Route path="/*" element={<NotFound/>}/>
        </Routes>
      </Router>
    </MoviesProvider>

  );
}

export default App;
