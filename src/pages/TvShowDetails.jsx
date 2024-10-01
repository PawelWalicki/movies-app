import { useParams } from "react-router-dom"

export const TvShowDetails = () => {
    let {tvshowId} = useParams()
        return (
        <div>
            TV SHOW DETAILS:{tvshowId}
        </div>
    )
}