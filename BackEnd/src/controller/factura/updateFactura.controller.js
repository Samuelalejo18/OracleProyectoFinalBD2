const oracledb = require("oracledb");

// PUT actualizar factura
const updateFactura = async (req, res) => {
    let connection;
    const { id } = req.params;
    const { FEC_FAC, COD_CLI, FEC_CAN, EST_FAC, COD_VEN, POR_IGV } = req.body;

    try {
        connection = await oracledb.getConnection();

       // Validar que exista el cliente
        const checkCliente = await connection.execute(
            `SELECT 1 FROM CLIENTE WHERE TRIM(COD_CLI) = :codigo`,
            [COD_CLI.trim()],
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );

        if (checkCliente.rows.length === 0) {
            return res.status(400).json({ message: `El código de cliente ${COD_CLI.trim()} no existe` });
        }

        // Validar que exista el vendedor
        const checkVendedor = await connection.execute(
            `SELECT 1 FROM VENDEDOR WHERE TRIM(COD_VEN) = :codigo`,
            [COD_VEN.trim()],
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );

        if (checkVendedor.rows.length === 0) {
            return res.status(400).json({ message: `El código de vendedor ${COD_VEN.trim()} no existe` });
        }


        const result = await connection.execute(
            `UPDATE FACTURA
       SET FEC_FAC = TO_DATE(:1, 'YYYY-MM-DD'),
           COD_CLI = :2,
           FEC_CAN = TO_DATE(:3, 'YYYY-MM-DD'),
           EST_FAC = :4,
           COD_VEN = :5,
           POR_IGV = :6
       WHERE TRIM(NUM_FAC) = :7`,
            [FEC_FAC, COD_CLI, FEC_CAN, EST_FAC, COD_VEN, POR_IGV, id],
            { autoCommit: true }
        );

        if (result.rowsAffected === 0) {
            return res.status(404).json({ message: "Factura no encontrada" });
        }

        res.status(200).json({ message: "Factura actualizada exitosamente" });
    } catch (err) {
        console.error("Error al actualizar factura:", err);
        res.status(500).send("Error en la base de datos");
    } finally {
        if (connection) await connection.close();
    }
};


module.exports = { updateFactura }