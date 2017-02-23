import React from 'react';
import UpcomingMovies from './UpcomingMovies';
import NowPlaying from './NowPlaying';
import Popular from './Popular';
import { Grid, Row, Col } from 'react-bootstrap';

class Homepage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      result: {},
      error: false
    }
  }

  componentDidMount(){
    const api_key = `6cf70746523d3806298c3e8a3f27fe47`;
    var url =  `https://api.themoviedb.org/3/movie/latest?api_key=${api_key}&language=en-US`;
    fetch(url)
    .then((response) => response.json())
    .then((result) => this.setState({result, error: false}))
    .catch((error) =>  this.setState({result: {}, error}))
  }

 render(){
   const { result } = this.state

   return(
     <Grid>
        <Row>
          <Col xs={6} md={4} style={{textAlign:'justify'}}>
            <h3>Upcoming Movies</h3>
            <UpcomingMovies />
          </Col>
          <Col xs={6} md={4} style={{textAlign:'justify'}}>
            <h3>Now Playing</h3>
            <NowPlaying />
          </Col>
          <Col xs={6} md={4} style={{textAlign:'justify'}}>
            <h3>Popular Movies</h3>
            <Popular />
          </Col>
        </Row>
      </Grid>
   )
 }
}

export default Homepage;
