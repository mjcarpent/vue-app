const cors = require("cors");
const fetch = require("node-fetch");
const express = require("express");

const app = express();
const port = process.env.PORT || "8000";

async function initServer() {

    app.use(cors());
    app.options("*", cors());

    app.get("/movies", async (req, res) => {
        
        const title = req.query.search;

        const url = 'https://api.themoviedb.org/3/search/movie?query=' + title + '&include_adult=false&language=en-US&region=US';
        const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZGRmMjM4YTAyNzI0NTkxNjhhODhlMThhZDFkMjA1NSIsInN1YiI6IjY2NDEyZWZiNmY4MzQxZjVhYjU1NWM3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6hBFb8vG--WUkTQNbmT6uqi4ssU1XHKWXa3Q_lIKuU0'
        }
        };

        const movies = [];
        const response = await fetch(url, options)
            .then(res => res.json())
            .then(json => {
                for (let i = 0; i < json.results.length && movies.length < 10; i++) {

                    const movie = json.results[i];
                    const posterPath = (movie.poster_path ? ("https://image.tmdb.org/t/p/original" + movie.poster_path) : "");
                    movies.push({
                        "movie_id": movie.id,
                        "title": movie.title,
                        "poster_image_url": posterPath,
                        "popularity_summary": movie.popularity + " out of " + movie.vote_count
                    });            
                }
            })
            .catch(err => console.error('error:' + err));

        res.status(200).send(movies);
    });

    app.listen(port, () => {
        console.log(`Listening to requests on http://localhost: ${port}`);
    });
};

// initializing server
initServer();