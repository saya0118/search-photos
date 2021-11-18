import React from 'react';
import './App.css';
import axios from 'axios';

import ImageList from './imageList';
import FabList from './FavList';
import Snackbar from './Snackbar';

import Button from '@mui/material/Button';


class App extends React.Component{

  state = {
    images: [],
    favorites: [],

    open: false,
    snackbar: {
      open: false,
      type: "added"
    },
    text: '',
    query:'apple',
  }

  componentDidMount(){

    const savedImages = localStorage.getItem('favorites');
    if (savedImages) {
      this.setState({ favorites: JSON.parse(savedImages) });
    }

    axios.get("https://api.unsplash.com/photos", {
      params:　{　per_page: 30　},
      headers: {
        Authorization: `Client-ID ${process.env.REACT_APP_CLIENT_ID}`
      }}
    ).then((response) => {
      const items = response.data.map(x => {
        x.favorite = !!JSON.parse(savedImages).some(y => x.id === y.id);
        return x
      })
      this.setState({images: items})
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({query:this.state.text});

    axios.get("https://api.unsplash.com/search/photos", {
      params:{
        query: this.state.text,
        per_page: 30
      },
      headers:{
        Authorization: `Client-ID ${process.env.REACT_APP_CLIENT_ID}`
      }
    }).then((response) => {
      this.setState({images: response.data.results})
    })
    this.setState({ text:'' });
  }

  onHandleLike = (index) => {
    const duplicatedImages = [...this.state.images];

    let allFavs = [];
    if (duplicatedImages[index].favorite) {
      allFavs = this.state.favorites.filter(x => x.id !== duplicatedImages[index].id);
      this.setState({
        snackbar: {
          open: true,
          type: 'removed'
        },
      })
    } else {
      allFavs = [...this.state.favorites, duplicatedImages[index]];
      this.setState({
        snackbar: {
          open: true,
          type: 'added'
        },
      })
    }

    duplicatedImages[index].favorite = !duplicatedImages[index].favorite;

    localStorage.setItem('favorites', JSON.stringify(allFavs));

    this.setState({
      images: duplicatedImages,
      favorites: allFavs,
    })
  }

  onHandleDelete = (item) => {
    const filteredFavorites = this.state.favorites.filter(x => x.id !== item.id);
    const filteredImages = this.state.images.map(x => {
      if (x.id === item.id) x.favorite = false;
      return x
    })

    this.setState({
      favorites: filteredFavorites,
      images: filteredImages,
      snackbar: {
        open: true,
        type: 'removed'
      },
    });

    localStorage.setItem("favorites", JSON.stringify(filteredFavorites));
  }

  toggleDrawer = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    this.setState({ open: !this.state.open });
  };

  render(){
    return (
      <div className="App">
        <Snackbar snackbar={this.state.snackbar} handleClose={() => this.setState({snackbar: {
            open: false,
            type: 'success'
          }})}/>
        <FabList
            favorites={this.state.favorites}
            open={this.state.open}
            onToggle={this.toggleDrawer}
            onHandleDelete={this.onHandleDelete}/>
        <Button onClick={this.toggleDrawer}>Favorites</Button>
        <div className="main">
          <h1>Search your favorite photos!</h1>
          <form onSubmit={this.onSubmit}>
            <input
                type="text"
                onChange={e => this.setState({text: e.target.value})}
                value={this.state.text}
            />
            <button type="submit">Search</button>
          </form>
        </div>
        <ImageList
            images={this.state.images}
            onHandleLike={this.onHandleLike}
        />
      </div>
    )
  }
}

export default App;


