import { Router } from "express";
import ProductModel from "../models/product.models.js"
const router = Router();

//Rutas de las vistas 

router.get("/index", async (req, res) =>{ //Seria igual a que la dirección localhost:3000/dashboard abra el index.ejs
    try {
        let[resultado] = await ProductModel.selectAllProducts();
        res.render("index",{
            productos : resultado
        });
    } catch (error) {
        console.error(error);
    }
    //Renderiza una vista ejs
});

router.get("/search", (req, res) =>{ //Seria igual a que la dirección localhost:3000/dashboard abra el index.ejs
    res.render("search") //Renderiza una vista ejs
});

router.get("/create", (req, res) =>{ //Seria igual a que la dirección localhost:3000/dashboard abra el index.ejs
    res.render("create") //Renderiza una vista ejs
});

router.get("/eliminate", (req, res) =>{ //Seria igual a que la dirección localhost:3000/dashboard abra el index.ejs
    res.render("eliminate") //Renderiza una vista ejs
});

router.get("/update", (req, res) =>{ //Seria igual a que la dirección localhost:3000/dashboard abra el index.ejs
    res.render("update") //Renderiza una vista ejs
});

export default router;

