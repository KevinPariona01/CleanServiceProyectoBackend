const Pool = require('pg').Pool
let local = {
  user: 'postgres',
  host: 'localhost',
  database: 'client_service_001',//'sol_redes_backup',
  password: '123',
  port: 5432
}

let prod = {
  user: 'postgres',
  host: 'ec2-18-118-110-45.us-east-2.compute.amazonaws.com',
  database: 'CleanService',
  password: 'softwarefactory',
  port: 5432
}

const pool = new Pool(prod)



module.exports={
    pool
}
