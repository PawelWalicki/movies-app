import { useEffect, useState } from "react"
import { useMovies } from "../hooks/useMovies"
import { Button, TextField, Grid2, Container, Stack, ImageList, ImageListItem, useMediaQuery } from '@mui/material';

export const SearchBar = () => {
    const {movies, searchInput, setSearchInput} = useMovies()
    const [input, setInput] = useState("")

    const searchVideos = () => {
        setSearchInput(input)
    }

    useEffect(() => {
        console.log(movies)
    }, [searchInput])
    return (
        <Container>
        <Grid2 container spacing={2} size="grow">
          <Grid2 display="flex"  justifyContent="center" alignItems="center" size="grow">
            <TextField onChange={e=> setInput(e.target.value)} fullWidth id="movie-search" label="Search for movie" variant="outlined"></TextField>
          </Grid2>
          <Grid2 display="flex" justifyContent="center" alignItems="center">
            <Button variant='contained' onClick={() => searchVideos()}>Search</Button>
          </Grid2>
        </Grid2>
        </Container>
    )
}