const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'http://localhost:3001',
  database: 'member',	// 기본은 postgres
  password: '6710',
  port: 5432, // PostgreSQL 기본 포트
});


pool.connect(err => {
    if(err) console.log(err);
    else console.log('성공');
});
module.exports = pool;