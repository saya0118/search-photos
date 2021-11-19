import React from 'react';
import '../App.css';

import axios from 'axios';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from './Home';
import FavList from './favList';


class App extends React.Component{

  state = {images: [], text: '', query:'apple', favorite: []}

    componentDidMount(){

        console.log(process.env);
    
        axios.get("https://api.unsplash.com/photos", {
          params:{
            per_page: 30
          },
    
          headers: {
            Authorization: `Client-ID ${process.env.REACT_APP_CLIENT_ID}`
            // process.envはREACT＿APPを自動で探してくれるよ！
          }
        }).then((response) => {
          console.log(response);
          this.setState({images: response.data})
        })
    }

    addFavorite = (image) => {
      if(this.state.favorite.some((item) => {
        return item.id === image.id ? true : false
      })) {
        const removedFav = this.state.favorite.filter(images => image.id !== images.id)
        this.setState({favorite: removedFav})
      }else{
        let copyFav = [...this.state.favorite];
        copyFav.push(image)
        image === copyFav ? copyFav.filter(image.id) :this.setState({favorite: copyFav})
      };

    }

    removeFavorite = (image) => {
      let copyFav = [...this.state.favorite];
      const removedFav = copyFav.filter(images => image.id !== images.id)
      console.log(removedFav);
      this.setState({favorite: removedFav})
    }

  render(){
    console.log(this.state.favorite);
    return (
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home images={this.state.images} addNew={this.addFavorite}/>} />
        <Route path="/favorite"  element={<FavList favorites={this.state.favorite} deleteFav={this.removeFavorite}/>}/>
      </Routes>
      </BrowserRouter>
    )
  }
}

export default App;