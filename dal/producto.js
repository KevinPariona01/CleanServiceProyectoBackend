const cnx = require('../common/appsettings');
const valida = require('../common/validatoken');
let pool = cnx.pool;

//NOMBRE DE LA TABLA
const nombreTabla = 'gen_producto';

const listarProducto = (request, response)=>{
    var obj = valida.validaToken(request)
    if (obj.estado){

        let cadena = `SELECT n_idgen_producto, c_codigo, c_descripcion, n_borrado FROM ${nombreTabla}
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

    }else{
        response.status(200).json(obj)
    }
    

}

const agregarProducto = (request, response)=>{
    let c_codigo = request.body.c_codigo;
    let c_descripcion = request.body.c_descripcion
    var obj = valida.validaToken(request)
    if (obj.estado){
        let cadena = `INSERT INTO ${nombreTabla}(c_codigo, c_descripcion, n_borrado, n_id_usercrea, d_fechacrea)
                  VALUES('${c_codigo}', '${c_descripcion}', 0, 1, now())
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
        
    } else {
        response.status(200).json(obj)
    }

    

}

const actualizarProducto = (request, response)=>{
    let n_idgen_producto = request.body.n_idgen_producto;
    let c_codigo = request.body.c_codigo;
    let c_descripcion = request.body.c_descripcion
    var obj = valida.validaToken(request)
    if (obj.estado){
        let cadena = `UPDATE ${nombreTabla} 
                    SET c_codigo = '${c_codigo}', c_descripcion = '${c_descripcion}',  n_id_usermodi = 1, d_fechamodi = now()
                    WHERE n_idgen_producto = ${n_idgen_producto}
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

const eliminarProducto = (request, response)=>{
    let n_idgen_producto = request.body.n_idgen_producto;
    var obj = valida.validaToken(request)
    if (obj.estado){
        let cadena = `UPDATE ${nombreTabla} 
                    SET n_borrado = 1,  n_id_usermodi = 1, d_fechamodi = now()
                    WHERE n_idgen_producto = ${n_idgen_producto}
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
    listarProducto,
    agregarProducto,
    actualizarProducto,
    eliminarProducto
}