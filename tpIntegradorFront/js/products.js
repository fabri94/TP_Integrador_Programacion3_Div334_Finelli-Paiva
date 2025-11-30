const nombre = localStorage.getItem("nombreUsuario");
//Evitamos que el usuario no pueda ingresar de forma directa a products.html sino cargo su nombre previamente
if (!nombre) {
    window.location.href = "index.html";
}

//Declaramos variables del DOM
const nombreUsuario = document.getElementById("nombre-usuario");
const contenedorProductos = document.getElementById("contenedor-productos");
const barraBusqueda = document.getElementById("barra-busqueda");
const filtroCategoria = document.getElementById("filtro-categoria");
const contenedorCarrito = document.getElementById("contenedor-carrito");
const importeTotal = document.getElementById("importe-total");
const url = "http://localhost:3000/api/products";

//Manejadores de eventos para: 
//barra de busqueda 
//el filtro por categoria
//boton de agregar a carrito
barraBusqueda.addEventListener("input", filtrarProductos);
filtroCategoria.addEventListener("change", filtrarProductos);
contenedorProductos.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-agregar")) {
        const idProd = parseInt(event.target.dataset.id);
        agregarACarrito(idProd);
    }
});

contenedorCarrito.addEventListener("click", (event)=>{
    if(event.target.classList.contains("btn-eliminar")){
        const idProd = parseInt(event.target.dataset.id)
        eliminarCarrito(idProd);
    }
})

//Declaramos un array vacio en donde se guardaran los productos que recibamos por API desde la BD
let productos = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let htmlCarrito;

//Mostramos el nombre que ingreso el usuario, en la barra de navegacion
nombreUsuario.textContent = nombre;

//Obtenemos los productos desde la API
async function obtenerProductos(){
    try{
        let respuesta = await fetch(url);
        let respuestaFormato = await respuesta.json(); //transforma la respuesta en un json
        productos = respuestaFormato.payload; //solo guarda la información importante(los datos) de la respuesta
        mostrarProductos(productos); //envía los a la función que printea los productos
    }catch(error){
        console.error(error);
    }
}


// Renderiza dinámicamente la lista de productos en pantalla
function mostrarProductos(productos){
    let htmlProductos ="";

    productos.forEach(prod =>{
        htmlProductos += `
        <div class="card-producto">
            <img src="${prod.imagen}" alt="${prod.marca}">
            <h2>${prod.tipo}</h2>
            <h3>Marca: ${prod.marca}</h3>
            <h4>Modelo: ${prod.modelo}</h4> 
            <p>Precio: $${prod.precio} ARS</p>
            <button class="btn-agregar" data-id="${prod.id}">Agregar al carrito</button>
        </div>
        `
    })
    contenedorProductos.innerHTML= htmlProductos;
}

//Filtra por categoría y/o texto ingresado en la barra de búsqueda
function filtrarProductos(){
    let valorBusqueda = barraBusqueda.value.toLowerCase();
    let categoriaProducto = filtroCategoria.value;
    let listaProductos = productos;
    
    if(categoriaProducto!=="todas"){
        listaProductos = listaProductos.filter(prod => prod.tipo === categoriaProducto)
    }
    if(valorBusqueda.length > 0){
        listaProductos = listaProductos.filter(prod =>
            prod.marca.toLowerCase().includes(valorBusqueda) ||
            prod.modelo.toLowerCase().includes(valorBusqueda)
        )
    }

    mostrarProductos(listaProductos);
}

function mostrarCarrito(){
    htmlCarrito = "";
    let total = 0;

    carrito.forEach((producto, index)=>{
        total += producto.precio * producto.cantidad;
        htmlCarrito +=`
        <li class="bloque-item">
            <p class="nombre-item">
                ${producto.tipo} ${producto.marca} ${producto.modelo}<br>                
                Precio: $${producto.precio}<br>
                Cantidad: ${producto.cantidad}
            </p>
            <button class="btn-eliminar"data-id="${index}">Eliminar</button>
        </li>
        `;
    });
    
    contenedorCarrito.innerHTML = htmlCarrito;
    importeTotal.textContent = `Total: $${total}`;
}

function agregarACarrito(idProducto){
    const producto = productos.find(p=> p.id === idProducto);
    const productoEnCarrito = carrito.find(p=>p.id === idProducto);

    if(!productoEnCarrito){
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }else{
        productoEnCarrito.cantidad++;
    }

    mostrarCarrito();
    actualizarCarrito();
}

function eliminarCarrito(idProducto){
    const productoEnCarrito = carrito.find(p => p.id === idProducto);
    if(!productoEnCarrito){
        return;
    }

    if(productoEnCarrito.cantidad > 1){
        productoEnCarrito.cantidad--;
    }else{
        carrito = carrito.filter(p=>p.id !== idProducto);
    }

    mostrarCarrito();
    actualizarCarrito();
}

function actualizarCarrito(){
    localStorage.setItem("carrito",JSON.stringify(carrito));
}

function init(){
    obtenerProductos();
}

init();
