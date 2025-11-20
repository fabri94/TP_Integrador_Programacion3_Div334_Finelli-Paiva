/*====================
    Importaciones
====================*/

import express from "express";
const app = express();

import environments from "./src/api/config/environments.js"; //importamos las variables de entorno 
import connection from "./src/api/database/db.js"
const PORT = environments.port;

import cors from "cors";

/*======================
    Middleware
======================*/

app.use(cors());
/*======================
    Endpoints
======================*/


app.get("/", (req, res) =>{
    res.send("Hola mundo desde Express.js");
});


//Traer todos los productos
app.get("/products", async (req,res) =>{
    
    try{
        const sql = "SELECT * FROM productos";
        
        const [rows]= await connection.query(sql);
        
        console.log(rows);
        
        res.status(200).json({
            payload : rows
        })
        
    }catch(error){
        console.error("Error obteniendo productos",error.message);
    
        res.status(500).json({
            message : "Error interno al obtener productos"
        });
    }
});

app.get("/products/:id", async (req,res) =>{
    
    
    try{
        let { id } = req.params;
        const sql = "SELECT * FROM productos WHERE productos.id = ?";
        
        let [rows]= await connection.query(sql, [id]); //rows con destructuring devuelve solo las datos del producto sin la información del field
        
        console.log(rows);
        
        res.status(200).json({
            payload : rows
        })
        
    }catch(error){
        console.error("Error obteniendo productos con id",error.message);
    
        res.status(500).json({
            message : "Error interno al obtener productos con id"
        });
    }
});

app.post("/products", async (req,res)=>{
    try {
        //gracias al destructuring recogemos estos datos del cuerpo de la peticion HTTP. distinto a lo que sucede en el get que viene en la URL
        let {imagen,nombre,precio,tipo} = req.body;

        //Optimizacion -> validacion de datos de entrada
        if(!imagen || !nombre || !precio || !tipo){
            return res.status(400).json({
                message: `Datos invalidos. Completar todos los campos correctamente`
            });
        }
        let sql = `INSERT INTO productos (imagen, nombre, precio, tipo) VALUES (?,?,?,?)`;

        let [resultado] = await connection.query(sql,[imagen,nombre,precio,tipo]);
        console.log(resultado);
                
        //CODIGO DE ESTADO 201 -> CREATED
        res.status(201).json({
            message : "Producto creado con exito",
            idProducto : resultado.insertId
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message : "Error interno del servidor",
            error : error.message
        })
    }
});

app.delete("/products/:id", async(req,res)=>{
    try{
        let { id } = req.params;

        //opcion 1 : borrado normal
        let sql = "DELETE FROM productos WHERE productos.id = ?";
        //opcion 2 : baja logica
        //let sql = `UPDATE productos set active = 0 WHERE id = ?`
        let [resultado] = await connection.query(sql,[id]);;
        console.log(resultado);

        if(resultado.affectedRows === 0){
            return res.status(400).json({
                message : "No se elimino el producto"
            });
        }

        res.status(200).json({
            message : `Producto con id ${id} eliminado correctamente`
        });
    }catch(error){
        console.error(`Error al eliminar un producto:`,error);        
        res.status(500).json({
            message : `Error al eliminar un producto con id ${id}`, error,
            error :error.message
        });
    }
});

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});