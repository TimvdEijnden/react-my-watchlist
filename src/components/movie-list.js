import React, {Component} from 'react';
import Movie from './movie';
import './movie-list.css';

class MovieList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: []
        };
        fetch('./movies.json').then(response => {
            if (response.ok) {
                response
                    .json()
                    .then(json => {
                        this.setState({movies: json});
                    });
            }
        })
    }

    render() {
        const moviesComponents = this
            .state
            .movies
            .map(movie => {
                return <Movie data={movie} key={movie.id}/>
            });

        return (
            <div className='movie-list'>
                {this.state.movies.length
                    ? (
                        <div className="scroll-container">
                            <ul>
                                {moviesComponents}
                            </ul>
                        </div>
                    )
                    : (
                        <p>loading movies...</p>
                    )}
            </div>
        );
    }
}

export default MovieList;
