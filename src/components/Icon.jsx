import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Icon = ({title}) => {
  const [favorite, setFavorite] = useState(false)

  const onClick = (e) => {
    e.preventDefault()
    setFavorite(!favorite)
  }

  return (
    
    <IconButton
      sx={{ color: 'white' }}
      aria-label={`star ${title}`}
      onClick={onClick}
    >
      {favorite ? <FavoriteIcon sx={{ color: 'deeppink'}}/> : <FavoriteBorderIcon />}
    </IconButton>
  )
}

export default Icon;