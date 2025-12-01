//Declaramos variables del DOM
const formNombre = document.getElementById("form-nombre");
const inputNombre = document.getElementById("nombreUsuario");

//Maneja el envío del formulario del index.html
formNombre.addEventListener("submit", (event) => {
    event.preventDefault(); // evita que se recargue la página

    const nombre = inputNombre.value.trim();

    if (nombre === "") {
        alert("Por favor ingrese un nombre");
        return;
    }

    //Guardo nombre del usuario ingresado en Local Storage
    sessionStorage.setItem("nombreUsuario", nombre);

    //Redirigimos al usuario a nuestro products.html
    window.location.href = "products.html";
});