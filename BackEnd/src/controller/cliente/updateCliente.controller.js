const oracledb = require("oracledb");

const updateCliente = async (req, res) => {
  let connection;

  const codClienteParam = req.params.id?.trim();
  const {
    RSO_CLI,
    DIR_CLI,
    TLF_CLI,
    RUC_CLI,
    COD_DIS,
    FEC_REG,
    TIP_CLI,
    CON_CLI,
  } = req.body;

  if (!codClienteParam) {
    return res.status(400).json({ message: "Código del cliente no proporcionado en la URL" });
  }

  try {
    connection = await oracledb.getConnection();

    // Verificar si el cliente existe
    const existing = await connection.execute(
      `SELECT 1 FROM CLIENTE WHERE TRIM(COD_CLI) = :codigo`,
      [codClienteParam],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    if (existing.rows.length === 0) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    // Realizar la actualización (sin modificar COD_CLI)
    await connection.execute(
      `
      UPDATE CLIENTE
      SET
        RSO_CLI = :RSO_CLI,
        DIR_CLI = :DIR_CLI,
        TLF_CLI = :TLF_CLI,
        RUC_CLI = :RUC_CLI,
        COD_DIS = :COD_DIS,
        FEC_REG = TO_DATE(:FEC_REG, 'YYYY-MM-DD'),
        TIP_CLI = :TIP_CLI,
        CON_CLI = :CON_CLI
      WHERE TRIM(COD_CLI) = :codigo
      `,
      {
        RSO_CLI,
        DIR_CLI,
        TLF_CLI,
        RUC_CLI,
        COD_DIS,
        FEC_REG,
        TIP_CLI,
        CON_CLI,
        codigo: codClienteParam,
      },
      { autoCommit: true }
    );

    res.status(200).json({ message: "Cliente actualizado correctamente" });
  } catch (err) {
    console.error("Error al actualizar cliente:", err);
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

module.exports = { updateCliente };