import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

function ImageList (props) {
  const [favIcon, setFavIcon] = useState();
  const [favImage, setFavImage] = useState([]);

  useEffect(() => {
    console.log('run useEffect');
    // favIcon === <FavoriteIcon/> ? 
    // this.setState{{favImage:this.state.images}} :
    
    // IconButton === <FavoriteIcon/> ? <FavoriteBorderIcon/> : <FavoriteIcon/>
  }, [favIcon])

  const onClick = (e) => {
        console.log("click");
        e.preventDefault();
        favIcon === <FavoriteIcon/> ? <FavoriteBorderIcon/> : <FavoriteIcon/>
        // this.setState({favImage:this.state.images.id})      
      }

    return(
        <div className="container">
            <Box sx={{ width: "100%", height: "100vh", overflowY: 'scroll' }}>
            <List variant="masonry"cols={2} gap={8}>
                {props.images.map((image) => (
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
                aria-label={`star ${image.title}`}
                onClick={onClick}
              >
                <FavoriteBorderIcon/>
              </IconButton>
            }
            actionPosition="left"
          />
            </ImageListItem>
            ))}
            </List>
            </Box>

        {/* {
          props.images.map(image => (
            <div key={image.id} className="card">
              <img src={image.urls.regular} className="card-img" alt=""/>
              <div className="card-content">
                <div className="card-title">
                {image.alt_description}
              </div>
            </div>
            </div>
          ))
        } */}
      </div>   




    )
}

export default ImageList;