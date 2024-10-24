import { useMovies } from "../hooks/useMovies"
import { Container, ImageList, ImageListItem, useMediaQuery } from '@mui/material';
import { Link } from "react-router-dom";
import './MovieList.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
export const MoviesList = () => {
    const isMobile = useMediaQuery('(max-width:600px)')
    const { movies } = useMovies()
    return (
        <div className={movies.length > 0 ? `containerBox` : ''}>
            <Container >
                <ImageList cols={isMobile ? 2 : 4}>
                    {movies.map((movie) => (
                        <div className="MovieListMap">
                            <Link style={{textDecoration: 'none'}} key={movie.id} to={movie.original_title ? `/movie/${movie.id}` : `/tvshow/${movie.id}`}>

                                <ImageListItem>
                                    <img
                                        src={movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : "/poster_not_found.png"}
                                    />
                                    <div className="titleMovieTvShow">{movie.original_title ? movie.original_title : movie.name}</div>
                                </ImageListItem>
                            </Link>
                        </div>
                    ))}
                </ImageList>
            </Container >
        </div>
    )
}