import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Loading } from "../components/Loading"
import { Button, Grid2, useMediaQuery } from "@mui/material"
import './MovieDetails.css'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder';

export const MovieDetails = () => {
    let { movieId } = useParams()
    let [movieDetails, setMovieDetails] = useState({})
    let [isLoading, setIsLoading] = useState(true)
    let [favMovies, setFavMovies] = useState([])
    const isMobile = useMediaQuery('(max-width:1100px)')
    useEffect(() => {
        setIsLoading(true)
        const url = `https://api.themoviedb.org/3/movie/${movieId}`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWQ5MDlhMGZlYmQ4MGEzNDAwZGYzOTE0ZTQzNWEzMyIsIm5iZiI6MTcyNTgxNTY1OS41ODk4OTQsInN1YiI6IjY2ZGRkOGVmYWJhOTk4ODlmNDg0YzEzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7ugQOV4GaLGNb63kxQr5xUXT-kOmxEr3kyJIXpB5jfQ'
            }
        };
        fetch(url, options)
            .then(res => res.json())
            .then(json => {
                setMovieDetails(json)
                setIsLoading(false)
            }
            )
            .catch(err => console.error('error:' + err));
        let favMoviesLs = JSON.parse(localStorage.getItem("favoriteMovie"))
        setFavMovies(favMoviesLs || [])
    }, [])

    const getNormalizedVote = (vote) => {
        return Math.round((Number(vote) / 2) * 100) / 100
    }

    if (isLoading) {
        return (
            <Loading />
        )
    }

    const labelIsForAdault = (isForAdult) => {
        return isForAdult ? "For adults audiences" : "Not only for adults"
    }

    const generateStars = (vote) => {
        const arr = []
        let i = 1
        for (; i < vote; i++) {
            arr.push(<StarIcon />)
        }
        for (; i <= 5; i++) {
            arr.push(<StarBorderIcon />)
        }
        return arr
    }
    // favourites [123,4234,54,33]
    const modifyFavourites = () => {
        let favLs = localStorage.getItem("favoriteMovie")
        if (!favLs) {
            localStorage.setItem("favoriteMovie", JSON.stringify([movieId]))
            setFavMovies([movieId])
        }
        else {
            favLs = JSON.parse(favLs)
            if (!favLs.includes(movieId)) {
                localStorage.setItem("favoriteMovie", JSON.stringify([...favLs, movieId]))
                setFavMovies([...favLs, movieId])
            } else {
                favLs = favLs.filter(e => e !== movieId)
                localStorage.setItem("favoriteMovie", JSON.stringify(favLs))
                setFavMovies(favLs)
            }
        }
    }

    return (
        <div className="movieDetailsBox">
            <Grid2 container spacing={2}>
                <Grid2 size={isMobile ? 12 : 4}>
                    <div><img className="movieImage" style={{ height: 500 }} src={movieDetails.poster_path ? `https://image.tmdb.org/t/p/original/${movieDetails.poster_path}` : "/poster_not_found.png"} /></div>
                    <button onClick={(e) => modifyFavourites()}>{favMovies.includes(movieId) ? "Remove from favorites" : "Add to favorites"}</button>
                </Grid2>
                <Grid2 container>
                    <div className="glassMovie">
                        <div className="nameDetails">Original title:</div>
                        <div> {movieDetails.original_title}</div>
                        <div className="nameDetails">Release date:</div>
                        <div> {movieDetails.release_date}</div>
                        <div className="nameDetails">Duration:</div>
                        <div> {movieDetails.runtime} min</div>
                        <div className="nameDetails">Original language:</div>
                        <div>{movieDetails.original_language.toUpperCase()}</div>
                        <div className="nameDetails">Budget:</div>
                        <div> {movieDetails.budget} $</div>
                        <div className="nameDetails">Genres:</div>
                        <div> {movieDetails.genres.map(e => e.name).join(", ")}</div>
                    </div>
                    <div className="glassMovie">
                        <div className="nameDetails">Vote average:</div>
                        {generateStars(getNormalizedVote(movieDetails.vote_average))}
                        <div> {getNormalizedVote(movieDetails.vote_average)}/5</div>
                        <div className="nameDetails">Vote count:</div>
                        <div> {movieDetails.vote_count}</div>
                        <div className="nameDetails">{labelIsForAdault(movieDetails.adult)}</div>
                    </div>
                </Grid2>
                <Grid2 size={12}>
                    <div className="glassMovie">
                        <div className="nameDetails">Description: </div>
                        <div>{movieDetails.overview}</div>
                    </div>
                </Grid2>
            </Grid2>
            <div className="buttonHome">
                <Link to={"/"}>
                    <Button variant='contained'>Home</Button>
                </Link>
            </div>


        </div>
    )
}