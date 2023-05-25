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

/****CLIENTE****/
app.post('/api/cliente/listarCliente', cliente.listarCliente)
app.post('/api/cliente/agregarCliente', cliente.agregarCliente)
app.post('/api/cliente/actualizarCliente', cliente.actualizarCliente)
app.post('/api/cliente/eliminarCliente', cliente.eliminarCliente)

/****TIENDA****/
app.post('/api/tienda/listarTienda', tienda.listarTienda)
app.post('/api/tienda/agregarTienda', tienda.agregarTienda)
app.post('/api/tienda/actualizarTienda', tienda.actualizarTienda)
app.post('/api/tienda/eliminarTienda', tienda.eliminarTienda)

/****PERIODO****/
app.post('/api/periodo/listarPeriodo', periodo.listarPeriodo)
app.post('/api/periodo/agregarPeriodo', periodo.agregarPeriodo)
app.post('/api/periodo/actualizarPeriodo', periodo.actualizarPeriodo)
app.post('/api/periodo/eliminarPeriodo', periodo.eliminarPeriodo)
app.post('/api/periodo/estadoPeriodo', periodo.estadoPeriodo)













server.listen(port, () => {
  console.log('\n')
  console.log(`App running on port ${port}.`)
})

