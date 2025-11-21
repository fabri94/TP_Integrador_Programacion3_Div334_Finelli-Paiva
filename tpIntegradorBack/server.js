/*====================
    Importaciones
====================*/

import express from "express";
const app = express();

import environments from "./src/api/config/environments.js"; //importamos las variables de entorno 
import connection from "./src/api/database/db.js"
const PORT = environments.port;

import cors from "cors";
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { rutasProducto } from "./src/api/routes/index.js";

/*======================
    Middlewares
======================*/

//MW de app que habilita CORS:Evita que el navegador bloquee solicitudes desde otros orígenes.
//Permite que cualquier frontend (localhost:3000, 5173, etc.) acceda a esta API.
app.use(cors());

//MW de app que transforma el JSON de las peticiones POST y PUT a objetos JavaScript
app.use(express.json());

app.use(loggerUrl);

/*======================
    Rutas
======================*/

app.use("/api/products", rutasProducto);

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