let contenedorProductos = document.getElementById("contenedor-productos");
let contenedorProductosPorId = document.getElementById("contenedor-productos-id");
let formProductosPorId = document.getElementById("input");

let url = "http://localhost:3000/api/products";

formProductosPorId.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Formulario no enviado");

    let formData = new FormData(event.target);
    let data = Object.fromEntries(formData.entries());
    let idProd = data.id;
    console.log(data)
    console.log(idProd)
    obtenerProductosPorId(idProd);
})

async function obtenerProductos(){

    try{
        let respuesta = await fetch(url);
        let respuestaFormato = await respuesta.json();
        let productos = respuestaFormato.payload;
        console.table(productos);

        mostrarProductos(productos);

    }catch(error){
        console.error(error);
    }
}

async function obtenerProductosPorId(id){

    try{
        let respuesta = await fetch(`${url}/${id}`);
        let respuestaFormato = await respuesta.json();
        let productos = respuestaFormato.payload;
        console.table(productos);

        mostrarProductos(productos);

    }catch(error){
        console.error(error);
    }
}

function mostrarProductos(productos){
    let htmlProductos ="";

    productos.forEach(prod =>{
        htmlProductos += `
        <div class="card-producto">
            <img src="${prod.imagen}" alt="${prod.marca}">
            <h3>Marca: ${prod.marca}</h3>
            <h4>Modelo: ${prod.modelo}</h4> 
            <p>$${prod.precio}</p>
        </div>
        `
        contenedorProductosPorId.innerHTML= htmlProductos;
    })
}

function init(){
    //obtenerProductos();
}

init();