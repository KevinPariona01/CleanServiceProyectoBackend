const cnx = require('../common/appsettings');
const valida = require('../common/validatoken');
let pool = cnx.pool;

//NOMBRE DE LA TABLA
const nombreTabla = 'gen_periodo';

const listarPeriodo = (request, response)=>{
    var obj = valida.validaToken(request)
    if (obj.estado){
        let cadena = `SELECT n_idgen_periodo, c_mes, c_anio, c_descripcion, b_activo, n_borrado FROM ${nombreTabla}
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

const agregarPeriodo = (request, response)=>{
    let c_mes = request.body.c_mes;
    let c_anio = request.body.c_anio;
    let c_descripcion = request.body.c_descripcion
    let b_activo = request.body.b_activo
    var obj = valida.validaToken(request)
    if (obj.estado){
        let cadena = `INSERT INTO ${nombreTabla}(c_mes, c_anio, c_descripcion, b_activo, n_borrado, n_id_usercrea, d_fechacrea)
                    VALUES('${c_mes}', '${c_anio}', '${c_descripcion}', ${b_activo}, 0, 1, now())
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

const actualizarPeriodo = (request, response)=>{
    let n_idgen_periodo = request.body.n_idgen_periodo;
    let c_mes = request.body.c_mes;
    let c_anio = request.body.c_anio
    let c_descripcion = request.body.c_descripcion;
    let b_activo = request.body.b_activo
    var obj = valida.validaToken(request)
    if (obj.estado){
        let cadena = `UPDATE ${nombreTabla} 
                      SET c_mes = '${c_mes}', c_anio = '${c_anio}', c_descripcion = '${c_descripcion}', b_activo = ${b_activo}, n_id_usermodi = 1, d_fechamodi = now()
                      WHERE n_idgen_periodo = ${n_idgen_periodo}
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

const eliminarPeriodo = (request, response)=>{
    let n_idgen_periodo = request.body.n_idgen_periodo;
    var obj = valida.validaToken(request)
    if (obj.estado){
        let cadena = `UPDATE ${nombreTabla} 
                    SET n_borrado = 1,  n_id_usermodi = 1, d_fechamodi = now()
                    WHERE n_idgen_periodo = ${n_idgen_periodo}
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

const estadoPeriodo = (request, response)=>{
    let n_idgen_periodo = request.body.n_idgen_periodo;
    let b_activo = request.body.b_activo;
    var obj = valida.validaToken(request)
    if (obj.estado){
        let cadena = `UPDATE ${nombreTabla} 
                    SET b_activo = ${b_activo},  n_id_usermodi = 1, d_fechamodi = now()
                    WHERE n_idgen_periodo = ${n_idgen_periodo}
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
    listarPeriodo,
    agregarPeriodo,
    actualizarPeriodo,
    eliminarPeriodo,
    estadoPeriodo
}