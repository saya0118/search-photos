import React from 'react';
import axios from 'axios';

class Navigation extends React.Component {

    state = {images: [], text: '', query:'apple'}

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
        // getData(()=>{
          // this.setState({images:items})
        // })
        // console.log('run useEffect');
        
      //   fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.REACT_APP_CLIENT_ID}`)
      //   .then(response => response.json())
      //   .then(data => {
      //     console.log(data);
      //     setImages(data.results)
      //     })
      // }, [query]
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
        console.log(response);
        this.setState({images: response.data.results})
      })
      this.setState({text:''});
    } 
    
    render(){
        return(
          <div className="main">
            <h1>Search your favorite photos!</h1>
            <form onSubmit={this.onSubmit}>
              <input
                type="text"
                onChange={e => this.setState({text: e.target.value})}
                value={this.state.text}
              />
              <button className="search-button" type="submit">
                Search
              </button>
            </form>
          </div>
        );
    }
}

export default Navigation;