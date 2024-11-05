import { SearchBar } from '../components/SearchBar';
import { MoviesList } from '../components/MoviesList';
import { Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import './HomePage.css'
export const HomePage = () => {


    return (
        <div className='homeBox'>
            <Stack spacing={2} sx={{ marginTop: '30px', justifyContent: "center", alignItems: "center" }} >
                <SearchBar></SearchBar>
                <MoviesList></MoviesList>
            </Stack>
            <div className='buttonFavourites'>
                <Link to="/favourites">
                    <Button variant='contained'>FAVOURITES</Button>
                </Link>
            </div>
            <div className='buttonContact'>
                <Link to="/contact">
                    <Button variant='contained'>CONTACT</Button>
                </Link>
            </div>
        </div>

    )
}