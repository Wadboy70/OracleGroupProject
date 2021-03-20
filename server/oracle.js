const oracledb = require('oracledb');

try {
    oracledb.initOracleClient({libDir: 'C:\\oracle\\instantclient'});
} catch (err) {
    console.error('Whoops!');
    console.error(err);
    process.exit(1);
}

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function run(mypw) {
    let connection;
  
    try {
      connection = await oracledb.getConnection( {
        user          : "ooluwale",
        password      : mypw,
        connectString : "oracle.cise.ufl.edu:1521/orcl"
      });
      const result = await connection.execute(
        `SELECT * from animal_shelter`,
        [],
      );
      console.log(result.rows);
  
    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
};

module.exports = { run };