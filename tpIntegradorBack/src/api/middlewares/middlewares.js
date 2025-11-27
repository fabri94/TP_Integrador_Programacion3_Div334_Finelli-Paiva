/*=================== 
Tipos de middleware
=====================
de aplicacion -> se aplica a todas las rutas (por ej cors, express.json(), etc)
de ruta -> se aplica a una ruta especifica. por ej validateId
*/

//MW de app basico que muestra por consola todas las peticiones (el metodo y la url) a nuestro servidor, junto con su fecha y hora
const loggerUrl = (req, res, next) =>{
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);

    next();
}

//MW de ruta basico, que valida que el ID ingresado sea correcto
const validateId = (req, res, next) =>{
    let {id} = req.params;

    if(!id || isNaN(Number(id))){
        return res.status(400).json({
            message : "Error. Debe ingresar un ID valido"
        })
    }

    req.id = parseInt(id, 10);
    console.log(`ID ${req.id} validado`);

    next();
}


// Middleware de ruta 
const requireLogin = (req, res, next) => {
    // Chequeamos si no existe la sesion de usuario, de ser asi, redirigimos a /login
    if(!req.session.user) {
        return res.redirect("/login");
    }
    next(); // Sin el next, nunca llega a procesar la respuesta -> response
};

export{
    loggerUrl,
    validateId,
    requireLogin
}