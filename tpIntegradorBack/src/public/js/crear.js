let contenedorProductos = document.getElementById("altaProducts-form");
let contenedorUsuarios = document.getElementById("login-form");

let url = "http://localhost:3000";

contenedorProductos.addEventListener("submit", (event) => {
    event.preventDefault();
    //alert("Formulario no enviado");

    let formData = new FormData(event.target);
    let data = Object.fromEntries(formData.entries());
    crearObjeto(data);
    console.log(data)
})

async function crearObjeto(data) {
    try {
    // Para hacer otras operaciones distintas a GET, necesitamos especificar mas informacion en el segundo parametro de fetch
    let response = await fetch(`${url}/api/products`, { // Este 2o parametro es un objeto de opciones
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }); 

    console.log(response);
                
    let result = await response.json();
    console.log(result)

    if (response.ok) {
        console.log(result.message);
        alert(`Usuario creado`);
    } 

    } catch(error) {
        console.error("Error al enviar los datos: ", error);
        alert("Error al procesar la solicitud");
    }
}

/*
==============================================
CREACION DE USUARIOS
==============================================
*/

contenedorUsuarios.addEventListener("submit", (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);
    let data = Object.fromEntries(formData.entries());
    crearUsuario(data);
    console.log(data)
})

async function crearUsuario(data) {
    try {
    // Para hacer otras operaciones distintas a GET, necesitamos especificar mas informacion en el segundo parametro de fetch
    let response = await fetch(`${url}/api/users`, { // Este 2o parametro es un objeto de opciones
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }); 

    console.log(response);
                
    let result = await response.json();
    console.log(result)

    if (response.ok) {
        console.log(result.message);
        alert(`Producto creado con exito con id: ${result.idProducto}`);
    } 


    } catch(error) {
        console.error("Error al enviar los datos: ", error);
        alert("Error al procesar la solicitud");
    }
}