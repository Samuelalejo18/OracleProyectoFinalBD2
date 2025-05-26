const oracledb = require("oracledb");
require("dotenv").config();

const { ORACLE_USER, ORACLE_PASSWORD, ORACLE_CONNECTION_STRING } = process.env;

module.exports = async function connectDB() {
  try {
    await oracledb.createPool({
      user: ORACLE_USER,
      password: ORACLE_PASSWORD,
      connectString: ORACLE_CONNECTION_STRING,
    });

    console.log("Conectado a Oracle DB correctamente");
  } catch (err) {
    console.error("Error al conectar con Oracle DB:", err);
    throw err;
  }
};
