import { Link } from "react-router-dom"
import { Button} from "@mui/material"
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import './Contact.css'
export const Contact = () => {
    return (
        <div className="contactBox">           
           <a className="icons" href="https://github.com/PawelWalicki/movies-app"><GitHubIcon fontSize="large"/></a>
           <a className="icons" href="https://www.linkedin.com/in/paweł-walicki-a39b09176/"><LinkedInIcon fontSize="large"/></a>
        
            <div className="buttonHome">
                <Link to={"/"}>
                    <Button variant='contained'>Home</Button>
                </Link>
            </div>
        </div>
    )
}