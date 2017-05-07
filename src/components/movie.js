import React, { Component } from 'react';
import './movie.css';

class Movie extends Component {
  render() {
    return (
      <li className="movie">
       <img src={this.props.data.poster} alt="movie poster"/>
       <h3>{this.props.data.Title}</h3> 
      </li>
    );
  }
}

export default Movie;
