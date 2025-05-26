const oracledb = require("oracledb");


// POST - Crear detalle
const createDetalleFactura = async (req, res) => {
    let connection;
    const { NUM_FAC, COD_PRO, CAN_VEN, PRE_VEN } = req.body;

    try {
        connection = await oracledb.getConnection();
        await connection.execute(
            `INSERT INTO DETALLE_FACTURA (NUM_FAC, COD_PRO, CAN_VEN, PRE_VEN)
       VALUES (:1, :2, :3, :4)`,
            [NUM_FAC, COD_PRO, CAN_VEN, PRE_VEN],
            { autoCommit: true }
        );

        res.status(201).json({ message: "Detalle creado exitosamente" });
    } catch (err) {
        console.error("Error al crear detalle:", err);
        res.status(500).send("Error en la base de datos");
    } finally {
        if (connection) await connection.close();
    }
};


module.exports = { createDetalleFactura };