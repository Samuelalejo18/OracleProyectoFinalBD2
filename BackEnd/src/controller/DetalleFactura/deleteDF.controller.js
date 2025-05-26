const oracledb = require("oracledb");


// DELETE - Eliminar detalle
const deleteDetalleFactura = async (req, res) => {
  let connection;
  const { num_fac, cod_pro } = req.params;

  try {
    connection = await oracledb.getConnection();
    const result = await connection.execute(
      `DELETE FROM DETALLE_FACTURA 
       WHERE TRIM(NUM_FAC) = :1 AND TRIM(COD_PRO) = :2`,
      [num_fac, cod_pro],
      { autoCommit: true }
    );

    if (result.rowsAffected === 0) {
      return res.status(404).json({ message: "Detalle no encontrado" });
    }

    res.status(200).json({ message: "Detalle eliminado exitosamente" });
  } catch (err) {
    console.error("Error al eliminar detalle:", err);
    res.status(500).send("Error en la base de datos");
  } finally {
    if (connection) await connection.close();
  }
};


module.exports = { deleteDetalleFactura };