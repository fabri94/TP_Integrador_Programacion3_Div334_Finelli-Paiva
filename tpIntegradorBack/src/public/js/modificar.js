let formProductosPorId = document.getElementById("input");
let contenedorProductosPorId = document.getElementById("contenedor-productos-id");


let url = "http://localhost:3000/api/products";

formProductosPorId.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Formulario no enviado");

    let formData = new FormData(event.target);
    let data = Object.fromEntries(formData.entries());
    let idProd = data.id;
    
    obtenerProductosPorId(idProd);
})

async function obtenerProductosPorId(id){

    try{
        let respuesta = await fetch(`${url}/${id}`); //link del producto por id
        let respuestaFormato = await respuesta.json(); // pasa los datos a formato json
        let productos = respuestaFormato.payload; //el payload son el conjunto de datos específicos del productos
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
        <form id="altaProducts-form">
            
            <input type="hidden" name="id" id="idProd" value="${prod.id}">

            <label for="typeProd">Tipo:</label>
            <select name="tipo" id="typeProd" required>
                <option value="" disabled selected hidden>${prod.tipo}</option>
                <option value="Motherboard">Motherboard</option>
                <option value="GPU">GPU</option>
            </select>

            <label for="marcaProd">Marca: </label>
            <input type="text" name="marca" id="marcaProd" value="${prod.marca}" required>

            <label for="modeloProd">Modelo: </label>
            <input type="text" name="modelo" id="modeloProd" value="${prod.modelo}" required>

            <label for="priceProd">Precio</label>
            <input type="number" name="precio" id="priceProd" value="${prod.precio}" required>

            <label for="actProd">Activo:</label>
            <select name="activo" id="actProd" required>
                <option value="" disabled selected hidden>${prod.activo}</option>
                <option value="0">0</option>
                <option value="1">1</option>
            </select>
            
            <label for="imagenProd">Url imagen: </label>
            <input type="text" name="imagen" id="imagenProd" value="${prod.imagen}" required>

            <label for="arqProd">Arquitectura: </label>
            <input type="text" name="arquitectura" id="arqProd" value="${prod.arquitectura}" required>

            <br>
            <input type="submit" value="Modificar producto">
        </form>
        `
        contenedorProductosPorId.innerHTML= htmlProductos;
    })
    let formContenedor = document.getElementById("altaProducts-form");

    formContenedor.addEventListener("submit", (event) => {
        event.preventDefault();
        alert("Formulario no enviado");

        let formData = new FormData(event.target);
        let data = Object.fromEntries(formData.entries());
        modificarObjeto(data);
        console.log(data)
    });
}


            



async function modificarObjeto(data) {
    try {
    // Para hacer otras operaciones distintas a GET, necesitamos especificar mas informacion en el segundo parametro de fetch
    let response = await fetch(url, { // Este 2o parametro es un objeto de opciones
        method: "PUT",
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
        alert(`Producto modificardo con exito.`);
    } else {

    }


    } catch(error) {
        console.error("Error al enviar los datos: ", error);
        alert("Error al procesar la solicitud");
    }
}