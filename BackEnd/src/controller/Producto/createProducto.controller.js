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
    IMP_PRO
  } = req.body;

  try {
    connection = await oracledb.getConnection();

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
        IMP_PRO
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

module.exports= {createProducto};