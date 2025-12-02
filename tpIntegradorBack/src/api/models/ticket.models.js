import connection from "../database/db.js";

const insertTicket = (nombreUsuario, precioTotal,fechaEmision) =>{
    const sqlTicket = `INSERT INTO tickets (nombreUsuario, precioTotal, fechaEmision) VALUES (?,?,?)`

    return connection.query(sqlTicket, [nombreUsuario, precioTotal,fechaEmision]);
}

const insertProducts_Tickets = (idProducto, ticketId) =>{
    const sqlProductosTickets = `INSERT INTO productos_tickets (idProducto, idTicket) VALUES (?,?)`

    return connection.query(sqlProductosTickets, [idProducto, ticketId]);
}

export default{
    insertTicket,
    insertProducts_Tickets
};