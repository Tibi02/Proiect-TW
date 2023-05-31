document.addEventListener("DOMContentLoaded", function() {
    var creareContEl = document.getElementById("conectareButton");
    var paginaConectareContEL = document.getElementById("creareButton");
  
    creareContEl.addEventListener("click", function() {
      var nume = document.getElementById("conectareNume").value;
      var parola = document.getElementById("conectareParola").value;
  
      var data = {
        username: nume,
        password: parola
      };
  
      // cererea POST pentru serverul json
      fetch("http://localhost:3002/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(function(response) {
          if (response.ok) {
            alert("Utilizatorul a fost creat cu succes.");
            window.location.href = "conectare.html";
          } else {
            throw new Error("Eroare la crearea utilizatorului: " + response.status);
          }
        })
        .catch(function(error) {
          console.error("Eroare la crearea utilizatorului:", error);
        });
    });
  
    paginaConectareContEL.addEventListener("click", function() {
      window.location.href = "conectare.html";
    });
  });
  