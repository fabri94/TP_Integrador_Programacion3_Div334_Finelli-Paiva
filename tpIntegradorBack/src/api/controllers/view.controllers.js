import ProductModel from "../models/product.models.js"

export const vistaProductos = async (req, res) =>{ //Seria igual a que la dirección localhost:3000/dashboard abra el index.ejs
    
    try {
        let[resultado] = await ProductModel.selectAllProducts();
        res.render("index",{
            productos : resultado
        });
    } catch (error) {
        console.error(error);
    }
    //Renderiza una vista ejs
};