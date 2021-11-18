import React from 'react';
import '../App.css';

import axios from 'axios';
import {BrowserRouter, Route} from 'react-router-dom';

import Home from './Home';
import FavList from './favList';


class App extends React.Component{
  render(){
    return (
      // <BrowserRouter>
      <div className="App"> 
        {/* <Route exact path="./"> */}
          <Home/>
        {/* </Route> */}
        {/* <Route path="./favorite"> */}
          <FavList/>
        {/* </Route> */}
      </div>
      // </BrowserRouter>
    )
  }
}

export default App;