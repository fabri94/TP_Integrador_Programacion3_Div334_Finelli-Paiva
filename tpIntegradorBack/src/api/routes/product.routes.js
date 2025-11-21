import { Router } from "express";
import { validateId } from "../middlewares/middlewares";

const router = Router();

//Devuelve todos los productos de la BBDD
router.get("/products", async (req,res) =>{
    
    try{
        let sql = "SELECT * FROM productos";
        
        let [resultado]= await connection.query(sql);
        
        console.log(resultado);
        
        res.status(200).json({
            payload : resultado
        })
        
    }catch(error){
        console.error("Error obteniendo productos",error.message);
    
        res.status(500).json({
            message : "Error interno al obtener productos"
        });
    }
});

//Devuelve un producto en especifico de la BBDD que coincide con el ID ingresado
router.get("/products/:id", validateId, async (req,res) =>{

    try{
        let { id } = req.params;
        let sql = "SELECT * FROM productos WHERE productos.id = ?";
        
        let [resultado]= await connection.query(sql, [id]); //resultado con destructuring devuelve solo las datos del producto sin la información del field
        console.log(resultado);
        
        if (resultado.length === 0){
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        
        res.status(200).json({
            payload : resultado
        })
        
    }catch(error){
        console.error("Error obteniendo productos con id",error.message);
    
        res.status(500).json({
            message : "Error interno al obtener productos con id"
        });
    }
});

//Crea y hace una nueva insercion de un producto en la BBDD
router.post("/products", async (req,res)=>{

    try {
        //gracias al destructuring recogemos estos datos del cuerpo de la peticion HTTP. distinto a lo que sucede en el get que viene en la URL
        let {imagen,nombre,precio,tipo} = req.body;

        //Optimizacion -> validacion de datos de entrada
        if(!imagen || !nombre || precio === undefined || precio === null || !tipo){
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

/*
Elimina un producto de la BBDD por el ID ingresado (tal como esta implementado ahora)
NOTA: Si hay que respetar a rajatabla el TP, hay que hacer una baja logica mas bien (ver opcion 2 dentro del scope)
Que pase el estado del producto a inactivo (booleano)
*/
router.delete("/products/:id", validateId, async(req,res)=>{

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

/*Actualiza un producto ya existente en la BBDD
NOTA: Este endpoint recibe el ID por el body de la peticion. 
Por eso la url del endpoint no es "/products/:id" como sucede en el getById y el delete
*/

router.put("/products", async(req,res)=>{

    try {
        let { id, nombre, imagen, tipo, precio, activo } = req.body;

        let sql = `
        UPDATE productos
        SET nombre = ?, imagen = ?, tipo = ?, precio = ?, activo = ?
        WHERE id = ?
        `;

        if(!id || !nombre || !imagen || !tipo || precio == null || activo == null){
            return res.status(400).json({
                message : "Faltan campos requeridos"
            });
        }

        let [resultado] = await connection.query(sql, [nombre, imagen, tipo, precio, activo, id]);
        console.log(resultado);

        if(resultado.affectedRows === 0){
            return res.status(400).json({
                message : "No se actualizo el producto"
            });
        }
        
        res.status(200).json({
            message : `Producto con id ${id} actualizado correctamente`
        });      
    } catch (error) {
        console.error(`Error al actualizar producto:`,error);        
        res.status(500).json({
            message : "Error interno del servidor", error
        });
    }
});