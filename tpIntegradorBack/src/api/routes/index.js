//"Archivo de barril" -> Contiene todas las rutas; las importa y exporta con un mismo nombre

import rutasProducto from "./product.routes.js";
//Se importan todas las rutas de producto que se definieron en "product.routes.js"
import rutasVista from "./view.routes.js";

import rutasUsuario from "./user.routes.js"
export{
    rutasProducto,
    rutasVista,
    rutasUsuario
};