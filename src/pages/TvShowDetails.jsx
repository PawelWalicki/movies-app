import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Loading } from "../components/Loading"
import { Grid2, Button, useMediaQuery } from "@mui/material"
import './TvShowDetails.css'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder';


export const TvShowDetails = () => {
    let { tvshowId } = useParams()
    let [tvShowDetails, setTvShowDetails] = useState({})
    let [isLoading, setIsLoading] = useState(true)
    let [favTvShow, setFavTvShow] = useState([])
    const isMobile = useMediaQuery('(max-width:1100px)')
    useEffect(() => {
        setIsLoading(true)
        const url = `https://api.themoviedb.org/3/tv/${tvshowId}`;
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
                setTvShowDetails(json)
                setIsLoading(false)
            }
            )
            .catch(err => console.error('error:' + err));
        const ls = JSON.parse(localStorage.getItem("favoriteTvShow"))
        const favShows = ls ? ls : []
        setFavTvShow(favShows)
    }, [])

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
    const getNormalizedVote = (vote) => {
        return Math.round((Number(vote) / 2) * 100) / 100
    }
    const modifyFavourites = () => {
        let favLs = localStorage.getItem("favoriteTvShow")
        if (!favLs) {
            localStorage.setItem("favoriteTvShow", JSON.stringify([tvshowId]))
            setFavTvShow([tvshowId])
        }
        else {
            favLs = JSON.parse(favLs)
            if (!favLs.includes(tvshowId)) {
                localStorage.setItem("favoriteTvShow", JSON.stringify([...favLs, tvshowId]))
                setFavTvShow([...favLs, tvshowId])
            } else {
                favLs = favLs.filter(e => e !== tvshowId)
                localStorage.setItem("favoriteTvShow", JSON.stringify(favLs))
                setFavTvShow(favLs)
            }
        }
    }
    return (
        <div className="tvShowDetailsBox">
            <Grid2 container spacing={2} >
                <Grid2 size={isMobile ? 12 : 4}>
                    <div><img className="tvShowImage" style={{ height: 500 }} src={tvShowDetails.poster_path ? `https://image.tmdb.org/t/p/original/${tvShowDetails.poster_path}` : "/poster_not_found.png"} /></div>
                    <button onClick={(e) => modifyFavourites()}>{favTvShow.includes(tvshowId) ? "Remove from favorites" : "Add to favorites"}</button>
                </Grid2>
                <Grid2 container>
                    <div className="glassTvShow">
                        <div className="nameDetails">Original title:</div>
                        <div> {tvShowDetails.name}</div>
                        <div className="nameDetails">Release date: </div>
                        <div>{tvShowDetails.first_air_date}</div>
                        <div className="nameDetails">Last episode to air:</div>
                        <div>{tvShowDetails.last_episode_to_air ? tvShowDetails.last_episode_to_air.air_date : ""}</div>
                        <div className="nameDetails">All season: </div>
                        <div>{tvShowDetails.number_of_seasons}</div>
                        <div className="nameDetails">Original language:</div>
                        <div> {tvShowDetails.original_language.toUpperCase()}</div>
                        <div className="nameDetails">Origin country:</div>
                        <div> {tvShowDetails.origin_country}</div>
                        <div className="nameDetails">Genres: </div>
                        <div>{tvShowDetails.genres.map(e => e.name).join(", ")}</div>
                    </div>
                    <div className="glassTvShow">
                        <div className="nameDetails">Vote average: </div>
                        {generateStars(getNormalizedVote(tvShowDetails.vote_average))}
                        <div> {getNormalizedVote(tvShowDetails.vote_average)}/5</div>
                        <div className="nameDetails">Vote count: </div>
                        <div>{tvShowDetails.vote_count}</div>
                        <div className="nameDetails">{labelIsForAdault(tvShowDetails.adult)}</div>
                    </div>
                </Grid2>
                <Grid2 size={12}>
                    <div className="glassTvShow">
                        <div className="nameDetails">Description: </div>
                        <div>{tvShowDetails.overview}</div>
                    </div>
                </Grid2>
            </Grid2>
            <div className='buttonFavourites'>
                <Link to="/favourites">
                    <Button variant='contained'>FAVOURITES</Button>
                </Link>
            </div>
            <div className="buttonHome">
                <Link to={"/"}>
                    <Button variant='contained'>Home</Button>
                </Link>
            </div>
        </div>
    )
}