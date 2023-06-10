const cnx = require('../common/appsettings');
const valida = require('../common/validatoken');
let pool = cnx.pool;

//NOMBRE DE LA TABLA
const nombreTabla = 'seg_userprofile';
const nombreTabla2 = 'seg_rol';
const rol_nombre_tecnico = "Técnico";

const listarTecnico = (request, response)=>{
    var obj = valida.validaToken(request)
    if (obj.estado){

        let cadena = `SELECT su.n_idseg_userprofile, su.c_username, su.c_nombre1, su.c_appaterno, su.c_dni n_borrado FROM ${nombreTabla} su
                      INNER JOIN ${nombreTabla2} sr ON sr.n_idseg_rol = su.n_idseg_rol AND sr.n_borrado = 0
                      WHERE su.n_borrado = 0 AND sr.c_nombre = '${rol_nombre_tecnico}'
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
    listarTecnico,
}