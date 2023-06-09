const express = require('express')
var cors = require('cors');
const app = express()
const port = 3200
const server = require('http').Server(app);
const ruta = '/archivos';
const icon = '/icons';
var bodyParser = require('body-parser');

//MIDDLEWARES
app.use(bodyParser.json({ limit: '1000mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '1000mb' }));
app.use(cors());
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use('/archivos', express.static(__dirname + ruta));
app.use('/icons', express.static(__dirname + icon));


/****IMPORTACIONES DAL****/
const dbSeguridad = require('./dal/seguridad')
const producto = require('./dal/producto')//PRODUCTO
const cliente = require('./dal/cliente')//CLIENTE
const tienda = require('./dal/tienda')//CLIENTE
const periodo = require('./dal/periodo')//PERIODO
const orden = require('./dal/orden')//ORDEN
const equipo = require('./dal/equipo')//EQUIPO
const metodologia = require('./dal/metodologia')//METODOLOGIA
const recomendacion = require('./dal/recomendacion')//RECOMENDACION
const observacion = require('./dal/observacion')//OBSERVACION
const infestacion = require('./dal/infestacion')//INFESTACION
const personal = require('./dal/personal')//PERSONAL
const especie = require('./dal/especie')//ESPECIE
const dosificacion = require('./dal/dosificacion')//DOSIFICACION
const incidente = require('./dal/incidente')//INCIDENTE
const tecnico = require('./dal/tecnico')//TECNICO
const dbMovil = require('./dal/movil')//MOVIL


/****SOCKET****/
const options = {
  cors: {
    origin: 'http://localhost:4200',
  },
};
const io = require('socket.io')(server, options);
io.on('connection', function (socket) {
  const handshake = socket.id;
  let  nameRoom  = socket.handshake.query;
  console.log(handshake);
  console.log(nameRoom);  
  socket.join(nameRoom)
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });

});


/****RUTAS****/
app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})



/****SEGURIDAD****/
app.post('/api/seguridad/login', dbSeguridad.login)
app.post('/api/seguridad/get', dbSeguridad.get)
app.post('/api/seguridad/getrole', dbSeguridad.getrole) 
app.post('/api/seguridad/getRolUser', dbSeguridad.getRolUser)
app.post('/api/seguridad/validarDatos', dbSeguridad.validarDatos)
app.post('/api/seguridad/saveUser', dbSeguridad.saveUser)
app.post('/api/seguridad/resetearclave', dbSeguridad.resetearclave)
app.post('/api/seguridad/delete_usuario', dbSeguridad.delete_usuario) 
app.post('/api/seguridad/estadoUser', dbSeguridad.estadoUser)
app.post('/api/seguridad/saveRol', dbSeguridad.saveRol)
app.post('/api/seguridad/deleteRol',dbSeguridad.deleteRol) 
app.post('/api/seguridad/getPantallaRol',dbSeguridad.getPantallaRol) 
app.post('/api/seguridad/getPantalla',dbSeguridad.getPantalla) 
app.post('/api/seguridad/updatePantallaRol',dbSeguridad.updatePantallaRol)
app.post('/api/seguridad/getDataUser',dbSeguridad.getDataUser) 

/****MOVIL****/
app.get('/api/movil/getusuario', dbMovil.getusuario)

/****PRODUCTO****/
app.post('/api/producto/listarProducto', producto.listarProducto)
app.post('/api/producto/agregarProducto', producto.agregarProducto)
app.post('/api/producto/actualizarProducto', producto.actualizarProducto)
app.post('/api/producto/eliminarProducto', producto.eliminarProducto)
app.post('/api/producto/validarNoRepetir', producto.validarNoRepetir)

/****CLIENTE****/
app.post('/api/cliente/listarCliente', cliente.listarCliente)
app.post('/api/cliente/agregarCliente', cliente.agregarCliente)
app.post('/api/cliente/actualizarCliente', cliente.actualizarCliente)
app.post('/api/cliente/eliminarCliente', cliente.eliminarCliente)
app.post('/api/cliente/clienteXCodigo', cliente.clienteXCodigo)
app.post('/api/cliente/validarNoRepetir', cliente.validarNoRepetir)

/****TIENDA****/
app.post('/api/tienda/listarTienda', tienda.listarTienda)
app.post('/api/tienda/agregarTienda', tienda.agregarTienda)
app.post('/api/tienda/actualizarTienda', tienda.actualizarTienda)
app.post('/api/tienda/eliminarTienda', tienda.eliminarTienda)
app.post('/api/tienda/validarNoRepetir', tienda.validarNoRepetir)

