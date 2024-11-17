import { useState } from "react"
import { useMovies } from "../hooks/useMovies"
import { Button, TextField, Grid2, Container } from '@mui/material';

export const SearchBar = () => {
  const { setSearchInput } = useMovies()
  const [input, setInput] = useState("")

  const searchVideos = () => {
    setSearchInput(input)
  }
  const handleEnterKeyPress = (e) => {
    if (e.key == "Enter") {
      searchVideos()
    }
  }

  return (
    <Container>
      <Grid2 container spacing={2} size="grow">
        <Grid2 display="flex" justifyContent="center" alignItems="center" size="grow">
          <TextField onKeyDown={e => handleEnterKeyPress(e)} onChange={e => setInput(e.target.value)} fullWidth id="movie-search" label="Search for movie" variant="outlined" sx={{
            // Root class for the input field
            "& .MuiOutlinedInput-root": {
              color: "#c0c0c0",
              // Class for the border around the input field
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#c0c0c0",
                borderWidth: "2px",
              },
            },
            // Class for the label of the input field
            "& .MuiInputLabel-outlined": {
              color: "#c0c0c0",
            },
          }}></TextField>
        </Grid2>
        <Grid2 display="flex" justifyContent="center" alignItems="center">
          <Button variant='contained' onClick={() => searchVideos()}>Search</Button>
        </Grid2>
      </Grid2>
    </Container>
  )
}