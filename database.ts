import mysql from 'promise-mysql';

import keys from './keys';

const pool = mysql.createPool(keys.test);

pool.getConnection()
    .then(connection => {
        pool.releaseConnection(connection);
        console.log("DB is Connected");
    })
    .catch(err => {
        console.log(err);
    })

export default pool;