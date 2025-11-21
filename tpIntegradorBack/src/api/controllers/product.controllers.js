export const getProducts = async (req,res) =>{
    
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
};

export const getProductById = async (req,res) =>{

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
};

export const createProduct = async (req,res)=>{

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
};

export const removeProduct = async(req,res)=>{

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
};

export const modifyProduct = async(req,res)=>{

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
};