import { Router } from "express";
import { createAdmin } from "../controllers/user.controllers.js";
const router = Router();

router.post("/", createAdmin);

// Endpoint para inicio de sesion, recibimos correo y password con una peticion POST
//router.post("/login", loginAdmin);

//router.post("/logout", logoutAdmin);

export default router;