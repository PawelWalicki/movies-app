import { useParams } from "react-router-dom"

export const MovieDetails = () => {
    let {movieId} = useParams()
    return (
        <div>
            Details of movies: {movieId}
        </div>
    )
}