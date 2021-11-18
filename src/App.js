import React from 'react';
import './App.css';
import axios from 'axios';
import ImageList from './imageList';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

class App extends React.Component{

  state = {
    images: [],
    favorites: [],

    open: false,
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
        x.favorite = false;
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
    this.setState({text:''});
  }

  onHandleLike = (index) => {
    const duplicatedImages = [...this.state.images];
    duplicatedImages[index].favorite = !duplicatedImages[index].favorite;

    const allFavs = [...this.state.favorites, duplicatedImages[index]];
    localStorage.setItem('favorites', JSON.stringify(allFavs));

    this.setState({
      images: duplicatedImages,
      favorites: [...this.state.favorites, duplicatedImages[index]]
    })
  }

  toggleDrawer = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    this.setState({ open: !this.state.open });
  };

  list = () => {

    console.log(this.state.favorites)
    return (
      <Box
          sx={{width: 250}}
          role="presentation"
          onClick={this.toggleDrawer}
          onKeyDown={this.toggleDrawer}
      >
        <List>
          {this.state.favorites.map(x =>
              <ListItem button key={x.id}>
                <ListItemIcon>
                  <InboxIcon/>
                </ListItemIcon>
                <ListItemText primary={x.alt_description}/>
              </ListItem>
          )}
        </List>
      </Box>
    )
  };

  render(){

    return (
      <div className="App">
        <Button onClick={this.toggleDrawer}>Click</Button>
        <Drawer
            anchor="right"
            open={this.state.open}
            onClose={this.toggleDrawer}
        >
          {this.list()}
        </Drawer>
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
