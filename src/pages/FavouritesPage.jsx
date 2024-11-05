import { useEffect, useState } from "react"
import { MovieListItem } from "../components/MovieListItem"
import { Button, Container, ImageList, useMediaQuery } from '@mui/material';
import { Link } from "react-router-dom";
import './FavouritesPage.css'

export const FavouritesPage = () => {
    const [tvShows, setTvShows] = useState([])
    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const isMobile = useMediaQuery('(max-width:600px)')

    useEffect(() => {

        const fetchData = async () => {
            let lsTvShows = JSON.parse(localStorage.getItem("favoriteTvShow")) ?? []
            let lsMovies = JSON.parse(localStorage.getItem("favoriteMovie")) ?? []
            const tvShowPromises = lsTvShows.map((e) => {
                const url = `https://api.themoviedb.org/3/tv/${e}?language=en-US`;
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWQ5MDlhMGZlYmQ4MGEzNDAwZGYzOTE0ZTQzNWEzMyIsIm5iZiI6MTcyNTgxNTY1OS41ODk4OTQsInN1YiI6IjY2ZGRkOGVmYWJhOTk4ODlmNDg0YzEzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7ugQOV4GaLGNb63kxQr5xUXT-kOmxEr3kyJIXpB5jfQ'
                    }
                };

                return fetch(url, options).then(res => res.json())
            })

            const moviePromises = lsMovies.map((e) => {
                const url = `https://api.themoviedb.org/3/movie/${e}?language=en-US`;
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWQ5MDlhMGZlYmQ4MGEzNDAwZGYzOTE0ZTQzNWEzMyIsIm5iZiI6MTcyNTgxNTY1OS41ODk4OTQsInN1YiI6IjY2ZGRkOGVmYWJhOTk4ODlmNDg0YzEzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7ugQOV4GaLGNb63kxQr5xUXT-kOmxEr3kyJIXpB5jfQ'
                    }
                };

                return fetch(url, options).then(res => res.json())
            })
            console.log(tvShowPromises)
            const fetchedTvShows = await Promise.all(tvShowPromises)
            const fetchedMovies = await Promise.all(moviePromises)
            setTvShows(fetchedTvShows)
            setMovies(fetchedMovies)
            setIsLoading(false)
        }
        fetchData()
    }, [])

    if (isLoading) return (
        <div>Loading</div>
    )

    return (
        <div className="favouritesBox">
            <div className={movies.length > 0 ? `containerBox` : ''}>
                <Container >
                    <ImageList cols={isMobile ? 2 : 4}>
                        {
                            [...movies, ...tvShows].map(e => (
                                <MovieListItem movie={e}></MovieListItem>))
                        }
                    </ImageList>
                    <div className="buttonHome">
                        <Link to={"/"}>
                            <Button variant='contained'>Home</Button>
                        </Link>
                    </div>
                </Container>
            </div>
        </div>
    )
}