/****PERIODO****/
app.post('/api/periodo/listarPeriodo', periodo.listarPeriodo)
app.post('/api/periodo/agregarPeriodo', periodo.agregarPeriodo)
app.post('/api/periodo/actualizarPeriodo', periodo.actualizarPeriodo)
app.post('/api/periodo/eliminarPeriodo', periodo.eliminarPeriodo)
app.post('/api/periodo/estadoPeriodo', periodo.estadoPeriodo)
app.post('/api/periodo/listarPeriodoActivos', periodo.listarPeriodoActivos)

/****ORDEN****/
app.post('/api/orden/listarOrden', orden.listarOrden)
app.post('/api/orden/agregarOrden', orden.agregarOrden)
app.post('/api/orden/asignarOrdenesTecnico', orden.asignarOrdenesTecnico)

/****EQUIPO****/
app.post('/api/equipo/listarEquipo', equipo.listarEquipo)
app.post('/api/equipo/agregarEquipo', equipo.agregarEquipo)
app.post('/api/equipo/actualizarEquipo', equipo.actualizarEquipo)
app.post('/api/equipo/eliminarEquipo', equipo.eliminarEquipo)
app.post('/api/equipo/estadoEquipo', equipo.estadoEquipo)

/****METODOLOGIA****/
app.post('/api/metodologia/listarMetodologia', metodologia.listarMetodologia)
app.post('/api/metodologia/agregarMetodologia', metodologia.agregarMetodologia)
app.post('/api/metodologia/actualizarMetodologia', metodologia.actualizarMetodologia)
app.post('/api/metodologia/eliminarMetodologia', metodologia.eliminarMetodologia)

/****RECOMENDACION****/
app.post('/api/recomendacion/listarRecomendacion', recomendacion.listarRecomendacion)
app.post('/api/recomendacion/agregarRecomendacion', recomendacion.agregarRecomendacion)
app.post('/api/recomendacion/actualizarRecomendacion', recomendacion.actualizarRecomendacion)
app.post('/api/recomendacion/eliminarRecomendacion', recomendacion.eliminarRecomendacion)

/****OBSERVACION****/
app.post('/api/observacion/listarObservacion', observacion.listarObservacion)
app.post('/api/observacion/agregarObservacion', observacion.agregarObservacion)
app.post('/api/observacion/actualizarObservacion', observacion.actualizarObservacion)
app.post('/api/observacion/eliminarObservacion', observacion.eliminarObservacion)

/****INFESTACION****/
app.post('/api/infestacion/listarInfestacion', infestacion.listarInfestacion)
app.post('/api/infestacion/agregarInfestacion', infestacion.agregarInfestacion)
app.post('/api/infestacion/actualizarInfestacion', infestacion.actualizarInfestacion)
app.post('/api/infestacion/eliminarInfestacion', infestacion.eliminarInfestacion)

/****PERSONAL****/
app.post('/api/personal/listarPersonal', personal.listarPersonal)
app.post('/api/personal/agregarPersonal', personal.agregarPersonal)
app.post('/api/personal/actualizarPersonal', personal.actualizarPersonal)
app.post('/api/personal/eliminarPersonal', personal.eliminarPersonal)

/****ESPECIE****/
app.post('/api/especie/listarEspecie', especie.listarEspecie)
app.post('/api/especie/agregarEspecie', especie.agregarEspecie)
app.post('/api/especie/actualizarEspecie', especie.actualizarEspecie)
app.post('/api/especie/eliminarEspecie', especie.eliminarEspecie)

/****DOSIFICACION****/
app.post('/api/dosificacion/listarDosificacion', dosificacion.listarDosificacion)
app.post('/api/dosificacion/agregarDosificacion', dosificacion.agregarDosificacion)
app.post('/api/dosificacion/actualizarDosificacion', dosificacion.actualizarDosificacion)
app.post('/api/dosificacion/eliminarDosificacion', dosificacion.eliminarDosificacion)

/****INCIDENTE****/
app.post('/api/incidente/listarIncidente', incidente.listarIncidente)
app.post('/api/incidente/agregarIncidente', incidente.agregarIncidente)
app.post('/api/incidente/actualizarIncidente', incidente.actualizarIncidente)
app.post('/api/incidente/eliminarIncidente', incidente.eliminarIncidente)

/****TECNICO****/
app.post('/api/tecnico/listarTecnico', tecnico.listarTecnico)













server.listen(port, () => {
  console.log('\n')
  console.log(`App running on port ${port}.`)
})

