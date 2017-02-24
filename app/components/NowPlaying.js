import React from 'react';
import { Grid, Row, Col, Thumbnail, Button, Modal, ListGroupItem } from 'react-bootstrap';

class NowPlaying extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      result: {
        results: []
      },
      error: false,
      selectedMovie: false
    }
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.getUpcomingMovies = this.getUpcomingMovies.bind(this);
    this.showMovieDetails = this.showMovieDetails.bind(this);
  }

  close() {
    this.setState({ showModal: false });
  }

  open(id) {
    const movie =  this.state.result.results.filter((el) => el.id === id)

    if(movie.length > 0){
      this.setState({
        showModal: true,
        selectedMovie: movie[0]
      });
    }
  }

  showMovieDetails(){
    const { selectedMovie : movie } = this.state;
    const src = movie.poster_path === null ? "https://placehold.it/300?text=image+not+avvailable":`https://image.tmdb.org/t/p/w185/${movie.poster_path}`
    return(
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>{movie.original_title}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign:'center'}}>
            <img style={{height:300,width:"50%"}} src={src}/>
          <p style={{textAlign:'justify'}}><b>Overview: </b>{movie.overview}</p>
          <p style={{textAlign:'justify'}}><b>Popularity: </b>{movie.popularity}</p>
          <p style={{textAlign:'justify'}}><b>Vote Count: </b>{movie.vote_count}</p>
          <p style={{textAlign:'justify'}}><b>Vote Average: </b>{movie.vote_average}</p>
          <p style={{textAlign:'justify'}}><b>Release Date: </b>{movie.release_date}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    )

  }


  getUpcomingMovies(){
    const api_key = `6cf70746523d3806298c3e8a3f27fe47`;
    var url =  `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=en-US&page=1`;
    fetch(url)
    .then((response) => response.json())
    .then((result) => this.setState({result, error: false}))
    .catch((error) =>  this.setState({result: {}, error}))
  }

  componentDidMount(){
     this.getUpcomingMovies();
  }


  render(){
    const { result } = this.state
    return(
      <div className="container">
        <Row>
          <Col className="container-item" xs={6} md={4}>
          <h3 className="h3">Upcoming Movies</h3>
            <Thumbnail className="thumbnail">
            { this.state.result.results.map((movie, index) =>
            <ListGroupItem key={index}>
            <Row className="show-grid">
                <Col xs={1} md={4}>
                  <img style={{height:50,width:"100%"}} src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}/>
                </Col>
                <Col xs={6} md={4}>
                  <p onClick={() => this.open(movie.id)}>{movie.title}</p>
                </Col>
            </Row>
            </ListGroupItem>
            )}
            </Thumbnail>
          </Col>
        </Row>
        {
          result.length === 0 ? '' : this.showMovieDetails()
        }
      </div>
    )
  }
}

export default NowPlaying;
