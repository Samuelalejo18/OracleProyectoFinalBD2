const oracledb = require("oracledb");


// DELETE eliminar factura
const deleteFactura = async (req, res) => {
    let connection;
    const { id } = req.params;

    try {
        connection = await oracledb.getConnection();
        const result = await connection.execute(
            `DELETE FROM FACTURA WHERE TRIM(NUM_FAC) = :id`,
            [id],
            { autoCommit: true }
        );

        if (result.rowsAffected === 0) {
            return res.status(404).json({ message: "Factura no encontrada" });
        }

        res.status(200).json({ message: "Factura eliminada exitosamente" });
    } catch (err) {
        console.error("Error al eliminar factura:", err);
        res.status(500).send("Error en la base de datos");
    } finally {
        if (connection) await connection.close();
    }
};

module.exports = { deleteFactura }