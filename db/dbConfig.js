const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'member',	// 기본은 postgres
  password: '6710',
  port: 5432, // PostgreSQL 기본 포트
});


pool.connect(err => {
    if(err) console.log(err);
    else console.log('성공');
});
module.exports = pool;