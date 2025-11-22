import connection from "../database/db.js";

const selectAllProducts = () =>{
    let sql = "SELECT * FROM productos";
        
    return connection.query(sql);
}

const selectProductWhereId = (id) =>{
    let sql = "SELECT * FROM productos WHERE productos.id = ?";
        
    return connection.query(sql, [id]);
}

const insertProduct = (tipo, marca, modelo, precio, activo, imagen, arquitectura) =>{
    let sql = `INSERT INTO productos (tipo, marca, modelo, precio, activo, imagen, arquitectura) VALUES (?,?,?,?,?,?,?)`;

    return connection.query(sql,[tipo, marca, modelo, precio, activo, imagen, arquitectura]);
}

const deleteProduct = (id) =>{
    //opcion 1 : borrado normal
    let sql = "DELETE FROM productos WHERE productos.id = ?";
    //opcion 2 : baja logica
    //let sql = `UPDATE productos set active = 0 WHERE id = ?`
    return connection.query(sql,[id]);
}

const updateProduct = (nombre, imagen, tipo, precio, activo, id)=>{
    let sql = `
    UPDATE productos
    SET nombre = ?, imagen = ?, tipo = ?, precio = ?, activo = ?
    WHERE id = ?
    `;

    return connection.query(sql,[nombre, imagen, tipo, precio, activo, id]);
}

export default{
    selectAllProducts,
    selectProductWhereId,
    insertProduct,
    deleteProduct,
    updateProduct
};