const oracledb = require("oracledb");

const createCliente = async (req, res) => {
  let connection;

  const {
    COD_CLI,
    RSO_CLI,
    DIR_CLI,
    TLF_CLI,
    RUC_CLI,
    COD_DIS,
    FEC_REG,
    TIP_CLI,
    CON_CLI,
  } = req.body;

  if (!COD_CLI) {
    return res.status(400).json({ message: "El código de cliente es requerido" });
  }

  try {
    connection = await oracledb.getConnection();

    // Validar si el COD_CLI ya existe
    const check = await connection.execute(
      `SELECT 1 FROM CLIENTE WHERE TRIM(COD_CLI) = :codigo`,
      [COD_CLI.trim()],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    if (check.rows.length > 0) {
      return res.status(409).json({ message: `Ya existe un cliente con el código ${COD_CLI.trim()}` });
    }

    // Si no existe, insertamos el cliente
    await connection.execute(
      `
      INSERT INTO CLIENTE (
        COD_CLI, RSO_CLI, DIR_CLI, TLF_CLI, RUC_CLI, COD_DIS,
        FEC_REG, TIP_CLI, CON_CLI
      )
      VALUES (
        :COD_CLI, :RSO_CLI, :DIR_CLI, :TLF_CLI, :RUC_CLI, :COD_DIS,
        TO_DATE(:FEC_REG, 'YYYY-MM-DD'), :TIP_CLI, :CON_CLI
      )
      `,
      {
        COD_CLI,
        RSO_CLI,
        DIR_CLI,
        TLF_CLI,
        RUC_CLI,
        COD_DIS,
        FEC_REG,
        TIP_CLI,
        CON_CLI,
      },
      { autoCommit: true }
    );

    res.status(201).json({ message: "Cliente creado correctamente" });
  } catch (err) {
    console.error("Error al crear cliente:", err);
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

module.exports = { createCliente };