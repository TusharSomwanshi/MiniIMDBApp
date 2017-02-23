import React from 'react';
import { Row, Col, Carousel } from 'react-bootstrap';

class Carousels extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      result: {
        results: []
      },
      error: false
    }
    this.getMovie = this.getMovie.bind(this);
  }

  getMovie(){
    const api_key = `6cf70746523d3806298c3e8a3f27fe47`;
    var url =  `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=en-US&page=1`;
    fetch(url)
    .then((response) => response.json())
    .then((result) => this.setState({result, error: false}))
    .catch((error) =>  this.setState({result: {}, error}))
  }

  componentDidMount(){
    this.getMovie();
  }

  render(){
    const { result } = this.state
    return(
      <Row style={{ height:300 }}>
        <Col xs={6} xsOffset={3}>
          <Row>
            {result.length === 0 ? 'Loading' :
              <Col xs={12}>
                <Carousel>
                {
                  this.state.result.results.map((movie,index) =>
                    <Carousel.Item key={index} style={{ textAlign: 'center' }}>
                      <img
                        style={{ maxHeight: 300, display: 'inline' }}
                        alt="200x200"
                        src={`https://image.tmdb.org/t/p/w600/${movie.poster_path}`}
                      />
                      <Carousel.Caption>
                        <h3>Top Rated Movies</h3>
                      </Carousel.Caption>
                    </Carousel.Item>
                  )
                }
                </Carousel>
              </Col>
           }
          </Row>
        </Col>
      </Row>
    )
  }
}

export default Carousels;
