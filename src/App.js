import React from 'react';
import './App.css';
import axios from 'axios';
import ImageList from './imageList';
import FavList from './favList';

class App extends React.Component{
  state = {images: [], text: '', query:'apple', fav:[]}
//   const [images, setImages] = useState([]);
//   const [text, setText] = useState('');
//   const [query, setQuery] = useState('apple');

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

  // console.log('called onSubmit');
} 
// catch (err) {
  
// }

  render(){
    console.log(this.state)
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
            <button type="submit">
              Search
            </button>
          </form>
        </div>  

        <ImageList images={this.state.images}/>
      </div>
    )
  }
}

// function App() {
//   const [images, setImages] = useState([]);
//   const [text, setText] = useState('');
//   const [query, setQuery] = useState('apple');

//   useEffect(() => {
//     console.log('run useEffect');
//     fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.REACT_APP_CLIENT_ID}`)
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//       setImages(data.results)
//       })
//   }, [query])

//   const onSubmit = (e) => {
//     e.preventDefault();
//     setQuery(text);
//     setText('');
//     console.log('called onSubmit');
//   }
//   return (
//     <div className="App">
//       <div className="main">
//         <form onSubmit={onSubmit}>
//           <input
//           type="text"
//           onChange={e => setText(e.target.value)}
//           value={text}
//           />
//           <button type="submit">
//             Search
//           </button>
//         </form>
//       </div>
//       <div className="container">
//         {
//           images.map(image => (
//             <div key={image.id} className="card">
//               <img src={image.urls.regular} className="card-img" alt=""/>
//               <div className="card-content">
//                 <div className="card-title">
//                 {image.alt_description}
//               </div>
//             </div>
//             </div>
//           ))
//         }
//       </div>   
//     </div>
//   )
// }


export default App;
