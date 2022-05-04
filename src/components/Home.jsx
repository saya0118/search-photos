import React from 'react';
import {Link} from 'react-router-dom';
import Navigation from './Nav';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ImageList from './imageList';

const Home = (props) => {
    return (
        <div className="Home">
            <Navigation onSubmit={props.onSubmit}/>
            <Link to="/favorite">
            <button className="fav-button" type="submit">
                <FavoriteIcon sx={{color: 'deeppink'}}/>
                Saved
            </button>
            </Link>
            <ImageList images={props.images} addNew={props.addNew}/>
        </div>
    )
}

export default Home;
