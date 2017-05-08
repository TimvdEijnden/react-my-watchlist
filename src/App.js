import React, { Component } from 'react';
import MovieList from './components/movie-list';
import Header from './components/header';

class App extends Component {
  render() {
    return (
      <div>
        <Header title="My IMDB watchlist"/>
        <MovieList focused={true} attach={window}></MovieList>
      </div> 
    );
  }
}

export default App;
