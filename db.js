const { Pool } = require('pg');
const pool = new Pool({
    host: 'db',
    port: 4000,
    user: 'sigh',
    password: 'sigh123!',
    database: 'db'
});

module.exports = pool;