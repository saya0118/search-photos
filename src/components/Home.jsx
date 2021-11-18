import React from 'react';
import {Link} from 'react-router-dom';

import Navigation from './Nav';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ImageList from './imageList';

const Home = () => {
    return (
        <div className="Home">
            <Navigation />
            <Link to="FavList" />
            <button className="fav-button" type="submit">
                <FavoriteIcon sx={{color: 'deeppink'}}/>
                Saved
            </button>
            <ImageList images={this.state.images}/>
        </div>
    )
}

export default Home;