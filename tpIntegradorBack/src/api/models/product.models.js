import connection from "../database/db.js";

const selectAllProducts = () =>{
    let sql = "SELECT * FROM productos";
        
    return connection.query(sql);
}

export default{
    selectAllProducts
};