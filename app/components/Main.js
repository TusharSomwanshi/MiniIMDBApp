import React from 'react';
import Search from './Search';
import Navigation from './Nav';
import Homepage from './Homepage';
import 'whatwg-fetch';


class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      result: {},
      error: false
    }

  }

  componentDidMount(){
    const api_key = `6cf70746523d3806298c3e8a3f27fe47`;
    var url = `https://api.themoviedb.org/3/movie/latest?api_key=${api_key}&language=en-US`;

    fetch(url)
    .then((response) => response.json())
   .then((result) => this.setState({result, error: false}))
    .catch((error) =>  this.setState({result: {}, error}))

  }

  render(){
    const { result } = this.state
    return(
      <div>
      <Navigation />
        <Search/>
       <Homepage />
     </div>
    )
  }
}

export default Main;
//
// {
//   result === undefined ? 'Loading...' : result.original_title + result.overview
// }
