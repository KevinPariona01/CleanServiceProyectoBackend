const cnx = require('../common/appsettings');
const valida = require('../common/validatoken');
let pool = cnx.pool;

//NOMBRE DE LA TABLA
const nombreTabla = 'producto';

const listarProducto = (request, response)=>{
    var obj = valida.validaToken(request)
    //if (obj.estado){}
    let cadena = `SELECT n_idproducto, c_codigo, c_descripcion, n_borrado FROM ${nombreTabla}
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

const agregarProducto = (request, response)=>{
    let c_codigo = request.body.c_codigo;
    let c_descripcion = request.body.c_descripcion
    var obj = valida.validaToken(request)
    //if (obj.estado){}

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

}

const actualizarProducto = (request, response)=>{
    let n_idproducto = request.body.n_idproducto;
    let c_codigo = request.body.c_codigo;
    let c_descripcion = request.body.c_descripcion
    var obj = valida.validaToken(request)
    //if (obj.estado){}
    let cadena = `UPDATE ${nombreTabla} 
                  SET c_codigo = '${c_codigo}', c_descripcion = '${c_descripcion}',  n_id_usermodi = 1, d_fechamodi = now()
                  WHERE n_idproducto = ${n_idproducto}
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

const eliminarProducto = (request, response)=>{
    let n_idproducto = request.body.n_idproducto;
    var obj = valida.validaToken(request)
    //if (obj.estado){}
    let cadena = `UPDATE ${nombreTabla} 
                  SET n_borrado = 1,  n_id_usermodi = 1, d_fechamodi = now()
                  WHERE n_idproducto = ${n_idproducto}
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

module.exports = {
    listarProducto,
    agregarProducto,
    actualizarProducto,
    eliminarProducto
}