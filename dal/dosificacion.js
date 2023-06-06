const cnx = require('../common/appsettings');
const valida = require('../common/validatoken');
let pool = cnx.pool;

//NOMBRE DE LA TABLA
const nombreTabla = 'gen_dosificacion';

const listarDosificacion = (request, response)=>{
    var obj = valida.validaToken(request)
    if (obj.estado){
        let cadena = `SELECT n_idgen_dosificacion, c_nombre, c_descripcion, n_borrado FROM ${nombreTabla}
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

const agregarDosificacion = (request, response)=>{
    let c_nombre = request.body.c_nombre;
    let c_descripcion = request.body.c_descripcion;
    var obj = valida.validaToken(request)
    if (obj.estado){
        let cadena = `INSERT INTO ${nombreTabla}(c_nombre, c_descripcion, n_borrado, n_id_usercrea, d_fechacrea)
                    VALUES('${c_nombre}', '${c_descripcion}', 0, 1, now())
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

const actualizarDosificacion = (request, response)=>{
    let n_idgen_dosificacion = request.body.n_idgen_dosificacion;
    let c_nombre = request.body.c_nombre;
    let c_descripcion = request.body.c_descripcion;
    var obj = valida.validaToken(request)
    if (obj.estado){
        let cadena = `UPDATE ${nombreTabla} 
                      SET c_nombre = '${c_nombre}', c_descripcion = '${c_descripcion}', n_id_usermodi = 1, d_fechamodi = now()
                      WHERE n_idgen_dosificacion = ${n_idgen_dosificacion}
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

const eliminarDosificacion = (request, response)=>{
    let n_idgen_dosificacion = request.body.n_idgen_dosificacion;
    var obj = valida.validaToken(request)
    if (obj.estado){
        let cadena = `UPDATE ${nombreTabla} 
                    SET n_borrado = 1,  n_id_usermodi = 1, d_fechamodi = now()
                    WHERE n_idgen_dosificacion = ${n_idgen_dosificacion}
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
    listarDosificacion,
    agregarDosificacion,
    actualizarDosificacion,
    eliminarDosificacion
}