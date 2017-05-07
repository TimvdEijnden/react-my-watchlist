# react-my-watchlist

Show movies in your IMDB watchlist in a UI with Keyboard-Only Navigation.

## setup
* yarn
* yarn start

## updating fetching the movie data
* export data from IMDB as CSV (Watchlist -> Edit -> Export)
* convert the CSV to JSON at http://www.csvjson.com/csv2json
* update the JSON with the plot and poster by executing:
  * `node scripts\fetch_data.js`

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
