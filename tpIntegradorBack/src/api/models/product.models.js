import connection from "../database/db.js";

const selectAllProducts = () =>{
    let sql = "SELECT * FROM productos";
        
    return connection.query(sql);
}

const selectProductWhereId = (id) =>{
    let sql = "SELECT * FROM productos WHERE productos.id = ?";
        
    return connection.query(sql, [id]);
}

const insertProduct = (imagen, nombre, precio, tipo) =>{
    let sql = `INSERT INTO productos (imagen, nombre, precio, tipo) VALUES (?,?,?,?)`;

    return connection.query(sql,[imagen,nombre,precio,tipo]);
}

export default{
    selectAllProducts,
    selectProductWhereId,
    insertProduct
};