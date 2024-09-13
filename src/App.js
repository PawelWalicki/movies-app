import { useState } from 'react';
import { Button, TextField, Grid2, Container, Stack, ImageList, ImageListItem, useMediaQuery } from '@mui/material';
import { MoviesProvider } from './context/MoviesContext';
import { SearchBar } from './components/SearchBar';
function App() {
  const [input, setInput] = useState("")
  const [movies,setMovies] = useState([])
  const isMobile = useMediaQuery('(max-width:600px)')
  const searchVideos = () =>{
    const url = `https://api.themoviedb.org/3/search/multi?query=${input}&include_adult=false&language=en-US&page=1`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWQ5MDlhMGZlYmQ4MGEzNDAwZGYzOTE0ZTQzNWEzMyIsIm5iZiI6MTcyNTgxNTY1OS41ODk4OTQsInN1YiI6IjY2ZGRkOGVmYWJhOTk4ODlmNDg0YzEzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7ugQOV4GaLGNb63kxQr5xUXT-kOmxEr3kyJIXpB5jfQ'
      }
    };


fetch(url, options)
.then(res => res.json())
.then(json => setMovies(json.results))
.catch(err => console.error('error:' + err));
  }
  return (
    <MoviesProvider>
      <SearchBar></SearchBar>
    <Stack spacing={2} sx={{marginTop: '30px', justifyContent: "center", alignItems: "center"}} >
      <Container>
      <Grid2 container spacing={2} size="grow">
        <Grid2 display="flex"  justifyContent="center" alignItems="center" size="grow">
          <TextField onChange={e=> setInput(e.target.value)} fullWidth id="movie-search" label="Search for movie" variant="outlined"></TextField>
        </Grid2>
        <Grid2 display="flex" justifyContent="center" alignItems="center">
          <Button variant='contained' onClick={() => searchVideos()}>Search</Button>
        </Grid2>
      </Grid2>
      </Container>
      <Container>
        <ImageList cols={isMobile ? 2 : 4}>
          {movies.map((movie) => (
              <ImageListItem>
                <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}/>
                <div>{movie.original_title ? movie.original_title : movie.name}</div>
              </ImageListItem>
          ))}
        </ImageList>
      </Container>
     
    </Stack>
    </MoviesProvider>

  );
}

export default App;
