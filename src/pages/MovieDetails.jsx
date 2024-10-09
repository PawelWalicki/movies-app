import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Loading } from "../components/Loading"
import { Grid2 } from "@mui/material"

export const MovieDetails = () => {
    let { movieId } = useParams()
    let [movieDetails, setMovieDetails] = useState({})
    let [isLoading, setIsLoading] = useState(true)
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
    }, [])

    if (isLoading) {
        return (
            <Loading />
        )
    }

    const labelIsForAdault = (isForAdult) => {
        return isForAdult ? "Film dla doroslych" :  "Film moze byc obgladany przez dzieci"
    }

    return (
        <div>
            <Grid2 container spacing={2}>
                <Grid2 size={4}>
                    <div><img style={{ height: 500 }} src={`https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`} /></div>
                </Grid2>
                <Grid2 size={4}>
                    <div>Title: {movieDetails.title}</div>
                    <div>Original title: {movieDetails.original_title}</div>
                    <div>Release date: {movieDetails.release_date}</div>
                    <div>Duration: {movieDetails.runtime} min</div>
                    <div>Original language: { movieDetails.original_language.toUpperCase()}</div>
                    <div>{labelIsForAdault(movieDetails.adult)}</div>
                    <div>Budget {movieDetails.budget} $</div>
                    <div>Genres: {movieDetails.genres.map(e => e.name).join(" ")}</div>
                </Grid2>
                <Grid2 size={4}>
                    <div>Vote average: {movieDetails.vote_average}</div>
                    <div>Vote count: {movieDetails.vote_count}</div>
                </Grid2>
                <Grid2 size={8}>
                    <div>Description: </div>
                    <div>{movieDetails.overview}</div>
                </Grid2>
            </Grid2>
        </div>
    )
}