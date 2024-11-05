import { useMovies } from "../hooks/useMovies"
import { Container, ImageList, useMediaQuery } from '@mui/material';
import {MovieListItem} from "./MovieListItem"

import './MovieList.css'
export const MoviesList = () => {
    const isMobile = useMediaQuery('(max-width:600px)')
    const { movies } = useMovies()
    return (
        <div className={movies.length > 0 ? `containerBox` : ''}>
            <Container >
                <ImageList cols={isMobile ? 2 : 4}>
                    {movies.map((movie) => (
                        <MovieListItem movie={movie}></MovieListItem>
                    ))}
                </ImageList>
            </Container >
        </div>
    )
}