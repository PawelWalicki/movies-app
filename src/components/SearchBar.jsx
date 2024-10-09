import { useState } from "react"
import { useMovies } from "../hooks/useMovies"
import { Button, TextField, Grid2, Container } from '@mui/material';

export const SearchBar = () => {
    const { setSearchInput} = useMovies()
    const [input, setInput] = useState("")

    const searchVideos = () => {
        setSearchInput(input)
    }

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