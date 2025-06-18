const pool = require('./dbConfig');


const getTests = async () => {

    try {
        const tests = await pool.query('SELECT * FROM test');
        console.log(tests);
        return tests.rows;
      } catch (error) {
        console.error('Error executing query:', error);
        throw error;
      }
};


module.exports = {
    getTests
};