const oracledb = require("oracledb");
const createFactura = async (req, res) => {
    let connection;
    const { NUM_FAC, FEC_FAC, COD_CLI, FEC_CAN, EST_FAC, COD_VEN, POR_IGV } = req.body;

    try {
        connection = await oracledb.getConnection();
        await connection.execute(
            `INSERT INTO FACTURA (NUM_FAC, FEC_FAC, COD_CLI, FEC_CAN, EST_FAC, COD_VEN, POR_IGV)
       VALUES (:1, TO_DATE(:2, 'YYYY-MM-DD'), :3, TO_DATE(:4, 'YYYY-MM-DD'), :5, :6, :7)`,
            [NUM_FAC, FEC_FAC, COD_CLI, FEC_CAN, EST_FAC, COD_VEN, POR_IGV],
            { autoCommit: true }
        );

        res.status(201).json({ message: "Factura creada exitosamente" });
    } catch (err) {
        console.error("Error al crear factura:", err);
        res.status(500).send("Error en la base de datos");
    } finally {
        if (connection) await connection.close();
    }
};
module.exports = { createFactura };