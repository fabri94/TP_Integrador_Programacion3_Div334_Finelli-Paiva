import { Router } from "express";
import { validateId } from "../middlewares/middlewares";
import { createProduct, getProductById, getProducts, modifyProduct, removeProduct } from "../controllers/product.controllers.js";

const router = Router();

//Devuelve todos los productos de la BBDD
router.get("/", getProducts);

//Devuelve un producto en especifico de la BBDD que coincide con el ID ingresado
router.get("/:id", validateId, getProductById);

//Crea y hace una nueva insercion de un producto en la BBDD
router.post("/", createProduct);

/*
Elimina un producto de la BBDD por el ID ingresado (tal como esta implementado ahora)
NOTA: Si hay que respetar a rajatabla el TP, hay que hacer una baja logica mas bien (ver opcion 2 dentro del scope)
Que pase el estado del producto a inactivo (booleano)
*/
router.delete("/:id", validateId, removeProduct);

/*Actualiza un producto ya existente en la BBDD
NOTA: Este endpoint recibe el ID por el body de la peticion. 
Por eso la url del endpoint no es "/products/:id" como sucede en el getById y el delete
*/

router.put("/", modifyProduct);

export default router;