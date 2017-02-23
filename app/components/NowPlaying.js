import React from 'react';
import { Grid, Row, Col, Thumbnail, Button, Modal, ListGroupItem } from 'react-bootstrap';

class NowPlaying extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      result: {
        results: []
      },
      error: false
    }
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.getUpcomingMovies = this.getUpcomingMovies.bind(this);
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
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
                  <p>{movie.title}</p>
                </Col>
            </Row>
            </ListGroupItem>
            )}
            </Thumbnail>
          </Col>
        </Row>
      </div>
    )
  }
}

export default NowPlaying;
