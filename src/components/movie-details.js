import React, {Component} from 'react';
import './movie-details.css';

class MovieDetails extends Component {
    render() {
        return (
            <div className="movie-details">
                <div className="overlay-background"/>
                <div className="overlay-content">
                    <img src={this.props.data.poster} alt="movie poster"/>
                    <div className="movie-info">
                        <h2>{this.props.data.Title}</h2>
                        <p>{this.props.data.plot}</p>
                        <p>Directed by: {this.props.data.Directors}</p>
                        <ul>
                            <li>Duration: {this.props.data.Runtime} minutes</li>
                            <li>Year: {this.props.data.Year}</li>
                            <li>IMdB Rating: {this.props.data.IMDb_Rating}</li>
                        </ul>
                    </div>
                </div>

            </div>
        );
    }
}

export default MovieDetails;
