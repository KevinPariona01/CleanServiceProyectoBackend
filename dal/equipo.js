const cnx = require('../common/appsettings');
const valida = require('../common/validatoken');
let pool = cnx.pool;

//NOMBRE DE LA TABLA
const nombreTabla = 'gen_equipo';

const listarEquipo = (request, response)=>{
    var obj = valida.validaToken(request)
    if (obj.estado){
        let cadena = `SELECT n_idgen_equipo, c_nombre, c_descripcion, b_activo, n_borrado FROM ${nombreTabla}
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

const agregarEquipo = (request, response)=>{
    let c_nombre = request.body.c_nombre;
    let c_descripcion = request.body.c_descripcion;
    let b_activo = request.body.b_activo
    var obj = valida.validaToken(request)
    console.log(b_activo);
    if (obj.estado){
        let cadena = `INSERT INTO ${nombreTabla}(c_nombre, c_descripcion, b_activo, n_borrado, n_id_usercrea, d_fechacrea)
                      VALUES('${c_nombre}', '${c_descripcion}', ${b_activo}, 0, 1, now())
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

const actualizarEquipo = (request, response)=>{
    let n_idgen_equipo = request.body.n_idgen_equipo;
    let c_nombre = request.body.c_nombre;
    let c_descripcion = request.body.c_descripcion;
    let b_activo = request.body.b_activo
    var obj = valida.validaToken(request)
    if (obj.estado){
        let cadena = `UPDATE ${nombreTabla} 
                      SET c_nombre = '${c_nombre}', c_descripcion = '${c_descripcion}', b_activo = ${b_activo}, n_id_usermodi = 1, d_fechamodi = now()
                      WHERE n_idgen_equipo = ${n_idgen_equipo}
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

const eliminarEquipo = (request, response)=>{
    let n_idgen_equipo = request.body.n_idgen_equipo;
    var obj = valida.validaToken(request)
    if (obj.estado){
        let cadena = `UPDATE ${nombreTabla} 
                    SET n_borrado = 1,  n_id_usermodi = 1, d_fechamodi = now()
                    WHERE n_idgen_equipo = ${n_idgen_equipo}
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

const estadoEquipo = (request, response)=>{
    let n_idgen_equipo = request.body.n_idgen_equipo;
    let b_activo = request.body.b_activo;
    console.log(request.body);
    var obj = valida.validaToken(request)
    if (obj.estado){
        let cadena = `UPDATE ${nombreTabla} 
                        SET b_activo = ${b_activo},  n_id_usermodi = 1, d_fechamodi = now()
                        WHERE n_idgen_equipo = ${n_idgen_equipo}
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
    listarEquipo,
    agregarEquipo,
    actualizarEquipo,
    eliminarEquipo,
    estadoEquipo,
}