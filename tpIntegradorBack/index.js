/*====================
    Importaciones
====================*/

import express from "express";
const app = express();

import environments from "./src/api/config/environments.js"; //importamos las variables de entorno 
const PORT = environments.port;

import cors from "cors";
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { rutasProducto } from "./src/api/routes/index.js";
import { join, __dirname } from "./src/api/utils/index.js";

/*======================
    Middlewares
======================*/

//MW de app que habilita CORS:Evita que el navegador bloquee solicitudes desde otros orígenes.
//Permite que cualquier frontend (localhost:3000, 5173, etc.) acceda a esta API.
app.use(cors());

//MW de app que transforma el JSON de las peticiones POST y PUT a objetos JavaScript
app.use(express.json(join(__dirname, "src/public")));

app.use(loggerUrl);

//Middleware para archivos estáticos
app.use(express.static(join(__dirname, "src/public"))); //Ruta relativa para servir los archivos de la carpeta public

/*======================
    Configuración
======================*/
app.set("view engine", "ejs"); //Configuramos ejs como motor de plantillas

app.set("views", join(__dirname, "src/views")); //Indicamos las rutas de las vistas 


/*======================
    Rutas
======================*/

app.use("/api/products", rutasProducto);

app.get("/dashboard", (req, res) =>{ //Seria igual a que la dirección localhost:3000/dashboard abra el index.ejs
    res.render("index") //Renderiza una vista ejs
})

/*======================
    Endpoints
======================*/

//Endpoint simple de prueba
app.get("/", (req, res) =>{
    res.send("Hola mundo desde Express.js");
});

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});