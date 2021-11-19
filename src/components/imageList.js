import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Icon from './Icon';

function ImageList (props) {
  // const [favorite, setFavorite] = useState(false);
  const [images, setImages] = useState([]);
  // const [favImage, setFavImage] = useState([]);
  // const [error, setError] = useState(false);

  useEffect(() => {
    console.log('run useEffect');
    fetch(`https://api.unsplash.com/search/photos?query=${props.query}&client_id=${process.env.REACT_APP_CLIENT_ID}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setImages(data.results);
      })
    // .catch(error => {
    //   console.log(error);
    //   setError(true);
    // })   
  }, [props.query])

    return(
        <div className="container">
            <Box sx={{ width: "100%", height: "100vh", overflowY: 'scroll' }}>
              {props.images.length===0 ?
              <div className="no-result">
                  No Result
              </div> :
            <List variant="masonry" cols={2} gap={8}>
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
              <Icon addNew={props.addNew} image={image}/>
            }
            actionPosition="left"
          />
            </ImageListItem>
            ))}
            </List>
              }     
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