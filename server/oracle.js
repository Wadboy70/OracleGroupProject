const oracledb = require('oracledb');

try {
    oracledb.initOracleClient({libDir: process.env.ORACLE_PATH});
} catch (err) {
    console.error('Whoops!');
    console.error(err);
    process.exit(1);
}

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

let connection;

async function run(query) {
  try {
    connection = await oracledb.getConnection( {
      user          : process.env.ORACLE_LOGIN,
      password      : process.env.ORACLE_PW,
      connectString : "oracle.cise.ufl.edu:1521/orcl"
    });

  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        let result = await runQuery(query);
        await connection.close();
        return result
      } catch (err) {
        console.error(err);
      }
    }
  }
  return null;
};

const runQuery = async (query) => {
  const result = await connection.execute(
    query,
    [],
  );
  return result.rows;
};

module.exports = { run };