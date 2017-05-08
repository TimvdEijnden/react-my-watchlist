import React, {Component} from 'react';
import Movie from './movie';
import './movie-list.css';

class MovieList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            selectedIndex: 0
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

    _selectNext() {
        this.setState({
            ...this.state,
            selectedIndex: this.state.selectedIndex + 1
        });
    }

    _selectPrevious() {
        this.setState({
            ...this.state,
            selectedIndex: this.state.selectedIndex - 1
        });
    }

    componentWillMount() {
        document.addEventListener("keydown", this._handleKeyDown.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this._handleKeyDown.bind(this));
    }

    _handleKeyDown(event) {
        switch (event.key) {
            case 'ArrowRight':
                this._selectNext();
                break;
            case 'ArrowLeft':
                this._selectPrevious();
                break;
        }
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
                        <div>
                            <div className="scroll-container">
                                <ul>
                                    {moviesComponents}
                                </ul>
                            </div>
                            <div className="selection-rectangle"></div>
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
