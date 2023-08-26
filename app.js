/**
 * Importación de librerías.
 */
const express = require('express'); // Librería para crear y manejar servidores web en Node.js.
const cors = require ('cors');
const cookieParser = require('cookie-parser');

/**
 * Importación del módulo de conexión a la base de datos (mongoose en app.js) {desetructuración}
 */
const { dbConnect } = require('./helpers/connection'); // Módulo personalizado para establecer la conexión a la base de datos.

/**
 * Carga las variables de entorno desde .env
 */
require('dotenv').config(); // Carga las variables de entorno definidas en el archivo .env.

/**
 * Crea una instancia de Express
 */
const app = express();

const port = process.env.PORT; // Puerto en el que se ejecutará el servidor web.

/**
 * Conexión a la base de datos MongoDB
 */
dbConnect(); // Función para establecer la conexión a la base de datos MongoDB.

/**
 * Configuración de middlewares
 */

//CORS
app.use(cors());

//COOKIEPARSER
app.use(cookieParser());

//parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false })); // Middleware para analizar los datos de formularios en las peticiones.

//parse application/json
app.use(express.json()); // Middleware para analizar el cuerpo de las peticiones en formato JSON.

/*--------------------------------------- RUTAS ---------------------------------------*/

/**
 * Configuración de rutas y manejo de peticiones
 */
app.use('/api/v1/blog', require('./routes/backRoutes')); // Utiliza las rutas definidas en el archivo backRoutes.js para las peticiones bajo el prefijo '/api/v1/blog'

app.use('/api/v1/auth', require('./routes/authRouters')); // Utiliza las rutas definidas en el archivo authRoutes.js para las peticiones bajo el prefijo '/api/v1/blog'

/**
 * Inicia el servidor
 */
app.listen(port, ()=>{
    console.log(`Servidor a la escucha del puerto ${port}`)

});

