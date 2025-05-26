const oracledb = require("oracledb");

// GET - Obtener todos los detalles
const getDetallesFactura = async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection();
    const result = await connection.execute(
      `SELECT * FROM DETALLE_FACTURA`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error al obtener detalles:", err);
    res.status(500).send("Error en la base de datos");
  } finally {
    if (connection) await connection.close();
  }
};

// GET - Obtener un detalle por NUM_FAC y COD_PRO
const getDetalleFactura = async (req, res) => {
  let connection;
  const { num_fac, cod_pro } = req.params;

  try {
    connection = await oracledb.getConnection();
    const result = await connection.execute(
      `SELECT * FROM DETALLE_FACTURA 
       WHERE TRIM(NUM_FAC) = :1 AND TRIM(COD_PRO) = :2`,
      [num_fac, cod_pro],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Detalle no encontrado" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error al obtener detalle:", err);
    res.status(500).send("Error en la base de datos");
  } finally {
    if (connection) await connection.close();
  }
};

// getFacturas.controller.js
module.exports = {
    getDetallesFactura,
    getDetalleFactura
};