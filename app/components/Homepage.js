import React from 'react';
import { Grid, Row, Col, Thumbnail, Button, Modal } from 'react-bootstrap';

class Homepage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      result: {},
      error: false,
      showModal: false
    }

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
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

   const src = result.poster_path === null ? 'https://placehold.it/300/text=Upcoming' : `https://image.tmdb.org/t/p/w185/${result.poster_path}`

   return(
     <Grid>
        <Row>
          <Col xs={6} md={4}>
            <Thumbnail src={src} alt="242x200">
              <h3>{result.original_title}</h3>
                <p>{result.overview}</p>
                <p>
                  <Button bsStyle="primary"
                      bsSize="large"
                      onClick={this.open}>
                      Get details
                </Button>
                <Modal show={this.state.showModal} onHide={this.close}>
         <Modal.Header closeButton>
           <Modal.Title>{result.original_title}</Modal.Title>
         </Modal.Header>
         <Modal.Body>
           <p>{result.overview}</p>
         </Modal.Body>
         <Modal.Footer>
           <Button onClick={this.close}>Close</Button>
         </Modal.Footer>
       </Modal>
                </p>
            </Thumbnail>
          </Col>
          <Col xs={6} md={4}>
            <Thumbnail src={src} alt="242x200">
              <h3>Thumbnail label</h3>
              <p>Description</p>
              <p>
                <Button bsStyle="primary">Button</Button>&nbsp;
                <Button bsStyle="default">Button</Button>
              </p>
            </Thumbnail>
          </Col>
          <Col xs={6} md={4}>
            <Thumbnail src="/assets/thumbnaildiv.png" alt="242x200">
              <h3>Thumbnail label</h3>
              <p>Description</p>
              <p>
                <Button bsStyle="primary">Button</Button>&nbsp;
                <Button bsStyle="default">Button</Button>
              </p>
            </Thumbnail>
          </Col>
        </Row>
      </Grid>
   )
 }
}

export default Homepage;
