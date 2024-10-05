import { useMovies } from "../hooks/useMovies"
import { Container, ImageList, ImageListItem, useMediaQuery } from '@mui/material';
import { Link } from "react-router-dom";
export const MoviesList = () => {
    const isMobile = useMediaQuery('(max-width:600px)')
    const { movies } = useMovies()
    return (
        <Container>
            <ImageList cols={isMobile ? 2 : 4}>
                {movies.map((movie) => (
                        <Link to={movie.original_title ? `/movie/${movie.id}` : `/tvshow/${movie.id}`}>
                            <ImageListItem>
                                <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} />
                                 <div>{movie.original_title ? movie.original_title : movie.name}</div>
                    </ImageListItem>
                    </Link>

                ))}
            </ImageList>
        </Container >
    )
}