/*====================
    Importaciones
====================*/

import express from "express";
const app = express();
//import connection from "./src/api/database/db.js";
import environments from "./src/api/config/environments.js"; //importamos las variables de entorno 
const PORT = environments.port;
const SESSION_KEY = environments.session_key;

import cors from "cors";
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


// Endpoint para crear usuarios

/*
app.post("/api/users", async (req, res) => {
    try {
        const { email, password, nombre } = req.body;

        if(!email || !password || !nombre) {
            return res.status(400).json({
                message: "Datos invalidos, asegurate de enviar todos los campos"
            });
        }

        let sql = `
            INSERT INTO usuarios (email, password, nombre)
            VALUES (?, ?, ?)
        `;

        const [resultado] = await connection.query(sql, [email, password, nombre]);
        console.log(resultado);

        res.status(201).json({
            message: "Usuario creado con exito",
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error interno en el servidor",
            error: error
        })
    }
});
*/
/*
// Endpoint para inicio de sesion, recibimos correo y password con una peticion POST
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Evitamos consulta innecesaria
        if(!email || !password) {
            return res.render("login", {
                error: "Todos los campos son obligatorios!"
            });
        }

        const sql = `SELECT * FROM usuarios where email = ? AND password = ?`;
        const [rows] = await connection.query(sql, [email, password]);

        // Si no existen usuarios con ese correo o password
        if(rows.length === 0) {
            return res.render("login", {
                error: "Credenciales incorrectas!"
            });
        }

        console.log(rows);
        const user = rows[0];
        console.table(user);

        // Ahora toca guardar sesion y hacer el redirect
        // Crearmos la sesion del usuario, que es un objeto que guarda su id y su correo
        req.session.user = {
            id: user.id,
            correo: user.correo
        }

        res.redirect("/"); // Redirigimos a la pagina principal

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
});

app.post("/logout", (req, res) => {

    // Destruimos la sesion que habiamos creado
    req.session.destroy((error) => {
        if(error) {
            console.error("Error al destruir la sesion", error);
            return res.status(500).json({
                error: "Error al cerrar la sesion"
            })
        }

        res.redirect("login"); // Redirigimos a login
    })
});
*/
