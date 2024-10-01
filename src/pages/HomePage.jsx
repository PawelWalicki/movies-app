import { SearchBar } from '../components/SearchBar';
import { MoviesList } from '../components/MoviesList';
import { Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
export const HomePage = () => {


    return (
        <>
            <SearchBar></SearchBar>
            <Stack spacing={2} sx={{ marginTop: '30px', justifyContent: "center", alignItems: "center" }} >

                <MoviesList></MoviesList>
            </Stack>
            <div>
                <Link to="/contact">
                    <Button variant='contained'>CONTACT</Button>
                </Link>
            </div>
        </>

    )
}