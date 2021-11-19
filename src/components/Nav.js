import React from 'react';
import axios from 'axios';

class Navigation extends React.Component {

    state = {text: ''}

    onSubmit = (e) => {
      e.preventDefault();
      this.props.onSubmit(this.state.text)
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
