const oracledb = require("oracledb");

const getProductos = async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection();

    const result = await connection.execute(
      `SELECT * FROM PRODUCTO`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error al obtener productos:", err);
    res.status(500).send("Error en la base de datos");
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error al cerrar conexión:", err);
      }
    }
  }
};


const getProducto = async (req, res) => {
  let connection;
  const { id } = req.params;


  try {
    connection = await oracledb.getConnection();

    const result = await connection.execute(
      `SELECT 
        COD_PRO, DES_PRO, PRE_PRO, SAC_PRO, SME_PRO, 
        UNI_PRO, LIN_PRO, IMP_PRO
       FROM PRODUCTO
       WHERE TRIM(COD_PRO) = :id`,
      [id],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error al obtener producto:", err);
    res.status(500).send("Error en la base de datos");
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error al cerrar conexión:", err);
      }
    }
  }
};

module.exports = {getProductos,getProducto}