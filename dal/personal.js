const cnx = require('../common/appsettings');
const valida = require('../common/validatoken');
let pool = cnx.pool;

//NOMBRE DE LA TABLA
const nombreTabla = 'gen_personal';

const listarPersonal= (request, response)=>{
    var obj = valida.validaToken(request)
    if (obj.estado){
        let cadena = `SELECT n_idgen_personal, c_nombre, c_email, n_borrado FROM ${nombreTabla}
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

const agregarPersonal = (request, response)=>{
    let c_nombre = request.body.c_nombre;
    let c_email = request.body.c_email;
    var obj = valida.validaToken(request)
    if (obj.estado){
        let cadena = `INSERT INTO ${nombreTabla}(c_nombre, c_email, n_borrado, n_id_usercrea, d_fechacrea)
                    VALUES('${c_nombre}', '${c_email}', 0, 1, now())
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

const actualizarPersonal = (request, response)=>{
    let n_idgen_personal = request.body.n_idgen_personal;
    let c_nombre = request.body.c_nombre;
    let c_email = request.body.c_email;
    var obj = valida.validaToken(request)
    if (obj.estado){
        let cadena = `UPDATE ${nombreTabla} 
                      SET c_nombre = '${c_nombre}', c_email = '${c_email}', n_id_usermodi = 1, d_fechamodi = now()
                      WHERE n_idgen_personal = ${n_idgen_personal}
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

const eliminarPersonal = (request, response)=>{
    let n_idgen_personal = request.body.n_idgen_personal;
    var obj = valida.validaToken(request)
    if (obj.estado){
        let cadena = `UPDATE ${nombreTabla} 
                    SET n_borrado = 1,  n_id_usermodi = 1, d_fechamodi = now()
                    WHERE n_idgen_personal = ${n_idgen_personal}
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
    listarPersonal,
    agregarPersonal,
    actualizarPersonal,
    eliminarPersonal
}