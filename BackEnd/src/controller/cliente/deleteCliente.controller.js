const oracledb = require("oracledb");

const deleteCliente = async (req, res) => {
  let connection;
  const { id } = req.params;




  try {
    connection = await oracledb.getConnection();

    const result = await connection.execute(
      `DELETE FROM CLIENTE WHERE COD_CLI = :id`,
      [id],
      { autoCommit: true }
    );

    if (result.rowsAffected === 0) {
      return res.status(404).json({ message: "Cliente no encontrado o ya eliminado" });
    }

    res.status(200).json({ message: "Cliente eliminado correctamente" });
  } catch (err) {
    console.error("Error al eliminar cliente:", err);
    if (err.errorNum === 2292) {
      return res.status(409).json({ message: "No se puede eliminar el cliente debido a claves foráneas" });
    }
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

module.exports= {deleteCliente}