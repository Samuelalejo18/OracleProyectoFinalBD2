const oracledb = require("oracledb");

const getClientes = async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection();

    const result = await connection.execute(
      `SELECT C.*, TO_CHAR(C.FEC_REG, 'DD-MM-YYYY') AS FEC_REG_FORMAT  FROM CLIENTE C`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    // Limpia los espacios en blanco de cada string en cada fila
    const clientesLimpios = result.rows.map(cliente => {
      return Object.fromEntries(
        Object.entries(cliente).map(([key, value]) => [
          key,
          typeof value === "string" ? value.trim() : value,
        ])
      );
    });

    res.json(clientesLimpios);
  } catch (err) {
    console.error("Error en la consulta:", err);
    res.status(500).send("Error en la base de datos");
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

const getClienteById = async (req, res) => {
    let connection;

    try {
        const {id} = req.params;


        connection = await oracledb.getConnection();

        const result = await connection.execute(
            `SELECT C.*, TO_CHAR(C.FEC_REG, 'DDMMYYYY') AS FEC_REG_FORMAT FROM CLIENTE C WHERE C.COD_CLI = :id`,
            [id],
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        const cliente = result.rows[0];

        // Limpiar espacios en campos string
        const clienteLimpio = Object.fromEntries(
            Object.entries(cliente).map(([key, value]) => [
                key,
                typeof value === "string" ? value.trim() : value,
            ])
        );

        res.json(clienteLimpio);
    } catch (err) {
        console.error("Error en la consulta:", err);
        res.status(500).send("Error en la base de datos");
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



module.exports = { getClientes, getClienteById }