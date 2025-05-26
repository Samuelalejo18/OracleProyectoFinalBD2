const oracledb = require("oracledb");

const updateCliente = async (req, res) => {
  let connection;

  try {
    const { id } = req.params;
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
   // Validar si el COD_DIS existe
    const checkDistrito = await connection.execute(
      `SELECT 1 FROM DISTRITO WHERE TRIM(COD_DIS) = :codigo`,
      [COD_DIS.trim()],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    if (checkDistrito.rows.length === 0) {
      return res.status(400).json({ message: `El código de distrito ${COD_DIS.trim()} no existe` });
    }


    connection = await oracledb.getConnection();

    const result = await connection.execute(
      `UPDATE CLIENTE
       SET RSO_CLI = :RSO_CLI,
           DIR_CLI = :DIR_CLI,
           TLF_CLI = :TLF_CLI,
           RUC_CLI = :RUC_CLI,
           COD_DIS = :COD_DIS,
           FEC_REG = TO_DATE(:FEC_REG, 'YYYY-MM-DD'),
           TIP_CLI = :TIP_CLI,
           CON_CLI = :CON_CLI
       WHERE COD_CLI = :id`,
      {
        RSO_CLI,
        DIR_CLI,
        TLF_CLI,
        RUC_CLI,
        COD_DIS,
        FEC_REG, // Este debe venir como 'YYYY-MM-DD' desde el input
        TIP_CLI,
        CON_CLI,
        id,
      },
      { autoCommit: true }
    );

    res.status(200).json({ message: "Cliente actualizado correctamente" });
  } catch (err) {
    console.error("Error al actualizar cliente:", err);
    res.status(500).send("Error al actualizar cliente");
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
module.exports = { updateCliente };