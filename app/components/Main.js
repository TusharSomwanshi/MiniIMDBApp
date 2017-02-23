import React from 'react';
import Search from './Search';
import Navigation from './Nav';
import Homepage from './Homepage';
import Carousel from './Carousel';
import 'whatwg-fetch';


class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      result: {},
      error: false
    }
  }

  render(){
    return(
      <div>
        <Navigation />
        <Search/>
        <Carousel />

        <Homepage />
      </div>
    )
  }
}

export default Main;
