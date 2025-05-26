const oracledb = require("oracledb");

// GET todas las facturas
const getFacturas = async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection();

    const result = await connection.execute(
      `SELECT 
         F.*, 
         TO_CHAR(F.FEC_FAC, 'DD-MM-YYYY') AS FEC_FAC_FORMAT,
         TO_CHAR(F.FEC_CAN, 'DD-MM-YYYY') AS FEC_CAN_FORMAT
       FROM FACTURA F ORDER BY NUM_FAC`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error al obtener facturas:", err);
    res.status(500).send("Error en la base de datos");
  } finally {
    if (connection) await connection.close();
  }
};

// GET factura por ID
const getFactura = async (req, res) => {
  let connection;
  const { id } = req.params;
  try {
    connection = await oracledb.getConnection();

    const result = await connection.execute(
      `SELECT 
         F.*, 
         TO_CHAR(F.FEC_FAC, 'DD-MM-YYYY') AS FEC_FAC_FORMAT,
         TO_CHAR(F.FEC_CAN, 'DD-MM-YYYY') AS FEC_CAN_FORMAT
       FROM FACTURA F
       WHERE TRIM(F.NUM_FAC) = :id`,
      [id],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Factura no encontrada" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error al obtener factura:", err);
    res.status(500).send("Error en la base de datos");
  } finally {
    if (connection) await connection.close();
  }
};

module.exports = {
  getFacturas,
  getFactura
};
