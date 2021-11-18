import React from 'react';
import './App.css';
import axios from 'axios';
import ImageList from './imageList';

class App extends React.Component{

  state = {
    images: [],
    text: '',
    query:'apple',
  }

  componentDidMount(){
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
    this.setState({
      images: duplicatedImages
    })
  }

  render(){
    return (
      <div className="App">
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
