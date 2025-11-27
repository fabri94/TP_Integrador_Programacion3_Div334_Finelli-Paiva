import { Router } from "express";
import ProductModel from "../models/product.models.js"
import { requireLogin } from "../middlewares/middlewares.js";
const router = Router();

//Rutas de las vistas 

/*
router.get("/index", (req, res) =>{ //Seria igual a que la dirección localhost:3000/dashboard abra el index.ejs
    res.render("index") //Renderiza una vista ejs
});
*/

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


router.get("/search", requireLogin, (req, res) =>{ //Seria igual a que la dirección localhost:3000/dashboard abra el index.ejs
    
    res.render("search") //Renderiza una vista ejs
});

router.get("/create", requireLogin,  (req, res) =>{ //Seria igual a que la dirección localhost:3000/dashboard abra el index.ejs
    res.render("create") //Renderiza una vista ejs
});

router.get("/eliminate", requireLogin, (req, res) =>{ //Seria igual a que la dirección localhost:3000/dashboard abra el index.ejs
    res.render("eliminate") //Renderiza una vista ejs
});

router.get("/update", requireLogin, (req, res) =>{ //Seria igual a que la dirección localhost:3000/dashboard abra el index.ejs
    res.render("update") //Renderiza una vista ejs
});

router.get("/login", (req, res) =>{ //Seria igual a que la dirección localhost:3000/dashboard abra el index.ejs
    res.render("login") //Renderiza una vista ejs
});

export default router;

