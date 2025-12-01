const nombre = sessionStorage.getItem("nombreUsuario");
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
const vaciarCarrito = document.getElementById("vaciar-carrito");
const botonCarrito = document.getElementById("btn-carrito");
const seccionCarrito = document.getElementById("seccion-carrito"); 
const botonImprimirTicket = document.getElementById("imprimir-ticket");

const url = "http://localhost:3000/api/products";

//Manejadores de eventos para: 
//----------------------------

//barra de busqueda 
barraBusqueda.addEventListener("input", filtrarProductos);
//el filtro por categoria
filtroCategoria.addEventListener("change", filtrarProductos);

//boton de agregar a carrito
contenedorProductos.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-agregar")) {
        const idProd = parseInt(event.target.dataset.id);
        mostrarCarrito();
        seccionCarrito.style.display = "block";
        agregarACarrito(idProd);
    }
});

//boton de eliminar de carrito
contenedorCarrito.addEventListener("click", (event)=>{
    if(event.target.classList.contains("btn-eliminar")){
        const idProd = parseInt(event.target.dataset.id);
        eliminarCarrito(idProd);
    }
});
//boton de vaciar carrito
vaciarCarrito.addEventListener("click", limpiarCarrito);

botonCarrito.addEventListener("click", () =>{
    const visible = seccionCarrito.style.display === "block";
    if(!visible){
        mostrarCarrito();
        seccionCarrito.style.display = "block";
    }else{
        seccionCarrito.style.display = "none";
    }
});

botonImprimirTicket.addEventListener("click",imprimirTicket);

//Declaramos un array vacio en donde se guardaran los productos que recibamos por API desde la BD
let productos = [];
let carrito = [];
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

//Renderizamos y mostramos el contenido del carrito
function mostrarCarrito(){
    htmlCarrito = "";
    let total = 0;

    carrito.forEach((producto)=>{
        total += producto.precio * producto.cantidad;
        htmlCarrito +=`
        <li class="bloque-item">
            <p class="nombre-item">
                <img src="${producto.imagen}" alt="${producto.marca}"><br> 
                <p>${producto.tipo} ${producto.marca} ${producto.modelo}</p>            
                <p>Precio: $${producto.precio} &nbsp; Cantidad: ${producto.cantidad}</p>
            </p>
            <button class="btn-eliminar" data-id="${producto.id}">Eliminar</button>
        </li>
        `;
    });
    
    contenedorCarrito.innerHTML = htmlCarrito;
    importeTotal.textContent = `Total: $${total}`;
}

//Agregado de producto a carrito. Si el producto ya existia en el carrito se suma una unidad del mismo
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

//Eliminacion de producto de carrito. Si el producto a eliminar cuenta con mas de una unidad, se resta 
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

//Si existe previamente el carrito en local storage, se precarga con los valores ya existentes
function cargarCarrito(){
    let carritoLS = sessionStorage.getItem("carrito");
    if(!carritoLS){
        mostrarCarrito();
    }else{
        carrito = JSON.parse(carritoLS);
        mostrarCarrito();
    }
}

//Reinicia el array de carrito, lo elimina del local storage, y lo muestra
function limpiarCarrito(){
    carrito = [];
    sessionStorage.removeItem("carrito");
    mostrarCarrito();
}

//Mantiene actualizado el local storage del carrito
function actualizarCarrito(){
    sessionStorage.setItem("carrito",JSON.stringify(carrito));
}

function imprimirTicket(){
    //alert("test");
    console.table(carrito);

    const idProductos = [];

    const{jsPDF} = window.jspdf;

    const doc = new jsPDF();

    let y = 10;
    
    doc.setFontSize(10);

    doc.text("Spartan Hardware", 10, y);
    
    y += 10;

    carrito.forEach(prod => {
        idProductos.push(prod.id); //llenamos el array de ids de producto

        doc.text(`${prod.tipo} ${prod.marca} ${prod.modelo} - $${prod.precio}ARS`, 20, y);

        y += 7;
    })

    const precioTotal = carrito.reduce((total,prod) => total + parseInt(prod.precio),0);

    y+=5;

    doc.text(`Total $${precioTotal}ARS`,10,y);

    doc.save("ticket.pdf");
}

function init(){
    obtenerProductos();
    cargarCarrito();
    mostrarCarrito();
    actualizarCarrito();
}

init();
