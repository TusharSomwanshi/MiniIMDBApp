import React from 'react';
import 'whatwg-fetch';
import { Button } from 'react-bootstrap';

class Search extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      result: [],
      error: false
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnClick(){
    const api_key = `6cf70746523d3806298c3e8a3f27fe47`;
    var movieName = this.refs.movieName.value;
    var url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${movieName}&page=1&include_adult=false`;

    fetch(url)
    .then((response) => response.json())
    .then((result) => this.setState({result: result.results[0], error: false}))
    .catch((error) =>  this.setState({result: [], error}))

  }

  handleOnChange(event){
    const movieName = event.target.value;
  }

  render(){
    const { result, error, movieName } = this.state

    return(
      <div>
        <input type="search" placeholder="Enter movie name to be searched" ref="movieName"/>
        <Button bsStyle="primary" bsSize="large" onClick={this.handleOnClick}>Search</Button>
        <p>
        {
          result.length !== undefined ? 'Loading...' : <img src = {`https://image.tmdb.org/t/p/w185/${result.poster_path}`}/>
        }
        </p>
      </div>
    )
  }
}

export default Search;
