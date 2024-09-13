import { createContext, useState, useEffect } from "react";

export const MoviesContext = createContext(null)

export const MoviesProvider = ({children}) => {
    const [movies, setMovies] = useState(["movie1", "movie2"])
    const [searchInput, setSearchInput] = useState("")
    useEffect(() => {
    // przeniesc logike pobierania danych i wrzucic filmy do "movies"

        console.log("Looking for ", searchInput)
    }, [searchInput])
    return (
        <MoviesContext.Provider value={{movies, searchInput, setSearchInput}}>
            {children}
        </MoviesContext.Provider>
    )
}