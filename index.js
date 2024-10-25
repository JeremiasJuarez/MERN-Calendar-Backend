const express = require('express');
require('dotenv').config();
const cors = require('cors')
const { dbConnection } = require('./database/config')

console.log( process.env );

//Crear servidor Express
const app = express();

//Base de datos
dbConnection();

//CORS
app.use(cors())

//Directorio publico
app.use( express.static('public'));

//Lectura y parseo del body
    //!todas las peticiones que vengan en formato json van a ser procesadas aca y se va a extraer su contenido
app.use( express.json() );

//Rutas
    //auth// crear, login, renew
    //!TODAS LAS PETICIONES QUE SE HAGAN DESDE "/api/auth" van a seguir las rutas del
    //! router en "./routes/auth". Osea que si hacemos un get desde la ruta /api/auth
    //! la funcion que se ejecuta es el router.get que se definio en el archivo ./routes/auth
    
app.use('/api/auth', require('./routes/auth'));

    //crearEvento, getEventos, eliminarEvento, actualizarEvento
    //!TODAS LAS PETICIONES QUE SE HAGAN DESDE LA RUTA "/api/events" van a seguir los metodos
    //! definidos en el archivo root>controllers>events.js 
app.use('/api/events', require('./routes/events'))



    //TODO: CRUD: Eventos

//Escuchar peticiones
app.listen( process.env.PORT , ()=>{
    console.log(`Servidor Corriendo en puerto ${ process.env.PORT }`);
});