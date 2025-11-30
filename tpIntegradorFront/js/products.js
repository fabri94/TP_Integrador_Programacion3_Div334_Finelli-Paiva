const nombre = sessionStorage.getItem("nombreUsuario");

//Esperamos a que todo el HTML (products.html) este cargado antes de ejecutar el script
//Aseguramos asi que elementos del DOM existen antes de agregarles eventos (buscador, filtro, contenedor de productos) y evitamos errores
document.addEventListener("DOMContentLoaded", ()=>{
    //Evitamos que el usuario no pueda ingresar de forma directa a products.html sino cargo su nombre previamente
    if (!nombre) {
        window.location.href = "index.html";
        return;
    }

    //Declaramos variables del DOM
    const nombreUsuario = document.getElementById("nombre-usuario");
    let contenedorProductos = document.getElementById("contenedor-productos");
    let barraBusqueda = document.getElementById("barra-busqueda");
    let filtroCategoria = document.getElementById("filtro-categoria");
    let url = "http://localhost:3000/api/products";

    //Eventos para el buscador y el filtro por categoria
    barraBusqueda.addEventListener("input", filtrarProductos);
    filtroCategoria.addEventListener("change", filtrarProductos);

    //Declaramos un array vacio en donde se guardaran los productos que recibamos por API desde la BD
    let productosOriginales = [];
    
    //Mostramos el nombre que ingreso el usuario, en la barra de navegacion
    nombreUsuario.textContent = nombre;

    //Obtenemos los productos desde la API
    async function obtenerProductos(){
        try{
            let respuesta = await fetch(url);
            let respuestaFormato = await respuesta.json(); //transforma la respuesta en un json
            productosOriginales = respuestaFormato.payload; //solo guarda la información importante(los datos) de la respuesta
            mostrarProductos(productosOriginales); //envía los a la función que printea los productos
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
                <button onclick="agregarCarrito(${prod.id})">Agregar al carrito</button>
            </div>
            `
        })
        contenedorProductos.innerHTML= htmlProductos;
    }

    //Filtra por categoría y/o texto ingresado en la barra de búsqueda
    function filtrarProductos(){
        let valorBusqueda = barraBusqueda.value.toLowerCase();
        let categoriaProducto = filtroCategoria.value;
        let listaProductos = productosOriginales;
        
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

    function init(){
        obtenerProductos();
    }

    init();
});

