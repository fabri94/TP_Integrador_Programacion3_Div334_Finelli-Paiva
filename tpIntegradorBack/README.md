# TP Integrador DIV 334 Back :computer: :frog:

## Guia del TP

## 1 / Configuracion inicial de proyecto

### 1.1 Instalacion  y archivos basicos
- Instalamos Node.js y NPM e inicializamos  el proyecto con 
```sh
npm init -y
```

- Creamos el arhcivo principal `index.js` y el archivo de documentacion `README.md`

### 1.2 Instalacion de dependencias

Recordemos que muchas veces los pasos a seguir seran:
    1.Instalacion (de modulos)
    2.Implementacion(de modulos)
    3.
- **express**: Framework minimalista Node.js para crear servidores web
- **mysql2**: Cliente mysql para Node.js
- **nodemon**: Herramienta que reinicia automaticamente la aplicacion Node.js cuando detecta cambios en los archivos
- **dotenv**: Modulo que carga variables de entorno desde un archivo `.env` al entorno de ejecucion de Node.js

```sh
npm install express mysql2 nodemon dotenv 
```

### 1.3 Setup del proyecto
- Creamos el archivo .gitignore y le agregamos node_modules
- Creamos un script personalizados en `package.json`
- Agregamos el type module para usar la sintaxis moderna ES6 llamada ESM o EcmaScript Modules
```json
"type" :  "module",
  "scripts": {
      "dev":"nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```


### 1.4 Creamos el archivo de variables de entorno `.env`
- Creamos el archivo .`env` que va a contener informacion sensible de nuestro proyecto
- En nuestro archivo .env le agregamos las variables locales sensibles como el puerto o la conexion a la BBDD

```txt
PORT = 3000
DB_HOST = "localhost"
DB_NAME = "tp_prog_iii"
DB_USER = "root"
DB_PASSWORD = "abc123."
```


## 2 / Estructura de directorios y conexion a la BBDD
- Creamos la nueva carpeta y archivo `src/api/config/environments.js` para procesar y exportar la informacion de nuestras variables de entorno

```js
//environments.js
```

- Creamos la nueva carpeta y archivo `src/api/database/db.js` , que sera el modulo que va a crear y exportar la conexion a nuestra BBDD

```js
//db.js
```


## Creamos nuestro primer endpoint
- Creamos un servidor minimo de Express.js