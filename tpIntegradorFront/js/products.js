let contenedorProductos = document.getElementById("contenedor-productos");

let url = "http://localhost:3000/api/products";

async function obtenerProductos(){
    try{
        let respuesta = await fetch(url);
        let respuestaFormato = await respuesta.json(); //transforma la respuesta en un json
        let productos = respuestaFormato.payload; //solo guarda la información importante(los datos) de la respuesta
        console.table(productos);

        mostrarProductos(productos); //envía los a la función que printea los productos

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
        contenedorProductos.innerHTML= htmlProductos;
    })
}

function init(){
    obtenerProductos();
}

init();