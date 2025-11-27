import UserModel from "../models/user.models.js"

export const createAdmin = async (req, res) => {
    try {
        const { email, password, nombre } = req.body;

        if(!email || !password || !nombre) {
            return res.status(400).json({
                message: "Datos invalidos, asegurate de enviar todos los campos"
            });
        }
        const [resultado] = await UserModel.insertAdmin(email,password,nombre);
        console.log(resultado);

        res.status(201).json({
            message: "Usuario creado con exito",
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error interno en el servidor",
            error: error
        })
    }
};

/*
export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Evitamos consulta innecesaria
        if(!email || !password) {
            return res.render("login", {
                error: "Todos los campos son obligatorios!"
            });
        }

        const [rows] = await UserModel.selectAdmin(email, password);

        // Si no existen usuarios con ese correo o password
        if(rows.length === 0) {
            return res.render("login", {
                error: "Credenciales incorrectas!"
            });
        }

        console.log(rows);
        const user = rows[0];
        console.table(user);

        // Ahora toca guardar sesion y hacer el redirect
        // Crearmos la sesion del usuario, que es un objeto que guarda su id y su correo
        req.session.user = {
            id: user.id,
            correo: user.correo
        }

        res.redirect("/"); // Redirigimos a la pagina principal

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
};

export const logoutAdmin = (req, res) => {

    // Destruimos la sesion que habiamos creado
    req.session.destroy((error) => {
        if(error) {
            console.error("Error al destruir la sesion", error);
            return res.status(500).json({
                error: "Error al cerrar la sesion"
            })
        }

        res.redirect("login"); // Redirigimos a login
    })
}*/