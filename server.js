//packages
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid");
const fs = require("fs");

//aplicatia
const app = express();

//middleware
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname));

//adaugarea unui film in aplicatie
app.post("/movies", (req, res) => {
  const moviesList = readJSONFile();
  const newMovie = req.body;
  newMovie.id = uuid.v4();
  moviesList.push(newMovie);
  writeJSONFile(moviesList);
  res.status(200).send(newMovie);
});

//gasirea unui film
app.get("/movies/:id", (req, res) => {
  const moviesList = readJSONFile();
  const id = req.params.id;
  let foundMovie = null;
  moviesList.forEach(movie => {
    if (movie.id === id) {
      foundMovie = movie;
    }
  });
  if (foundMovie === null) {
    res.status(404).send("Film negasit!");
  } 
  else {
    res.status(200).send(foundMovie);
  }
});

//obtinerea listei de filme
app.get("/movies", (req, res) => {
  const moviesList = readJSONFile();
  if (moviesList && moviesList.length !== 0) {
    res.status(200).send(moviesList);
  } 
  else {
    res.status(204).send("Niciun film gasit!");
  }
});

//actualizarea unui fil,
app.put("/movies/:id", (req, res) => {
  const moviesList = readJSONFile();
  const id = req.params.id;
  const update = req.body;
  let movieToUpdate = null;

  for (let i = 0; i < moviesList.length; i++) {
    if (moviesList[i].id === id) {
      if (update.title) {
        moviesList[i].title = update.title;
      }
      if (update.poster) {
        moviesList[i].poster = update.poster;
      }
      movieToUpdate = moviesList[i];
      break;
    }
  }

  writeJSONFile(moviesList);
  if (movieToUpdate === null) {
    res.status(404).send("Film negasit!");
  } 
  else {
    res.status(200).send(movieToUpdate);
  }
});

//stergerea unui film
app.delete("/movies/:id", (req, res) => {
  const moviesList = readJSONFile();
  const id = req.params.id;
  const movieIndex = moviesList.findIndex(movie => movie.id === id);

  if (movieIndex === -1) {
    res.status(404).send("Film negasit");
  } 
  else {
    moviesList.splice(movieIndex, 1);
    writeJSONFile(moviesList);
    res.status(200).send("Film sters cu succes!");
  }
});

//citirea
function readJSONFile() {
  const data = JSON.parse(fs.readFileSync("movies.json", "utf8"));
  return data.movies || []; 
}
  
//scriere
function writeJSONFile(content) {
  fs.writeFileSync(
    "movies.json",
    JSON.stringify({ movies: content }, null, 4),
    "utf8",
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
}
  

app.listen(3000, () => {
  console.log("Serverul ruleaza la adresa: http://localhost:3000/");
});
