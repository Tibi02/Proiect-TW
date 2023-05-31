var movieId = "";

function fetchMovies() {
    //creare element pentru afisare
    const loading = document.createElement("p");
    loading.innerText = "Incarcare filme...";
    loading.setAttribute("id", "loading");
    document.body.appendChild(loading);

    const content = document.getElementById("content");

    fetch("http://localhost:3000/movies")
      .then(response => response.json())
      //preluare date
      .then(data => {
        const movies = data;
        console.log(movies);

        if (movies.length) {
          document.body.removeChild(loading);
        }

        for (let i = 0; i < movies.length; i++) {
          const movie = movies[i];

          const movieContainer = document.createElement("div");
          movieContainer.classList.add("movie");
          movieContainer.setAttribute("data-id", movie.id);
          content.appendChild(movieContainer);

          const imgContainer = document.createElement("div");
          imgContainer.classList.add("image-container");
          movieContainer.appendChild(imgContainer);

          const img = document.createElement("img");
          img.classList.add("movie-image");
          img.setAttribute("src", movie.poster);
          imgContainer.appendChild(img);

          const name = document.createElement("h2");
          name.innerText = movie.title;
          movieContainer.appendChild(name);

          const editButton = document.createElement("button");
          editButton.innerText = "Edit";
          editButton.onclick = function () {
            document.getElementById("name").value = movie.title;
            document.getElementById("image").value = movie.poster;
            movieId = movie.id;
          };
          movieContainer.appendChild(editButton);

          const deleteButton = document.createElement("button");
          deleteButton.innerText = "Delete";
          deleteButton.onclick = function () {
            deleteMovie(movie.id);
          };
          movieContainer.appendChild(deleteButton);

          const divider = document.createElement("hr");
          content.appendChild(divider);
        }
      })

      .catch(() => {
        document.getElementById("loading").innerText = "Eroare la incarcarea filmelor!";
      });
    }

function addMovie() {
  const name = document.getElementById("name").value;
  const image = document.getElementById("image").value;

  if (!name || !image) {
    alert("Completati cu toate datele!");
    return;
  }

  const newMovie = { title: name, poster: image };

  fetch("http://localhost:3000/movies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newMovie)
  })
    .then(() => {
      console.log("Film adaugat cu succes!");
      window.location.reload();
    })
    .catch(() => {
      alert("Eroare la adaugarea filmului");
    });
}

function editMovie() {
  const name = document.getElementById("name").value;
  const image = document.getElementById("image").value;

  if (!name || !image) {
    alert("Insuficiente date!");
    return;
  }

  const updatedMovie = { title: name, poster: image };

  fetch("http://localhost:3000/movies/" + movieId, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedMovie)
  })
    .then(() => {
      console.log("Film modificat cu succes!");
      window.location.reload();
    })
    .catch(() => {
      alert("Eroare la modificarea filmului!");
    });
}

function deleteMovie(id) {
  fetch("http://localhost:3000/movies/" + id, {
    method: "DELETE"
  })
    .then(response => {
      if (response.status === 200) {
        console.log("Film sters cu succes!");
        alert("Film sters cu succes!");

        const movieContainer = document.querySelector(`[data-id="${id}"]`);
        const divider = movieContainer.nextElementSibling;

        movieContainer.remove();
        divider.remove();
      } else {
        throw new Error("Eroare la stergerea filmului!");
      }
    })
    .catch(() => {
      alert("Eroare la stergerea filmului!");
    });
  }
  

fetchMovies();
