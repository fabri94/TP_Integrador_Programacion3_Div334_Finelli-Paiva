import connection from "../database/db.js";

const selectAllProducts = () =>{
    let sql = "SELECT * FROM productos";
        
    return connection.query(sql);
}

const selectProductWhereId = (id) =>{
    let sql = "SELECT * FROM productos WHERE productos.id = ?";
        
    return connection.query(sql, [id]);
}

export default{
    selectAllProducts,
    selectProductWhereId
};