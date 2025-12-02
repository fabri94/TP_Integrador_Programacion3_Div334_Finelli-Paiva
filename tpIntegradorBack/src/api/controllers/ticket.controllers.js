import TicketModel from "../models/ticket.models.js"

export const createTicket = async(req, res) =>{
    try{
        const{ nombreUsuario, precioTotal, fechaEmision, productos } = req.body;
        if(!nombreUsuario || precioTotal===undefined || precioTotal === null || !precioTotal || !fechaEmision || !Array.isArray(productos) || productos.length===0){
            return res.status(400).json({
                message: `Datos invalidos. Se deben enviar nombreUsuario, precioTotal, fechaEmision y productos`
            });
        }
        
        const [resultadoTicket] = await TicketModel.insertTicket(nombreUsuario,precioTotal,fechaEmision);

        const ticketId = resultadoTicket.insertId;        

        for(const idProducto of productos){
            await TicketModel.insertProducts_Tickets(idProducto,ticketId);
        }

        res.status(201).json({
            message: "Venta registrada con exito",
            ticketId: ticketId
        });
    }catch(error){
        console.error(error);
        res.status(500).json({
            message : "Error interno del servidor",
            error: error.message
        })
    }
};