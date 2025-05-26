const oracledb = require("oracledb");
const createProducto = async (req, res) => {
  let connection;

  const {
    COD_PRO,
    DES_PRO,
    PRE_PRO,
    SAC_PRO,
    SME_PRO,
    UNI_PRO,
    LIN_PRO,
    IMP_PRO,
  } = req.body;

  if (!COD_PRO) {
    return res.status(400).json({ message: "El código de producto es requerido" });
  }

  try {
    connection = await oracledb.getConnection();

    // Verificar si ya existe un producto con el mismo código
    const check = await connection.execute(
      `SELECT 1 FROM PRODUCTO WHERE TRIM(COD_PRO) = :codigo`,
      [COD_PRO.trim()],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    if (check.rows.length > 0) {
      return res
        .status(409)
        .json({ message: `Ya existe un producto con el código ${COD_PRO.trim()}` });
    }

    // Insertar nuevo producto
    await connection.execute(
      `INSERT INTO PRODUCTO (
        COD_PRO, DES_PRO, PRE_PRO, SAC_PRO, SME_PRO, 
        UNI_PRO, LIN_PRO, IMP_PRO
      ) VALUES (
        :COD_PRO, :DES_PRO, :PRE_PRO, :SAC_PRO, :SME_PRO,
        :UNI_PRO, :LIN_PRO, :IMP_PRO
      )`,
      {
        COD_PRO,
        DES_PRO,
        PRE_PRO,
        SAC_PRO,
        SME_PRO,
        UNI_PRO,
        LIN_PRO,
        IMP_PRO,
      },
      { autoCommit: true }
    );

    res.status(201).json({ message: "Producto creado correctamente" });
  } catch (err) {
    console.error("Error al crear producto:", err);
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

module.exports = { createProducto };