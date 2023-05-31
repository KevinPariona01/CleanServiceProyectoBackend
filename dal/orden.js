const cnx = require('../common/appsettings');
const valida = require('../common/validatoken');
let pool = cnx.pool;

//NOMBRE DE LA TABLA
const nombreTabla = 'gen_orden';

const listarOrden = (request, response)=>{
    let n_idgen_periodo = request.body.n_idgen_periodo;
    var obj = valida.validaToken(request)
    if (obj.estado){
        let cadena = `SELECT go.n_idgen_orden, go.c_estado, go.c_descripcion, go.n_borrado, 
                      gt.c_codigo, gt.c_direccion, 
                      gp.c_mes, gp.c_descripcion as p_c_descripcion
                      FROM ${nombreTabla} go
                      INNER JOIN gen_tienda gt on gt.n_idgen_tienda = go.n_idgen_tienda AND gt.n_borrado = 0
                      INNER JOIN gen_periodo gp on gp.n_idgen_periodo = go.n_idgen_periodo AND gp.n_borrado = 0
                      WHERE go.n_borrado = 0 and (go.n_idgen_periodo = ${n_idgen_periodo} or 0 = ${n_idgen_periodo} )
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

const agregarOrden = async (request, response)=>{
    let periodos = request.body.periodos;
    let n_idgen_periodo = request.body.n_idgen_periodo;
    let usuario = request.body.usuario;
    const estado = Object.keys(periodos[0]).includes("ESTADO") ?true:false;
    const descripcion = Object.keys(periodos[0]).includes("DESCRIPCION")?true:false;
    const tienda = Object.keys(periodos[0]).includes("TIENDA")?true:false;
    //ERRORES
    let errorObject;
    let resultNuloObject;
    let filaS = 2;
    errrorSelect = [];
    resultNulos = [];
    var obj = valida.validaToken(request)
    if (obj.estado){
        if(estado && descripcion && tienda){
            //BUSQUEDA DE ID
            for(let p of periodos){
                await new Promise((resolve)=>{
                    let busqueda = `SELECT n_idgen_tienda FROM gen_tienda WHERE c_codigo = '${p.TIENDA}' and n_borrado = 0`;
                    pool.query(busqueda, (error, results)=>{
                        if(error){//MANEJO DE ERRORES DE QUERY
                            errorObject = {
                                mensaje:error.toString(),
                                fila: 'ERROR DB'
                            }
                            errrorSelect.push(errorObject);
                            resolve();
                        }else{//MANEJO DE CODIGOS QUE NO SE ENCUENTRAN
                            if(results.rows.length==0){
                                resultNuloObject = {
                                    mensaje:'No se encontro código: '+ p.TIENDA,
                                    fila: filaS
                                }
                                resultNulos.push(resultNuloObject);
                            }else{
                                p.id_tienda = results.rows[0].n_idgen_tienda//INCLUSION DE ID
                            }
                            resolve();
                        }
                    });
                });
                if(errrorSelect.length!=0){//SI HAY ERROR SALE DEL FOR
                    console.log("ERROR");
                    break;
                }
                filaS++;//ITERACION PARA SABER QUE FILA
            }

            //SI SALE ERROR YA NO CONTINUA
            if(errrorSelect.length!=0){
                response.status(200).json({ estado: false, mensaje: "DB: error!.", data: null, error: errrorSelect })
                return;
            }

            //VERIFICA SI HAY VACIOS
            if(resultNulos.length!=0){
                response.status(200).json({ estado: false, mensaje: "", data: null, error: resultNulos })
                return;
            }

            //INICIO DE LA INSERCION
            const arregloCadenas = periodos.map(objeto => {
                return `('${objeto.ESTADO}', '${objeto.DESCRIPCION}', '${objeto.TIENDA}', ${objeto.id_tienda})::objeto_type_orden_excel`;
            });
              
            let cadena = `SELECT insertar_datos_orden_excel(ARRAY[${arregloCadenas}], ${n_idgen_periodo}, ${usuario})`;

            pool.query(cadena, (error, results)=>{
                if(error){
                    errorObject = {
                        mensaje:error.toString(),
                        fila: 'ERROR DB'
                    }
                    errrorSelect.push(errorObject);
                    response.status(200).json({ estado: false, mensaje: "DB: error!.", data: null, error: errrorSelect })
                }else{
                    let error_band =  Object.keys(results.rows[0].insertar_datos_orden_excel[0]).includes("fila")
                    if(error_band){
                        response.status(200).json({estado: true, mensaje: "", data: results.rows[0].insertar_datos_orden_excel, error_func : true});
                    }else{
                        response.status(200).json({estado: true, mensaje: "", data: results.rows});
                    }
                    
                }
            });
        }else{
            response.status(200).json({estado: false, mensaje: "Nombres de la columnas mal puestas", data: null});
        }
    }else{
        response.status(200).json(obj);
    }
}



module.exports = {
    listarOrden,
    agregarOrden,
}