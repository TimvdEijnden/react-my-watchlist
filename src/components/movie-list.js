import React, {Component} from 'react';
import Movie from './movie';
import MovieDetails from './movie-details';
import ReactGesture from 'react-gesture';
import './movie-list.css';

class MovieList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            selectedIndex: 0,
            showDetails: false
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

    _selectNext(event = null) {
        if(this.state.showDetails || this.transitioning) return;
        
        const isLast = this.state.selectedIndex === this.state.movies.length - 1;
        this.setState({
            ...this.state,
            selectedIndex: isLast ? 0 : this.state.selectedIndex + 1
        });

        let x = (isLast ? this.state.movies.length : this.state.selectedIndex) * -250;

        this._translateX(this.movieContainer, x, true);

        // reset the position after the transition
        if(isLast){
            setTimeout(() => {
                this._translateX(this.movieContainer,0, false);
            }, 200);
        }
    }

    _selectPrevious(event = null) {
        if(this.state.showDetails || this.transitioning) return;
        
        const isFirst = this.state.selectedIndex === 0;
        this.setState({
            ...this.state,
            selectedIndex: isFirst ? this.state.movies.length - 1 : this.state.selectedIndex - 1
        });

        let x = -this.state.selectedIndex * 250;

        // reset the position before the transition
        if(isFirst){
            this._translateX(this.movieContainer, -this.state.movies.length * 250, false);
        }
        setTimeout(() => {
            this._translateX(this.movieContainer, x, true);
        }, 1);
    }

    _translateX(elem, x, transition) {
        elem.style.transition = transition ? 'transform 0.2s' : '';
        elem.style.transform = 'translate3d(' + x + 'px, 0, 0)';
        if(transition){ 
            this.transitioning = true;
            elem.addEventListener('transitionend', () => {
                this.transitioning = false;
            })
        }
    }

    _toggleDetails(){
        this.setState({
            ...this.state,
            showDetails: !this.state.showDetails
        })
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
            case 'Enter':
            case ' ':
                this._toggleDetails();
                break;
            default:
                break;
        }
    }

    handleTouchMove(event) {
        event.preventDefault();
    }

    handleTap() {
        this._toggleDetails();
    } 

    render() {

        // default set
        let moviesComponents = this.state.movies.map(movie => {
            return <Movie data={movie} key={movie.id}/>
        });

        // extra set to fake looping
        let duplicateMoviesComponents = this.state.movies.map(movie => {
            return <Movie data={movie} key={movie.id+'_duplicate'}/>
        });

        return (
            <ReactGesture onTouchMove={ this.handleTouchMove.bind(this) } onTap={ this.handleTap.bind(this) } onSwipeLeft={ this._selectPrevious.bind(this) } onSwipeRight={ this._selectNext.bind(this) }>
                <div className='movie-list'>
                    {this.state.movies.length
                        ? (
                            <div>                           
                                <div className="scroll-container">
                                    <ul ref={(input) => { this.movieContainer = input; }}>
                                        {moviesComponents.concat(duplicateMoviesComponents)}
                                    </ul>
                                </div>
                                <div className="selection-rectangle"></div>      
                            </div>                      
                    )
                    : (
                        <p>loading movies...</p>
                    )}
                    { this.state.showDetails && 
                        <MovieDetails data={this.state.movies[this.state.selectedIndex]} />

                    }
                </div> 
            </ReactGesture>
        );
    }
}

export default MovieList;
