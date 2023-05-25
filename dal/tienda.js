const cnx = require('../common/appsettings');
const valida = require('../common/validatoken');
let pool = cnx.pool;

//NOMBRE DE LA TABLA
const nombreTabla = 'tienda';

const listarTienda = (request, response)=>{
    var obj = valida.validaToken(request)
    if (obj.estado){
        let cadena = `SELECT n_idtienda, n_idcliente, c_codigo, c_direccion, c_nombre_responsable, n_borrado FROM ${nombreTabla}
                    WHERE n_borrado = 0
        `;
        pool.query(cadena, 
        (error, results)=>{
            if (error) {
                console.log(error);
                response.status(200).json({ estado: false, mensaje: "DB: error3!.", data: null })
            } else {
                response.status(200).json({ estado: true, mensaje: "", data: results.rows  })
            }
        });
    }   
    else{
        response.status(200).json(obj)
    }
}

const agregarTienda = (request, response)=>{
    let n_idcliente = request.body.n_idcliente;
    let c_codigo = request.body.c_codigo;
    let c_direccion = request.body.c_direccion
    let c_nombre_responsable = request.body.c_nombre_responsable
    var obj = valida.validaToken(request)
    if (obj.estado){
        let cadena = `INSERT INTO ${nombreTabla}(n_idcliente, c_direccion, c_codigo, c_nombre_responsable, n_borrado, n_id_usercrea, d_fechacrea)
                    VALUES(${n_idcliente}, '${c_codigo}', '${c_direccion}', '${c_nombre_responsable}', 0, 1, now())
        `;
        pool.query(cadena, 
        (error, results)=>{
            if (error) {
                console.log(error);
                response.status(200).json({ estado: false, mensaje: "DB: error3!.", data: null })
            } else {
                response.status(200).json({ estado: true, mensaje: "", data: null })
            }
        });
    }else{
        response.status(200).json(obj)
    }
}

const actualizarTienda = (request, response)=>{
    let n_idtienda = request.body.n_idtienda;
    let n_idcliente = request.body.n_idcliente;
    let c_codigo = request.body.c_codigo;
    let c_direccion = request.body.c_direccion
    let c_nombre_responsable = request.body.c_nombre_responsable
    var obj = valida.validaToken(request)
    if (obj.estado){
        let cadena = `UPDATE ${nombreTabla} 
                      SET n_idcliente = ${n_idcliente}, c_codigo = '${c_codigo}', c_direccion = '${c_direccion}', c_nombre_responsable = '${c_nombre_responsable}', n_id_usermodi = 1, d_fechamodi = now()
                      WHERE n_idtienda = ${n_idtienda}
        `;
        pool.query(cadena, 
        (error, results)=>{
            if (error) {
                console.log(error);
                response.status(200).json({ estado: false, mensaje: "DB: error3!.", data: null })
            } else {
                response.status(200).json({ estado: true, mensaje: "", data: results.rows  })
            }
        });
    }else{
        response.status(200).json(obj)
    }

}

const eliminarTienda = (request, response)=>{
    let n_idtienda = request.body.n_idtienda;
    var obj = valida.validaToken(request)
    if (obj.estado){
        let cadena = `UPDATE ${nombreTabla} 
                    SET n_borrado = 1,  n_id_usermodi = 1, d_fechamodi = now()
                    WHERE n_idtienda = ${n_idtienda}
        `;
        pool.query(cadena, 
        (error, results)=>{
            if (error) {
                console.log(error);
                response.status(200).json({ estado: false, mensaje: "DB: error3!.", data: null })
            } else {
                response.status(200).json({ estado: true, mensaje: "", data: results.rows  })
            }
        });
    }else{
        response.status(200).json(obj)
    }

}

module.exports = {
    listarTienda,
    agregarTienda,
    actualizarTienda,
    eliminarTienda
}