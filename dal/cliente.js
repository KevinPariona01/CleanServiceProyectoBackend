const cnx = require('../common/appsettings');
const valida = require('../common/validatoken');
let pool = cnx.pool;

//NOMBRE DE LA TABLA
const nombreTabla = 'cliente';

const listarCliente = (request, response)=>{
    var obj = valida.validaToken(request)
    if (obj.estado){
        let cadena = `SELECT n_idcliente, c_codigo, c_razon_social, c_direccion, n_borrado FROM ${nombreTabla}
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

const agregarCliente = (request, response)=>{
    let c_codigo = request.body.c_codigo;
    let c_razon_social = request.body.c_razon_social
    let c_direccion = request.body.c_direccion
    var obj = valida.validaToken(request)
    if (obj.estado){
        let cadena = `INSERT INTO ${nombreTabla}(c_codigo, c_razon_social, c_direccion, n_borrado, n_id_usercrea, d_fechacrea)
                    VALUES('${c_codigo}', '${c_razon_social}', '${c_direccion}', 0, 1, now())
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

const actualizarCliente = (request, response)=>{
    let n_idcliente = request.body.n_idcliente;
    let c_codigo = request.body.c_codigo;
    let c_razon_social = request.body.c_razon_social
    let c_direccion = request.body.c_direccion
    var obj = valida.validaToken(request)
    if (obj.estado){
        let cadena = `UPDATE ${nombreTabla} 
                    SET c_codigo = '${c_codigo}', c_razon_social = '${c_razon_social}', c_direccion = '${c_direccion}', n_id_usermodi = 1, d_fechamodi = now()
                    WHERE n_idcliente = ${n_idcliente}
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

const eliminarCliente = (request, response)=>{
    let n_idcliente = request.body.n_idcliente;
    var obj = valida.validaToken(request)
    if (obj.estado){
        let cadena = `UPDATE ${nombreTabla} 
                    SET n_borrado = 1,  n_id_usermodi = 1, d_fechamodi = now()
                    WHERE n_idcliente = ${n_idcliente}
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
    listarCliente,
    agregarCliente,
    actualizarCliente,
    eliminarCliente
}