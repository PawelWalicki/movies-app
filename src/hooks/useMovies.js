import { useContext } from "react"
import { MoviesContext } from "../context/MoviesContext"

export const useMovies = () => {
    const moviesCtx = useContext(MoviesContext)

    if(!moviesCtx) {
        throw new Error("No movies found")
    }
    return moviesCtx
}