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
      FEC_REG_FORMAT,
      TIP_CLI,
      CON_CLI,
    } = req.body;



    connection = await oracledb.getConnection();

    const result = await connection.execute(
      `UPDATE CLIENTE
       SET RSO_CLI = :RSO_CLI,
           DIR_CLI = :DIR_CLI,
           TLF_CLI = :TLF_CLI,
           RUC_CLI = :RUC_CLI,
           COD_DIS = :COD_DIS,
           FEC_REG = TO_DATE(:FEC_REG_FORMAT, 'YYYY-MM-DD'),
           TIP_CLI = :TIP_CLI,
           CON_CLI = :CON_CLI
       WHERE COD_CLI = :id`,
      {
        RSO_CLI,
        DIR_CLI,
        TLF_CLI,
        RUC_CLI,
        COD_DIS,
        FEC_REG_FORMAT, // Este debe venir como 'YYYY-MM-DD' desde el input
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