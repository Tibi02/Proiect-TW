document.addEventListener("DOMContentLoaded", function() {
  var conectareButtonEL = document.getElementById("conectareButton");
  var paginaCreareContEL = document.getElementById("creareButton");

  conectareButtonEL.addEventListener("click", function() {
    var nume = document.getElementById("conectareNume").value;
    var parola = document.getElementById("conectareParola").value;

    // cerere GET catre serverul json
    fetch("http://localhost:3002/users")
      .then(function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Eroare la obținerea listei de utilizatori: " + response.status);
        }
      })
      .then(function(users) {
        // verificare user cu numele si parola
        var userConectare = users.find(function(user) {
          return user.username === nume && user.password === parola;
        });

        if (userConectare) {
          console.log("Utilizatorul autentificat cu succes.");
          window.location.href = "http://localhost:3000/";
        } else {
          alert("Nume de utilizator sau parolă incorectă.");
        }
      })
      .catch(function(error) {
        console.error("Eroare la autentificarea utilizatorului:", error);
      });
  });

  paginaCreareContEL.addEventListener("click", function() {
    window.location.href = "creareCont.html";
  });
});
