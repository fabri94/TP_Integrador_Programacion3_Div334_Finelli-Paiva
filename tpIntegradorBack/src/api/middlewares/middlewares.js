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

//TO DO: Tal vez se puede hacer un MW para el POST que valide que todos los campos ingresados por el usuario
//al momento de crear un producto nuevo sean correctos.  Y que ademas valide que ese producto no exista ya en la bbdd
//(esta ultima validacion tal vez se puede hacer en otro mw por separado)

export{
    loggerUrl,
    validateId
}