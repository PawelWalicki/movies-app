import { createContext, useState, useEffect } from "react";

export const MoviesContext = createContext(null)
export const MoviesProvider = ({ children }) => {
  const API_KEY = process.env.REACT_APP_API_KEY
  const [movies, setMovies] = useState([])
  const [searchInput, setSearchInput] = useState("")
  useEffect(() => {
    
    const url = `https://api.themoviedb.org/3/search/multi?query=${searchInput}&include_adult=false&language=en-US&page=1`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
      } 
    };


    fetch(url, options)
      .then(res => res.json())
      .then(json => setMovies(json.results))
      .catch(err => console.error('error:' + err));
    console.log("Looking for ", searchInput)
  }, [searchInput])
  return ( 
    <MoviesContext.Provider value={{ movies, searchInput, setSearchInput }}> 
      {children}
    </MoviesContext.Provider>
  )
}