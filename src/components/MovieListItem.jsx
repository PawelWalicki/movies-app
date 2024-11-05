import './MovieList.css'
import { Link } from "react-router-dom";
import { ImageListItem } from '@mui/material';
import './MovieListItem.css'

export const MovieListItem = ({movie}) => {
    return (
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
    )
}