import React from 'react';
import 'whatwg-fetch';
import { Button, Modal, Row, Col,FormControl } from 'react-bootstrap';

class Playground extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      result: [],
      error: false,
      showModal: false,
      selectedMovie: false
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.getMovieName = this.getMovieName.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.showMovieDetails = this.showMovieDetails.bind(this);
  }

  close() {
    this.setState({
      selectedMovie: false,
      showModal: false
    });
  }

  open(id) {
    console.log(id);
    const movie = this.state.result.filter((el) => el.id === id )

    if(movie.length > 0)
    {
      this.setState({
        selectedMovie: movie[0],
        showModal: true
    })}
  }

  showMovieDetails(){
    const { selectedMovie: movie } = this.state;
    return(
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>{movie.original_title}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign:'center'}}>
            <img style={{height:300,width:"50%"}} src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}/>
          <p style={{textAligndata:'justify'}}><b>Overview: </b>{movie.overview}</p>
          <p style={{textAlign:'justify'}}><b>Popularity: </b>{movie.popularity}</p>
          <p style={{textAlign:'justify'}}><b>Vote Count: </b>{movie.vote_count}</p>
          <p style={{textAlign:'justify'}}><b>Vote Average: </b>{movie.vote_average}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    )

  }

  getMovieName(){
    const counter = 0;
    return(

      <div className="autosuggest">
        {
          this.state.result.map((movie,index) => {
            return(
              <p key={index} onClick={() => this.open(movie.id)}>
                {index<5 ? `${movie.original_title}` : '' }
              </p>
            )
          }
      )}
      </div>
    )

  }

  handleOnChange(event){

    const  movieName = event.target.value
    const api_key = `6cf70746523d3806298c3e8a3f27fe47`;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${movieName}&page=1&include_adult=false`;

    fetch(url)
      .then((response) => response.json())
      .then((result) => { this.setState({
        result: result.results,
        error: false
      })
    })

      .catch((error) =>  this.setState({
        result: [],
        error: 'Movie not found'
      }))
  }

  render(){
    const { result, error, movieName, showModal } = this.state
    return(
      <div>
        { this.showMovieDetails() }
        <Row >
          <Col xs={12} md={11}>
            <FormControl
              type="search"
              placeholder="Enter movie name to be searched"
              value={movieName}
              onChange={this.handleOnChange}
            />&nbsp;
          </Col>
        </Row>
        <p>
        {
          result.length === 0 ? 'Loading...' : this.getMovieName()
        }
        </p>
      </div>
    )
  }
}

export default Playground;
