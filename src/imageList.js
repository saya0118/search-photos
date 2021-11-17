import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const ImageList = (props) => {
    console.log(props)
    return(
        <div className="container">
            <Box sx={{ width: "100%", height: "100vh", overflowY: 'scroll' }}>
            <List variant="masonry" cols={3} gap={8}>
                {props.images.map((image) => (
            <ImageListItem key={image.id}>
            <img
              src={`${image.urls.regular}?w=248&fit=crop&auto=format`}
              srcSet={`${image.urls.regular}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={image.alt_description}
              loading="lazy"
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