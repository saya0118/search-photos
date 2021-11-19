import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';
import Icon from './Icon';

const FavList = props => {
  const [favorite, setFavorite] = useState(true);
  const [favImage, setFavImage] = useState([]);

  const onHandleDelete = (arr) => setFavImage(favImage.filter((x,i)=> i !== arr));

    return(
        <div className="main">
        <div className="nav">
          <h1>My favorite photos!</h1>
          <input><a>Go Back</a></input>
        </div>  

        <div className="container">
            <Box sx={{ width: "100%", height: "100vh", overflowY: 'scroll' }}>
            <List variant="masonry"cols={2} gap={8}>
                {props.images.map((image, i) => (
            <ImageListItem key={image.id}>
            <img
              src={`${image.urls.regular}?w=248&fit=crop&auto=format`}
              srcSet={`${image.urls.regular}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={image.alt_description}
              loading="lazy"
            />
            <ImageListItemBar
            sx={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
            }}
            position="top"
            actionIcon={
              <IconButton
                sx={{ color: 'white' }}
                aria-label={`star ${title}`}
                onClick={onClick}
              >
              {favorite ? <FavoriteIcon sx={{ color: 'deeppink'}}/> : (onHandleDelete(i))}
              </IconButton>
            }
            actionPosition="left"
          />
            </ImageListItem>
            ))}
            </List>
            </Box>
      </div>
      </div>
    )
 
}

export default FavList;