const cnx = require('../common/appsettings');
const valida = require('../common/validatoken');
let pool = cnx.pool;

//NOMBRE DE LA TABLA
const nombreTabla = 'gen_tienda';

const listarTienda = (request, response)=>{
    var obj = valida.validaToken(request)
    if (obj.estado){
        let cadena = `SELECT gt.n_idgen_tienda, gt.n_idgen_cliente, gt.c_codigo, gt.c_direccion, gt.c_nombre_responsable, gt.n_borrado, gc.c_codigo as cod_cliente 
                      FROM gen_tienda gt
                      INNER JOIN gen_cliente gc on gt.n_idgen_cliente = gc.n_idgen_cliente
                      WHERE gt.n_borrado = 0
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
    let n_idgen_cliente = request.body.n_idgen_cliente;
    let c_codigo = request.body.c_codigo;
    let c_direccion = request.body.c_direccion
    let c_nombre_responsable = request.body.c_nombre_responsable
    var obj = valida.validaToken(request)
    if (obj.estado){
        let cadena = `INSERT INTO ${nombreTabla}(n_idgen_cliente, c_codigo, c_direccion, c_nombre_responsable, n_borrado, n_id_usercrea, d_fechacrea)
                    VALUES(${n_idgen_cliente}, '${c_codigo}', '${c_direccion}', '${c_nombre_responsable}', 0, 1, now())
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
    let n_idgen_tienda = request.body.n_idgen_tienda;
    let n_idgen_cliente = request.body.n_idgen_cliente;
    let c_codigo = request.body.c_codigo;
    let c_direccion = request.body.c_direccion
    let c_nombre_responsable = request.body.c_nombre_responsable
    var obj = valida.validaToken(request)
    if (obj.estado){
        let cadena = `UPDATE ${nombreTabla} 
                      SET n_idgen_cliente = ${n_idgen_cliente}, c_codigo = '${c_codigo}', c_direccion = '${c_direccion}', c_nombre_responsable = '${c_nombre_responsable}', n_id_usermodi = 1, d_fechamodi = now()
                      WHERE n_idgen_tienda = ${n_idgen_tienda}
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
    let n_idgen_tienda = request.body.n_idgen_tienda;
    var obj = valida.validaToken(request)
    if (obj.estado){
        let cadena = `UPDATE ${nombreTabla} 
                    SET n_borrado = 1,  n_id_usermodi = 1, d_fechamodi = now()
                    WHERE n_idgen_tienda = ${n_idgen_tienda}
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

const validarNoRepetir = (request, response)=>{
    let c_codigo = request.body.c_codigo;
    let n_idgen_tienda = request.body.n_idgen_tienda;
    var obj = valida.validaToken(request)
    if (obj.estado){
        let cadena = `SELECT c_codigo FROM ${nombreTabla}
                      WHERE c_codigo = '${c_codigo}' AND n_idgen_tienda<>${n_idgen_tienda} AND n_borrado = 0
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
    eliminarTienda,
    validarNoRepetir
}