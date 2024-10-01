import { createContext, useState, useEffect } from "react";

export const MoviesContext = createContext(null)

export const MoviesProvider = ({children}) => {
    const [movies, setMovies] = useState(["movie1", "movie2"])
    const [searchInput, setSearchInput] = useState("")
    useEffect(() => {
    // przeniesc logike pobierania danych i wrzucic filmy do "movies"
        const url = `https://api.themoviedb.org/3/search/multi?query=${searchInput}&include_adult=false&language=en-US&page=1`;
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
        console.log("Looking for ", searchInput)
    }, [searchInput])
    return (
        <MoviesContext.Provider value={{movies, searchInput, setSearchInput}}>
            {children}
        </MoviesContext.Provider>
    )
}