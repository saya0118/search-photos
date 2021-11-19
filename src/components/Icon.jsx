import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';

const Icon = (props) => {
  const [favorite, setFavorite] = useState(false)
  const [images, setImages] = useState([])


  const onClick = (e) => {
    e.preventDefault()
    setFavorite(!favorite)
    props.addNew(props.image);
  }

  const getFav = () => {
    axios.get("https://api.unsplash.com/search/photos", {

    }).then((response) => {
      console.log(response);
      this.setState({images: response.data})
    })
  }

  return (
    
    <IconButton
      sx={{ color: 'white' }}
      // aria-label={`star ${title}`}
      onClick={onClick}
    >
      {favorite ? <FavoriteIcon sx={{ color: 'deeppink'}}/> : <FavoriteBorderIcon />}
    </IconButton>
  )
}

export default Icon;