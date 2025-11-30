/*====================
    Importaciones
====================*/

import express from "express";
const app = express();
//import connection from "./src/api/database/db.js";
import environments from "./src/api/config/environments.js"; //importamos las variables de entorno 
const PORT = environments.port;
const SESSION_KEY = environments.session_key;

import cors from "cors"; //Middleware que se encarga de blockear solicitudes en un puerto diferente por ejemplo el front en el puerto 3000 y backend en el 5173, se blockean las solicitudes
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { rutasProducto, rutasUsuario, rutasVista } from "./src/api/routes/index.js";
import { join, __dirname } from "./src/api/utils/index.js";

import session from "express-session";

/*======================
    Middlewares
======================*/

//MW de app que habilita CORS:Evita que el navegador bloquee solicitudes desde otros orígenes.
//Permite que cualquier frontend (localhost:3000, 5173, etc.) acceda a esta API.
app.use(cors());

//MW de app que transforma el JSON de las peticiones POST y PUT a objetos JavaScript
app.use(express.json());

app.use(loggerUrl);

//Middleware para archivos estáticos
app.use(express.static(join(__dirname, "src/public"))); //Ruta relativa para servir los archivos de la carpeta public

//Configuración del middleware de session
app.use(session({
    secret: SESSION_KEY, //Firma las cookies para evitar la manipulación
    resave: false, // Evita guardar la sesion si no hubo cambios
    saveUninitialized: true // No guarda sesiones vacios
}));

//endpoint que recibe los datos del form de login.ejs

app.use(express.urlencoded({
    extended: true
}));

/*======================
    Configuración
======================*/
app.set("view engine", "ejs"); //Configuramos ejs como motor de plantillas

app.set("views", join(__dirname, "src/views")); //Indicamos las rutas de las vistas 

/*======================
    Rutas
======================*/

app.use("/api/products", rutasProducto);

app.use("/api/users",rutasUsuario);

app.use("/",rutasVista);

/*======================
    Endpoints
======================*/

//Endpoint simple de prueba
/*app.get("/", (req, res) =>{
    res.send("Hola mundo desde Express.js");
});*/

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});


