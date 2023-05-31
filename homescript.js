const navbarEl = document.querySelector(".navbar");

const bottomContinerEl = document.querySelector(".bottom-container");

window.addEventListener("scroll", () =>{
    if(window.scrollY > bottomContinerEl.offsetTop - navbarEl.offsetHeight - 50){
        navbarEl.classList.add("active");
    }
    else{
        navbarEl.classList.remove("active");
    }
})

