const cnx = require('../common/appsettings');
const valida = require('../common/validatoken');
let pool = cnx.pool;

//NOMBRE DE LA TABLA
const nombreTabla = 'gen_orden';

const listarOrden = (request, response)=>{
    let n_idgen_periodo = request.body.n_idgen_periodo;
    var obj = valida.validaToken(request)
    if (obj.estado){
        let cadena = `SELECT n_idgen_orden, n_idgen_periodo, n_idgen_tienda, c_estado, c_descripcion, n_borrado FROM ${nombreTabla}
                      WHERE n_borrado = 0 and (n_idgen_periodo = ${n_idgen_periodo} or 0 = ${n_idgen_periodo} )
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
    const estado = (periodos[0].ESTADO!=null || periodos[0].ESTADO!=undefined)?true:false;
    const descripcion = (periodos[0].DESCRIPCION!=null || periodos[0].DESCRIPCION!=undefined)?true:false;
    //ERRORES
    let errores = [];
    let errorObject;
    let resultNuloObject;
    let filaI = 2;
    let filaS = 2;
    errrorSelect = [];
    resultNulos = [];
    var obj = valida.validaToken(request)
    if (obj.estado){
        if(estado && descripcion){
            //BUSQUEDA DE ID
            for(let p of periodos){
                await new Promise((resolve)=>{
                    let busqueda = `SELECT n_idgen_tienda FROM gen_tienda WHERE c_codigo = '${p.TIENDA}' and n_borrado = 0`;
                    pool.query(busqueda, (error, results)=>{
                        if(error){//MANEJO DE ERRORES DE QUERY
                            errorObject = {
                                error:error.toString(),
                                fila: 'ERROR DB'
                            }
                            errrorSelect.push(errorObject);
                            resolve();
                        }else{//MANERO DE CODIGOS QUE NO SE ENCUENTRAN
                            if(results.rows.length==0){
                                resultNuloObject = {
                                    error:'No se encontro código: '+ p.TIENDA,
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
                console.log("ERROR FUERA");
                response.status(200).json({ estado: false, mensaje: "DB: error3!.", data: null, error: errrorSelect })
                return;
            }

            //VERIFICA SI HAY VACIOS
            if(resultNulos.length!=0){
                console.log("ERROR FUERA");
                response.status(200).json({ estado: false, mensaje: "", data: null, error: resultNulos })
                return;
            }

            //INICIO DE LA INSERCION
            const client = await pool.connect();//CONECTO AL CLIENTE
            try {
                    await client.query('BEGIN'); // INICIA LA TRANSANCCION
                    for (let p of periodos) {
                            let cadena = `INSERT INTO ${nombreTabla}(c_estado, c_descripcion, n_idgen_tienda, n_idgen_periodo, n_borrado, n_id_usercrea, d_fechacrea)
                                          VALUES('${p.ESTADO}', '${p.DESCRIPCION}', ${p.id_tienda}, ${n_idgen_periodo}, 0, 1, now())`;
                            await client.query(cadena);
                            filaI++;
                    } 
                }catch(error){
                    console.error('Error en la transacción:', error.toString());
                    errorObject = {
                        error:error.toString(),
                        fila: filaI
                    }
                    errores.push(errorObject);
                }

            if(errores.length!=0){
                console.log('ROLLBACK');
                await client.query('ROLLBACK'); // Realiza rollback en caso de error
            }else{
                console.log('COMMIT');
                await client.query('COMMIT'); // Realiza rollback en caso de error
            }

            if(errores.length!=0){
                response.status(200).json({ estado: false, mensaje: "DB: error3!.", data: null, error: errores })
            }else{
                response.status(200).json({ estado: true, mensaje: "", data: null, error: errores })
            }
            

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