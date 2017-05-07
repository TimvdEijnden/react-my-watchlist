const fs = require('fs');
const path = require('path');
const imdb = require('imdb-api');

const JSON_PATH = path.resolve('./public/movies.json');
const movies = require(JSON_PATH);
const promises = [];

// update poster and plot of the movie
const fetchPosterForMovie = function(movieId, index) {
	return new Promise((resolve) => {
		imdb.getById(movieId).then((result) => {
			console.log(`updated ${movieId}`);
			movies[index].poster = result.poster;
			movies[index].plot = result.plot;
			resolve();
		})
	});
}

// update all the movies
for (var index = 0; index < movies.length; index++) {
	promises.push(fetchPosterForMovie(movies[index].id, index));
}

// save the json back to the file
Promise.all(promises).then(() => {
	var json = JSON.stringify(movies, null, 4);
	fs.writeFile(JSON_PATH, json, 'utf8', (error) => {
		if(error){
			console.log(error);
		}else{
			console.log('saved JSON');
		}
	});
})

