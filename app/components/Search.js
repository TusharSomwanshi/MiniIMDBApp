import React from 'react';
import 'whatwg-fetch';
import { Button, Modal, Row, Col,FormControl } from 'react-bootstrap';

class Search extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      result: [],
      error: false,
      showModal: false
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.getMovieDetails = this.getMovieDetails.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  close() {
    this.setState({ showModal: false });
  }
//comment
  open() {
    const api_key = `6cf70746523d3806298c3e8a3f27fe47`;
    const { movieName } = this.state;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${movieName}&page=1&include_adult=false`;

    if(movieName.length > 0){
      this.setState({
        movieName: ''
      })
    }

    fetch(url)
      .then((response) => response.json())
      .then((result) => this.setState({
        result: result.results[0],
        showModal: true,
      }))
      .catch((error) =>  this.setState({result: [], error}))
      this.getMovieDetails();
  }

  getMovieDetails(){
    return(
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>{this.state.result.original_title}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign:'center'}}>
            <img style={{height:300,width:"50%"}} src={`https://image.tmdb.org/t/p/w185/${this.state.result.poster_path}`}/>
          <p style={{textAlign:'justify'}}><b>Overview: </b>{this.state.result.overview}</p>
          <p style={{textAlign:'justify'}}><b>Popularity: </b>{this.state.result.popularity}</p>
          <p style={{textAlign:'justify'}}><b>Vote Count: </b>{this.state.result.vote_count}</p>
          <p style={{textAlign:'justify'}}><b>Vote Average: </b>{this.state.result.vote_average}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  handleOnChange(event){
    this.setState({
      movieName: event.target.value
    });
  }

  render(){
    const { result, error, movieName, showModal } = this.state
    return(
      <div >
        <Row >
          <Col xs={12} md={11}>
            <FormControl
              type="search"
              placeholder="Enter movie name to be searched"
              value={movieName}
              onChange={this.handleOnChange}
            />&nbsp;
          </Col>
          <Button bsStyle="primary"  onClick={this.open}>Search</Button>
        </Row>
        <p>
        {
          result.length !== undefined ? 'Loading...' : this.getMovieDetails()
        }
        </p>
      </div>
    )
  }
}

export default Search;
