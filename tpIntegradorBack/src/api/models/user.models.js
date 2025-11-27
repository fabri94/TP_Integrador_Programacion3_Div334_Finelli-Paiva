import connection from "../database/db.js";

const insertAdmin = (email, password, nombre) =>{
    let sql = `
        INSERT INTO usuarios (email, password, nombre)
        VALUES (?, ?, ?)
    `;

    return connection.query(sql, [email, password, nombre]);
}


const selectAdmin = (email,password)=>{
    let sql = `SELECT * FROM usuarios where email = ? AND password = ?`;

    return connection.query(sql, [email, password]);
}

export default{
    insertAdmin,
    selectAdmin
}